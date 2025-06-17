
import React from 'react';
import { Continent } from '../types';

interface ContinentSelectorProps {
  continents: Continent[];
  selectedContinent: Continent | null;
  onSelectContinent: (continent: Continent) => void;
}

const ContinentSelector: React.FC<ContinentSelectorProps> = ({ continents, selectedContinent, onSelectContinent }) => {
  if (continents.length === 0) {
    return <p className="text-center text-slate-400">No continents available.</p>;
  }
  
  if (continents.length === 1 && continents[0]) {
     // If only one continent, display its name instead of a selector
     return (
        <div className="my-6 text-center">
            <h2 className="text-2xl font-semibold text-sky-400">{continents[0]}</h2>
        </div>
     );
  }

  return (
    <div className="my-6 flex flex-col items-center">
      <label htmlFor="continent-select" className="mb-2 text-lg font-medium text-slate-300">
        Elige un Continente:
      </label>
      <select
        id="continent-select"
        value={selectedContinent || ''}
        onChange={(e) => onSelectContinent(e.target.value as Continent)}
        className="bg-slate-700 border border-slate-600 text-slate-100 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full max-w-xs p-2.5 shadow-md"
      >
        {continents.map((continent) => (
          <option key={continent} value={continent}>
            {continent}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ContinentSelector;
