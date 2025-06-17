
import React, { useState, useEffect, useCallback } from 'react';
import { Continent, CountryInfo } from './types';
import { countryData, availableContinents } from './data';
import ContinentSelector from './components/ContinentSelector';
import Flashcard from './components/Flashcard';
import NavigationButtons from './components/NavigationButtons';

const App: React.FC = () => {
  const [selectedContinent, setSelectedContinent] = useState<Continent | null>(null);
  const [filteredCountries, setFilteredCountries] = useState<CountryInfo[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);

  useEffect(() => {
    if (availableContinents.length > 0 && !selectedContinent) {
      setSelectedContinent(availableContinents[0] as Continent);
    }
  }, [selectedContinent]);

  useEffect(() => {
    if (selectedContinent) {
      const countries = countryData.filter(country => country.continent === selectedContinent);
      setFilteredCountries(countries);
      setCurrentCardIndex(0);
      setIsCardFlipped(false);
    } else {
      setFilteredCountries([]); // Handles case where no continent might be selected initially or if data is empty
    }
  }, [selectedContinent]);

  const handleSelectContinent = useCallback((continent: Continent) => {
    setSelectedContinent(continent);
  }, []);

  const handleNextCountry = useCallback(() => {
    if (currentCardIndex < filteredCountries.length - 1) {
      setCurrentCardIndex(prevIndex => prevIndex + 1);
      setIsCardFlipped(false);
    }
  }, [currentCardIndex, filteredCountries.length]);

  const handlePreviousCountry = useCallback(() => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prevIndex => prevIndex - 1);
      setIsCardFlipped(false);
    }
  }, [currentCardIndex]);

  const handleFlipCard = useCallback(() => {
    setIsCardFlipped(prev => !prev);
  }, []);

  const currentCountry = filteredCountries[currentCardIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full p-4">
      <header className="mb-8 text-center">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-500">
          Capitales y Banderas
        </h1>
        <p className="text-slate-400 mt-2 text-lg">Aprende jugando las capitales del mundo.</p>
      </header>

      <main className="w-full max-w-lg flex flex-col items-center">
        <ContinentSelector
          continents={availableContinents}
          selectedContinent={selectedContinent}
          onSelectContinent={handleSelectContinent}
        />

        {filteredCountries.length > 0 && currentCountry ? (
          <>
            <Flashcard
              countryName={currentCountry.name}
              capitalName={currentCountry.capital}
              flagImageUrl={currentCountry.flagImageUrl}
              isFlipped={isCardFlipped}
              onFlip={handleFlipCard}
            />
            <NavigationButtons
              onPrevious={handlePreviousCountry}
              onNext={handleNextCountry}
              hasPrevious={currentCardIndex > 0}
              hasNext={currentCardIndex < filteredCountries.length - 1}
              currentIndex={currentCardIndex}
              totalCards={filteredCountries.length}
            />
          </>
        ) : (
          <div className="mt-10 p-8 bg-slate-800 rounded-lg shadow-xl">
            <p className="text-xl text-slate-300 text-center">
              {selectedContinent ? `No hay países para ${selectedContinent} en nuestros datos.` : 'Por favor, selecciona un continente para empezar.'}
            </p>
          </div>
        )}
      </main>
      
      <footer className="mt-12 text-center text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} Capitales y Banderas App. Inspirado en WWW.CAPITALESYBANDERAS.COM.</p>
      </footer>
    </div>
  );
};

export default App;
