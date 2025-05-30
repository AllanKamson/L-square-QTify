import React, { useState, useEffect } from "react";
import styles from "./Search.module.css";
import SearchIcon from "../../assets/search-icon.svg?react";
import useAutocomplete from "@mui/material/useAutocomplete";
import { styled } from "@mui/system";
import { truncate } from "../../helpers/helpers";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";

const Listbox = styled("ul")(({ theme }) => ({
  width: "100%",
  margin: 0,
  padding: 0,
  position: "absolute",
  borderRadius: "0px 0px 10px 10px",
  border: "1px solid var(--color-primary)",
  top: 60,
  height: "max-content",
  maxHeight: "500px",
  zIndex: 10,
  overflowY: "scroll",
  left: 0,
  bottom: 0,
  right: 0,
  listStyle: "none",
  backgroundColor: "var(--color-black)",
  overflow: "auto",
  "& li.Mui-focused": {
    backgroundColor: "#4a8df6",
    color: "white",
    cursor: "pointer",
  },
  "& li:active": {
    backgroundColor: "#2977f5",
    color: "white",
  },
}));

const API_BASE_URL = 'https://qtify-backend-labs.crio.do';

function Search({ searchData, placeholder }) {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const {
    getRootProps,
    getInputLabelProps,
    value,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    setAnchorEl
  } = useAutocomplete({
    id: "use-autocomplete-demo", 
    options: searchData || [],
    getOptionLabel: (option) => option.title,
    filterOptions: (options, {inputValue}) => {
      if(!inputValue) return [];
      return options.filter(option => option.title.toLowerCase().includes(inputValue.toLowerCase()));
    }
  });
  const { onChange: inputOnChange, ...inputProps } = getInputProps();
  const [ rawInputValue, setRawInputValue ] = useState('');

  useEffect(() => {
    const originalInputOnChange = inputOnChange;
    getInputProps().onChange = (event) => {
      setRawInputValue(event.target.value);
      originalInputOnChange(event);
    };
    return () => {
      getInputProps().onChange = originalInputOnChange;
    };
  }, [inputOnChange]);

  
  const onSubmit = async (e) => {
    e.preventDefault();
    const searchQuery = value ? value.slug : rawInputValue;

    if(!searchQuery) {
      console.warn("No search query provided.");
      setSearchResults([]);
      return;
    }
    console.log("Submitting search for:", searchQuery);
    setError(null);
    setIsLoading(true);
    setSearchResults([]);
    
    try {
      let apiUrl = '';
      if(value && value.slug) {
        navigate(`/album/${value.slug}`);
        setIsLoading(false);
        return;
      } else {
        apiUrl = `${API_BASE_URL}/songs?q=${encodeURIComponent(rawInputValue)}`;
      }
      const response = await fetch(apiUrl);
      if(!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log("API search response:", result);
      setSearchResults(result);
      if(result.length === 1 && result[0].slug){
        console.log("Single match found, navigate to:", `/album/${result[0].slug}`);
        navigate(`/album/${result[0].slug}`);
      }
    } catch (err) {
      console.error("Error fetching search result:", err);
      setError("Failed to fetch search results. Please try again after sometime.");
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
    
    //Process form data, call API, set state etc.
  };

  return (
    <div style={{ position: "relative" }} ref={setAnchorEl}>
      <form
        className={styles.wrapper}
        onSubmit={onSubmit}
      >
        <div {...getRootProps()}>
          <label {...getInputLabelProps()}
          htmlFor="search-album"></label>
          <input
            type="text"
            id="search-album"
            name="album"
            className={styles.search}
            placeholder={placeholder}
            required
            {...getInputProps()}
          />
        </div>
        <div>
          <button className={styles.searchButton} type="submit">
            <SearchIcon />
          </button>
        </div>
      </form>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {groupedOptions.map((option, index) => {
            const artists = option.songs.reduce((accumulator, currentValue) => {
              accumulator.push(...currentValue.artists);
              return accumulator;
            }, []);
            return (
              <li
                className={styles.listElement}
                {...getOptionProps({ option, index })}
              >
                <div>
                  <p className={styles.albumTitle}>{option.title}</p>
                  <p className={styles.albumArtists}>
                    {truncate(artists.join(", "), 40)}
                  </p>
                </div>
              </li>
            );
          })}
        </Listbox>
      ) : null}
      {isLoading && <p>Loading search results...</p>}
      {error && <p style={{ color: 'red'}}>{error}</p>}
      {!isLoading && !error && rawInputValue && searchResults.length === 0 && (
        <p>No results found for "{rawInputValue}".</p>
      )}
      {searchResults.length > 0 && !value && (
        <div className={styles.searchResultsContainer}>
          <h3>Search Results:</h3>
          <ul>
            {searchResults.map((album) => (
              <li key={album.id}>
                <a href={`/album/${album.slug}`}>{album.title}</a>
                (by {album.artists.join(', ')})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Search;


// import React from "react";
// import {ReactComponent as SearchIcon} from "../../assets/search-icon.svg"
// import styles from "./Search.module.css"

// const Search = ({ search }) => {
//   return (
//     <form className={styles.wrapper}>
//       <input className={styles.search} placeholder={search}></input>
//       <button className={styles.searchButton} type="submit">
//         <SearchIcon />
//       </button>
//     </form>
//   );
// };

// export default Search;