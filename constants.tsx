
import React from 'react';
import { type Language } from './types';

export const MicIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3ZM11 5a1 1 0 0 1 2 0v6a1 1 0 0 1-2 0V5Z" />
    <path d="M12 15a4 4 0 0 0-4 4v1a1 1 0 0 0 2 0v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 2 0v-1a4 4 0 0 0-4-4Z" />
    <path d="M19 11a1 1 0 0 0-1 1a6 6 0 0 1-12 0a1 1 0 1 0-2 0a8 8 0 0 0 7 7.93V21a1 1 0 0 0 2 0v-1.07A8 8 0 0 0 20 12a1 1 0 0 0-1-1Z" />
  </svg>
);

export const SettingsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 5.85a1.5 1.5 0 0 1-1.683.972l-2.48-.93c-.806-.302-1.68.104-1.949.886L1.15 9.493c-.27.783.185 1.64.972 1.948l2.48.93a1.5 1.5 0 0 1 .972 1.683l-.178 2.225a1.875 1.875 0 0 0 1.57 1.85l2.12.383a1.5 1.5 0 0 1 1.683-.972l2.48.93c.806.302 1.68-.104 1.949-.886l1.782-2.815c.27-.783-.185-1.64-.972-1.948l-2.48-.93a1.5 1.5 0 0 1-.972-1.683l.178-2.225a1.875 1.875 0 0 0-1.57-1.85l-2.12-.383Zm-3.484 7.64a.75.75 0 0 1 .53-.22l.53.22a.75.75 0 0 0 .53-.22l.53-.22a.75.75 0 0 1 .53.22l.53.22a.75.75 0 0 0 .53.22l.53-.22a.75.75 0 0 1 .53.22l.53.22a.75.75 0 0 0 1.06 0l.53-.22a.75.75 0 0 1 .53-.22l.53.22a.75.75 0 0 0 .53-.22l.53-.22a.75.75 0 0 1 .53.22l.53.22a.75.75 0 0 0 .53.22l.53-.22a.75.75 0 0 1 .53.22l.53.22a.75.75 0 0 0 1.06 0l.53-.22a.75.75 0 0 1 .53-.22l.53.22a.75.75 0 0 0 .53-.22l.53-.22a.75.75 0 0 1 .53.22l.53.22a.75.75 0 0 0 .53.22l.53-.22a.75.75 0 0 1 .53.22l.53.22a.75.75 0 0 0 1.06 0l.53-.22a.75.75 0 0 1 .53-.22l.53.22a.75.75 0 0 0 .53-.22l.53-.22a.75.75 0 0 1 .53.22l.53.22a.75.75 0 0 0 .53.22l.53-.22a.75.75 0 0 1 .53.22l.53.22a.75.75 0 0 0 1.06 0l.53-.22c.28-.28.28-.737 0-1.018l-.53-.22a.75.75 0 0 1-.53-.22l-.53.22a.75.75 0 0 0-.53.22l-.53.22a.75.75 0 0 1-.53-.22l-.53-.22a.75.75 0 0 0-.53-.22l-.53.22a.75.75 0 0 1-.53-.22l-.53-.22a.75.75 0 0 0-.53.22l-.53.22a.75.75 0 0 1-1.06 0l-.53-.22a.75.75 0 0 0-.53.22l-.53.22a.75.75 0 0 1-.53-.22l-.53-.22a.75.75 0 0 0-.53-.22l-.53.22a.75.75 0 0 1-.53-.22l-.53-.22a.75.75 0 0 0-.53.22l-.53.22a.75.75 0 0 1-1.06 0l-.53-.22a.75.75 0 0 0-.53.22l-.53.22a.75.75 0 0 1-.53-.22l-.53-.22a.75.75 0 0 0-.53-.22l-.53.22a.75.75 0 0 1-1.06 0l-.53-.22a.75.75 0 0 0-.53.22l-.53.22a.75.75 0 0 1-.53-.22l-.53-.22a.75.75 0 0 0-.53-.22l-.53.22a.75.75 0 0 1-1.06 0l-.53-.22a.75.75 0 0 0-.53.22Z"
      clipRule="evenodd"
    />
    <path d="M12 8.25a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5ZM10.5 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
  </svg>
);

export const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.006a.75.75 0 0 1-.749.658h-7.5a.75.75 0 0 1-.749-.658L5.165 6.714l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.347-9Zm5.342 0a.75.75 0 1 0-1.499-.058l-.347 9a.75.75 0 0 0 1.499.058l.347-9Z"
      clipRule="evenodd"
    />
  </svg>
);


export const LANGUAGES: Language[] = [
    { value: 'en-US', label: 'English (US)' },
    { value: 'en-GB', label: 'English (UK)' },
    { value: 'ar-SA', label: 'Arabic (Saudi Arabia)' },
    { value: 'ar-AE', label: 'Arabic (UAE - Gulf)' },
    { value: 'ar-DZ', label: 'Arabic (Algeria)' },
    { value: 'es-ES', label: 'Spanish' },
    { value: 'fr-FR', label: 'French' },
    { value: 'de-DE', label: 'German' },
    { value: 'hi-IN', label: 'Hindi' },
    { value: 'it-IT', label: 'Italian' },
    { value: 'ja-JP', label: 'Japanese' },
    { value: 'ko-KR', label: 'Korean' },
    { value: 'pt-BR', label: 'Portuguese' },
    { value: 'ru-RU', label: 'Russian' },
    { value: 'zh-CN', label: 'Chinese (Mandarin)' },
];

export const TRANSLATION_LANGUAGES: Language[] = [
    { value: 'en', label: 'English' },
    { value: 'ar', label: 'Arabic' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'hi', label: 'Hindi' },
    { value: 'it', label: 'Italian' },
    { value: 'ja', label: 'Japanese' },
    { value: 'ko', label: 'Korean' },
    { value: 'pt', label: 'Portuguese' },
    { value: 'ru', label: 'Russian' },
    { value: 'zh', label: 'Chinese (Mandarin)' },
];
