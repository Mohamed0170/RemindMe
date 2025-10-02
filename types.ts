export interface Reminder {
  id: string;
  originalText: string;
  task: string;
  conversationalText: string;
  triggerTime: number; // as timestamp
  // FIX: Updated timeoutId type to be compatible with the return type of setTimeout in different environments.
  timeoutId: ReturnType<typeof setTimeout>;
}

export enum AppStatus {
  IDLE = 'idle',
  LISTENING = 'listening',
  PROCESSING = 'processing',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface Settings {
  language: string; // for speech recognition
  translationLanguage: string; // for text translation
}

export interface Language {
  value: string;
  label: string;
}
