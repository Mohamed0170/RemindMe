import React, { useState, useRef, useEffect, useCallback } from 'react';
import { type Reminder, AppStatus, type Settings } from './types';
import { geminiService } from './services/geminiService';
import Header from './components/Header';
import VoiceControl from './components/VoiceControl';
import ReminderList from './components/ReminderList';
import SettingsModal from './components/SettingsModal';
import NotificationAlert from './components/NotificationAlert';
import AdBanner from './components/AdBanner';
import { LANGUAGES } from './constants';

// Fix for SpeechRecognition API types which are not standard in TypeScript
interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
  length: number;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognition extends EventTarget {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

declare global {
  interface Window {
    SpeechRecognition: { new(): SpeechRecognition };
    webkitSpeechRecognition: { new(): SpeechRecognition };
  }
}

const App: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [appStatus, setAppStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [statusText, setStatusText] = useState('Tap the mic to set a reminder');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeReminder, setActiveReminder] = useState<Reminder | null>(null);
  const [settings, setSettings] = useState<Settings>({
    language: 'en-US',
    translationLanguage: 'en',
  });

  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const requestPermissions = useCallback(async () => {
    try {
      if (Notification.permission !== 'granted') {
        await Notification.requestPermission();
      }
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (error) {
      console.error('Permission denied:', error);
      setAppStatus(AppStatus.ERROR);
      setStatusText('Microphone and Notification access are required.');
    }
  }, []);

  useEffect(() => {
    requestPermissions();
  }, [requestPermissions]);

  const handleSetReminder = useCallback(async (text: string) => {
    setAppStatus(AppStatus.PROCESSING);
    setStatusText('Thinking...');
    try {
      const parsed = await geminiService.parseReminderCommand(text);
      if (!parsed || !parsed.task || parsed.delaySeconds <= 0) {
        throw new Error('Could not understand the reminder time or task.');
      }

      setStatusText('Creating a conversational alert...');
      const conversationalText = await geminiService.rephraseReminder(parsed.task);

      let finalConversationalText = conversationalText;
      if (settings.translationLanguage !== 'en') {
        setStatusText(`Translating to ${LANGUAGES.find(l => l.value === settings.translationLanguage)?.label}...`);
        finalConversationalText = await geminiService.translateText(conversationalText, settings.translationLanguage);
      }
      
      const newReminder: Omit<Reminder, 'timeoutId'> = {
        id: Date.now().toString(),
        originalText: text,
        task: parsed.task,
        conversationalText: finalConversationalText,
        triggerTime: Date.now() + parsed.delaySeconds * 1000,
      };

      const timeoutId = setTimeout(() => {
        setActiveReminder({ ...newReminder, timeoutId });
      }, parsed.delaySeconds * 1000);

      setReminders(prev => [...prev, { ...newReminder, timeoutId }].sort((a, b) => a.triggerTime - b.triggerTime));
      setAppStatus(AppStatus.SUCCESS);
      setStatusText(`Reminder set for "${parsed.task}"!`);
      setTimeout(() => {
        setAppStatus(AppStatus.IDLE);
        setStatusText('Tap the mic to set a reminder');
      }, 3000);

    } catch (error) {
      console.error('Error setting reminder:', error);
      setAppStatus(AppStatus.ERROR);
      setStatusText('Sorry, I had trouble setting that reminder. Please try again.');
       setTimeout(() => {
        setAppStatus(AppStatus.IDLE);
        setStatusText('Tap the mic to set a reminder');
      }, 4000);
    }
  }, [settings.translationLanguage]);

  const handleListen = () => {
    if (appStatus === AppStatus.LISTENING) {
      recognitionRef.current?.stop();
      setAppStatus(AppStatus.IDLE);
      setStatusText('Tap the mic to set a reminder');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setAppStatus(AppStatus.ERROR);
      setStatusText('Speech recognition not supported in this browser.');
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = settings.language;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.maxAlternatives = 1;

    recognitionRef.current.onstart = () => {
      setAppStatus(AppStatus.LISTENING);
      setStatusText('Listening...');
    };

    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      handleSetReminder(transcript);
    };
    
    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setAppStatus(AppStatus.ERROR);
      setStatusText(`Error: ${event.error}. Please try again.`);
    };
    
    recognitionRef.current.onend = () => {
      // FIX: Use functional update to get the latest appStatus. This prevents a bug
      // where the app gets stuck in the "Listening" state if speech recognition
      // times out, because the original code had a stale closure over `appStatus`.
      setAppStatus(currentStatus => {
        if (currentStatus === AppStatus.LISTENING) {
          setStatusText('Tap the mic to set a reminder');
          return AppStatus.IDLE;
        }
        return currentStatus;
      });
    };

    recognitionRef.current.start();
  };

  const deleteReminder = useCallback((id: string) => {
    setReminders(prev =>
      prev.filter(r => {
        if (r.id === id) {
          clearTimeout(r.timeoutId);
          return false;
        }
        return true;
      })
    );
  }, []);

  const handleSnooze = useCallback((reminder: Reminder, minutes: number) => {
    deleteReminder(reminder.id);
    const delaySeconds = minutes * 60;
    const newTriggerTime = Date.now() + delaySeconds * 1000;
    
    const timeoutId = setTimeout(() => {
      setActiveReminder({ ...reminder, triggerTime: newTriggerTime, timeoutId });
    }, delaySeconds * 1000);

    const snoozedReminder: Reminder = { ...reminder, triggerTime: newTriggerTime, timeoutId };
    setReminders(prev => [...prev, snoozedReminder].sort((a,b) => a.triggerTime - b.triggerTime));
    setActiveReminder(null);
  }, [deleteReminder]);

  const handleDismiss = useCallback((reminder: Reminder) => {
    deleteReminder(reminder.id);
    setActiveReminder(null);
  }, [deleteReminder]);


  return (
    <div className="min-h-screen font-sans text-slate-800 dark:text-slate-200 transition-colors duration-300">
      <div className="container mx-auto max-w-2xl p-4 md:p-8">
        <Header onSettingsClick={() => setIsSettingsOpen(true)} />

        <main className="mt-8 flex flex-col items-center">
          <VoiceControl
            appStatus={appStatus}
            statusText={statusText}
            onListen={handleListen}
          />
          <ReminderList reminders={reminders} onDelete={deleteReminder} />
        </main>

        <AdBanner />

        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          settings={settings}
          onSave={setSettings}
        />
        
        {activeReminder && (
          <NotificationAlert 
            reminder={activeReminder}
            onDismiss={handleDismiss}
            onSnooze={handleSnooze}
          />
        )}
      </div>
    </div>
  );
};

export default App;