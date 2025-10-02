
import React, { useState, useEffect } from 'react';
import { type Reminder } from '../types';
import { TrashIcon } from '../constants';

interface ReminderItemProps {
  reminder: Reminder;
  onDelete: (id: string) => void;
}

const formatTimeLeft = (ms: number): string => {
  if (ms <= 0) return 'now!';
  
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  const parts: string[] = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`);
  
  return parts.join(' ');
};

const ReminderItem: React.FC<ReminderItemProps> = ({ reminder, onDelete }) => {
  const [timeLeft, setTimeLeft] = useState(reminder.triggerTime - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeLeft = reminder.triggerTime - Date.now();
      if (newTimeLeft <= 0) {
        clearInterval(interval);
      }
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(interval);
  }, [reminder.triggerTime]);

  return (
    <li className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md transition-all hover:shadow-lg">
      <div className="flex-1 overflow-hidden">
        <p className="font-medium text-slate-800 dark:text-slate-100 truncate">{reminder.task}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          In: <span className="font-semibold text-blue-500 dark:text-blue-400">{formatTimeLeft(timeLeft)}</span>
        </p>
      </div>
      <button
        onClick={() => onDelete(reminder.id)}
        className="ml-4 p-2 rounded-full text-slate-400 dark:text-slate-500 hover:bg-red-100 hover:text-red-500 dark:hover:bg-red-900/50 dark:hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:ring-offset-white dark:focus:ring-offset-slate-800 transition-colors"
        aria-label={`Delete reminder for ${reminder.task}`}
      >
        <TrashIcon className="w-5 h-5" />
      </button>
    </li>
  );
};

export default ReminderItem;
