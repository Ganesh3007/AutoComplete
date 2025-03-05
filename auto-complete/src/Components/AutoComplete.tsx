import React, { useCallback, useEffect, useState } from "react";
import List from "./List";
import { debounce } from "../utils/debounce";
import useCache from "../Hooks/useCache";

interface AutoCompleteProps {
  placeholder?: string;
  loadingText?: string;
  noDataText?: string;
  fetchSuggestions: Function;
  customStyles?: React.CSSProperties;
  dataKey?: string;
  caching?: boolean;
}

const AutoComplete = ({
  placeholder = "",
  loadingText = "Loading...",
  noDataText = "No data Found",
  fetchSuggestions,
  customStyles = {},
  dataKey = "",
  caching = true,
}: AutoCompleteProps) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showList, setShowList] = useState(false);
  const { getCache, setCache } = useCache();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const onBlur = () => {
    setShowList(false);
  };

  const onFocus = () => {
    setShowList(true);
  };

  const getSuggestions = async (query) => {
    setError(null);

    setLoading(true);
    try {
      let result;
      const cachedData = getCache(query);
      if (caching && cachedData) {
        result = cachedData;
      } else {
        result = await fetchSuggestions(query);
        setCache(query, result);
      }
      setSuggestions(result);
    } catch (err) {
      setError("Failed to fetch receipes");
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };
  const getSuggestionsDebounced = useCallback(
    debounce(getSuggestions, 300),
    []
  );

  useEffect(() => {
    if (inputValue.trim().length > 1) {
      getSuggestionsDebounced(inputValue);
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  return (
    <div className="container">
      <input
        type="search"
        aria-description="search results will appear below"
        aria-autocomplete="list"
        value={inputValue}
        placeholder={placeholder}
        style={customStyles}
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={handleInputChange}
      />

      {showList && (
        <div className="list" role="listbox">
          {error && <div className="error">{error}</div>}
          {loading && <div className="loading">{loadingText}</div>}
          {!loading &&
            !error &&
            suggestions.length === 0 &&
            inputValue.length > 2 && (
              <div className="loading">{noDataText}</div>
            )}
          {suggestions.length > 0 && !loading && !error && (
            <List
              dataKey={dataKey}
              highlight={inputValue}
              suggestions={suggestions}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default AutoComplete;
