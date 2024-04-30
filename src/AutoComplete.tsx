import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './style.css';

interface AutocompleteProps {
  suggestions: string[];
  apiUrl: string; // API endpoint URL
  onSelect: (selected: string) => void;
}

const Autocomplete: React.FC<AutocompleteProps> = ({ suggestions, apiUrl, onSelect }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [suggestionsList, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [activeSuggestion, setActiveSuggestion] = useState<number>(0);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await fetch(apiUrl); // Fetch data from API
        const data = await response.json();
        setSuggestions(data); // Set fetched suggestions
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };
    fetchSuggestions();
  }, [apiUrl]);
  
  // Filtered suggestions memoization
  const filteredSuggestions = useMemo(() => {
    return suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [suggestions, inputValue]);

  // Debounce input change handler
  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      setInputValue(inputValue);
      setShowSuggestions(true);
    },
    []
  );

  // Handle suggestion selection
  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      setInputValue(suggestion);
      setShowSuggestions(false);
      onSelect(suggestion);
    },
    [onSelect]
  );

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setActiveSuggestion((prev) => Math.max(prev - 1, 0));
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        setActiveSuggestion((prev) => Math.min(prev + 1, filteredSuggestions.length - 1));
      } else if (event.key === 'Enter') {
        setInputValue(filteredSuggestions[activeSuggestion]);
        setShowSuggestions(false);
        onSelect(filteredSuggestions[activeSuggestion]);
      }
    },
    [activeSuggestion, filteredSuggestions, onSelect]
  );

  // Highlight matching part of the suggestion
  const highlightMatch = (suggestion: string) => {
    const index = suggestion.toLowerCase().indexOf(inputValue.toLowerCase());
    const match = suggestion.slice(index, index + inputValue.length);
    const parts = suggestion.split(new RegExp(`(${match})`, 'i'));
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === match.toLowerCase() ? (
            <strong key={index}>{part}</strong>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <div className="autocomplete">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type to search..."
      />
      {showSuggestions && inputValue && (
        <ul className="suggestions">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              className={index === activeSuggestion ? 'active' : ''}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {highlightMatch(suggestion)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
