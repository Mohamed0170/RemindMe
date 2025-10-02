
import React from 'react';
import { type Reminder } from '../types';
import ReminderItem from './ReminderItem';

interface ReminderListProps {
  reminders: Reminder[];
  onDelete: (id: string) => void;
}

const ReminderList: React.FC<ReminderListProps> = ({ reminders, onDelete }) => {
  return (
    <div className="w-full mt-8">
      <h2 className="text-xl font-semibold mb-4 text-slate-700 dark:text-slate-300">
        Upcoming Reminders
      </h2>
      {reminders.length === 0 ? (
        <div className="text-center py-10 px-6 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <p className="text-slate-500 dark:text-slate-400">You have no reminders set.</p>
          <p className="text-sm text-slate-400 dark:text-slate-500">Tap the mic to get started!</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {reminders.map(reminder => (
            <ReminderItem key={reminder.id} reminder={reminder} onDelete={onDelete} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReminderList;
