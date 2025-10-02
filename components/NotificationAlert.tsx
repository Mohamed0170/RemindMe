
import React, { useEffect } from 'react';
import { type Reminder } from '../types';

interface NotificationAlertProps {
  reminder: Reminder;
  onDismiss: (reminder: Reminder) => void;
  onSnooze: (reminder: Reminder, minutes: number) => void;
}

const NotificationAlert: React.FC<NotificationAlertProps> = ({ reminder, onDismiss, onSnooze }) => {

  useEffect(() => {
    // Speak the reminder text when the component mounts
    try {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(reminder.conversationalText);
        // The language for synthesis could also be a setting
        // utterance.lang = 'en-US';
        speechSynthesis.speak(utterance);
      }
    } catch (error) {
      console.error("Speech synthesis failed:", error);
    }
    
    // Vibrate for mobile devices
    if ('vibrate' in navigator) {
        navigator.vibrate([200, 100, 200]);
    }

  }, [reminder]);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl p-6 w-full max-w-sm m-4 text-center transform transition-all scale-100 opacity-100">
        <div className="animate-pulse text-blue-500 dark:text-blue-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </div>
        <h2 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-100">Reminder!</h2>
        <p className="text-slate-600 dark:text-slate-300 mb-6">
          {reminder.conversationalText}
        </p>
        <div className="flex flex-col space-y-3">
            <button
              onClick={() => onDismiss(reminder)}
              className="w-full px-4 py-3 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Dismiss
            </button>
            <button
              onClick={() => onSnooze(reminder, 5)}
              className="w-full px-4 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
            >
              Snooze for 5 minutes
            </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationAlert;
