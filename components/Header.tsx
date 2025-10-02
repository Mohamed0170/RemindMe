import React from 'react';
import { SettingsIcon } from '../constants';

interface HeaderProps {
  onSettingsClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSettingsClick }) => {
  return (
    <header className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700">
      <h1 className="text-3xl font-bold tracking-tight">
        <span className="text-blue-600 dark:text-blue-500">Remind</span>
        <span className="text-green-500 dark:text-green-400">Me</span>
      </h1>
      <button
        onClick={onSettingsClick}
        className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-900 transition-colors"
        aria-label="Open settings"
      >
        <SettingsIcon className="w-6 h-6" />
      </button>
    </header>
  );
};

export default Header;
