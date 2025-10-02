
import React from 'react';
import { AppStatus } from '../types';
import { MicIcon } from '../constants';

interface VoiceControlProps {
  appStatus: AppStatus;
  statusText: string;
  onListen: () => void;
}

const VoiceControl: React.FC<VoiceControlProps> = ({ appStatus, statusText, onListen }) => {
  const getButtonClass = () => {
    switch (appStatus) {
      case AppStatus.LISTENING:
        return 'bg-red-500 hover:bg-red-600 text-white animate-pulse';
      case AppStatus.PROCESSING:
        return 'bg-yellow-500 text-white cursor-not-allowed';
      case AppStatus.SUCCESS:
        return 'bg-green-500 text-white';
      case AppStatus.ERROR:
        return 'bg-red-700 text-white';
      case AppStatus.IDLE:
      default:
        return 'bg-blue-500 hover:bg-blue-600 text-white';
    }
  };

  const getStatusTextColor = () => {
     switch (appStatus) {
      case AppStatus.ERROR:
        return 'text-red-500 dark:text-red-400';
      case AppStatus.SUCCESS:
        return 'text-green-600 dark:text-green-400';
      default:
        return 'text-slate-600 dark:text-slate-400';
    }
  }

  return (
    <div className="flex flex-col items-center space-y-6 w-full my-12">
      <button
        onClick={onListen}
        disabled={appStatus === AppStatus.PROCESSING}
        className={`w-32 h-32 rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-opacity-50 ${getButtonClass()}`}
        aria-label={appStatus === AppStatus.LISTENING ? 'Stop listening' : 'Start listening'}
      >
        <MicIcon className="w-16 h-16" />
      </button>
      <p className={`text-lg text-center h-6 ${getStatusTextColor()}`}>{statusText}</p>
    </div>
  );
};

export default VoiceControl;
