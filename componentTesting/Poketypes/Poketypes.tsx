import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const types = [
    "Colorless",
    "Darkness",
    "Dragon",
    "Fairy",
    "Fighting",
    "Fire",
    "Grass",
    "Lightning",
    "Metal",
    "Psychic",
    "Water"
]

const PokeTypes = ({ onInputChange }) => {
  
  return (
    <div className="w-full grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 p-5">
      {types && types.map(type => (
        <label
          className={`flex justify-between border rounded py-1 px-2 cursor-pointer text-${type.toLowerCase()} border-${type.toLowerCase()}`}
          key={type}
        >
          <span>{type}</span>
          <input
            type="checkbox"
            className="ml-2"
            name="pokemonType"
            value={type}
            onChange={onInputChange}
          />
        </label>
      ))}
    </div>
  );
};

PokeTypes.propTypes = {
  onInputChange: PropTypes.func
};

export default PokeTypes;