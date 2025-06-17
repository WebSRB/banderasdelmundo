
import React from 'react';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import ArrowRightIcon from './icons/ArrowRightIcon';

interface NavigationButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
  currentIndex: number;
  totalCards: number;
}

const NavigationButton: React.FC<{ onClick: () => void; disabled: boolean; children: React.ReactNode; ariaLabel: string; className?: string }> = ({ onClick, disabled, children, ariaLabel, className }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    aria-label={ariaLabel}
    className={`p-3 rounded-full transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50
                ${disabled ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-sky-600 hover:bg-sky-500 text-white shadow-md active:bg-sky-700'}
                ${className}`}
  >
    {children}
  </button>
);


const NavigationButtons: React.FC<NavigationButtonsProps> = ({ onPrevious, onNext, hasPrevious, hasNext, currentIndex, totalCards }) => {
  return (
    <div className="mt-8 flex justify-between items-center w-full max-w-md">
      <NavigationButton onClick={onPrevious} disabled={!hasPrevious} ariaLabel="Previous card">
        <ArrowLeftIcon className="w-6 h-6" />
      </NavigationButton>
      
      {totalCards > 0 && (
        <span className="text-slate-400 text-sm tabular-nums">
          {currentIndex + 1} / {totalCards}
        </span>
      )}

      <NavigationButton onClick={onNext} disabled={!hasNext} ariaLabel="Next card">
        <ArrowRightIcon className="w-6 h-6" />
      </NavigationButton>
    </div>
  );
};

export default NavigationButtons;
