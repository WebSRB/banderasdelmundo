
import React from 'react';
import FlipIcon from './icons/FlipIcon';

interface FlashcardProps {
  countryName: string;
  capitalName: string;
  flagImageUrl: string;
  isFlipped: boolean;
  onFlip: () => void;
}

const Flashcard: React.FC<FlashcardProps> = ({ countryName, capitalName, flagImageUrl, isFlipped, onFlip }) => {
  return (
    <div 
      className="w-full max-w-md h-80 bg-slate-800 rounded-xl shadow-2xl p-2 cursor-pointer group [perspective:1000px] flex flex-col justify-center items-center relative"
      onClick={onFlip}
    >
      <div 
        className={`relative w-full h-full duration-700 ease-in-out [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
      >
        {/* Front of the card */}
        <div className="absolute w-full h-full bg-sky-600 rounded-lg p-6 flex flex-col justify-center items-center [backface-visibility:hidden]">
          <h2 className="text-4xl font-bold text-white text-center break-words">{countryName}</h2>
          <p className="mt-2 text-sky-200 text-sm">País</p>
        </div>

        {/* Back of the card */}
        <div className="absolute w-full h-full bg-emerald-600 rounded-lg p-6 flex flex-col justify-center items-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <h3 className="text-3xl font-semibold text-white text-center break-words">{capitalName}</h3>
          <p className="mt-1 text-emerald-200 text-sm">Capital</p>
          {flagImageUrl && (
            <img 
              src={flagImageUrl} 
              alt={`Bandera de ${countryName}`} 
              className="mt-4 w-36 h-24 object-cover rounded-md border-2 border-slate-300 shadow-lg" 
              onError={(e) => { (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/placeholder-error/240/160'; }} // Fallback image
            />
          )}
        </div>
      </div>
      <div className="absolute bottom-3 right-3 opacity-50 group-hover:opacity-100 transition-opacity">
        <FlipIcon className="w-5 h-5 text-slate-400" />
      </div>
    </div>
  );
};

export default Flashcard;
