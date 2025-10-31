'use client';

import React, { useState, useRef, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import { ChevronDown, X } from 'lucide-react';

type Props = {
  selectedDate?: Date | null;
  onSelect?: (date: Date | undefined) => void;
  placeholder?: string;
};

export default function DateSelector({
  selectedDate = null,
  onSelect,
  placeholder = 'Select date',
}: Props) {
  const [date, setDate] = useState<Date | null>(selectedDate);
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  // Close calendar when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (selected: Date | undefined) => {
    setDate(selected || null);
    onSelect?.(selected);
    setShowCalendar(false); // auto-close
  };

  const handleClear = () => {
    setDate(null);
    onSelect?.(undefined);
  };

  return (
    <div className="relative w-full">
      {/* Input field */}
      <div
        className="flex items-center border border-black/50 rounded-[8px] px-3 py-2 h-10 cursor-pointer focus-within:ring-2 focus-within:ring-brand-dark"
        onClick={() => setShowCalendar(!showCalendar)}
      >
        <input
          type="text"
          readOnly
          value={date ? format(date, 'dd/MM/yyyy') : ''}
          placeholder={placeholder}
          className="w-full text-sm text-[#121212] outline-none bg-transparent cursor-pointer"
        />
        {date && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClear();
            }}
            className="ml-2 text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        )}
        <ChevronDown className="ml-2 w-5 h-5 text-gray-400" />
      </div>

      {/* Calendar popover */}
      {showCalendar && (
        <div
          ref={calendarRef}
          className="absolute mt-2 z-50 bg-white rounded-lg shadow-lg p-4 w-full overflow-auto no-scrollbar"
        >
          <DayPicker
            mode="single"
            selected={date ?? undefined}
            onSelect={handleSelect}
            showOutsideDays
            captionLayout="dropdown" 
            className="text-sm text-brand-dark"
            classNames={{
               chevron: 'text-black'
            }}
          />
        </div>
      )}
    </div>
  );
}
