import React from 'react'
import { FiSearch } from 'react-icons/fi'


const SearchBar = ({ value, onChange, placeholder = "Search...", width }) => {
  return (
    <div className="search-bar" style={width ? { width } : undefined}>
      <FiSearch className="search-bar-icon" />
      <input
        className="search-bar-input"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default SearchBar;
