import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import PokeTypes from '../Poketypes/Poketypes';

const SearchForm = ({ setCards }) => {
  const [searchTypes, setSearchTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleOnSubmit = async e => {
    e.preventDefault();
    let newData = []
    setCards([]);

    try {
      searchTerm  ==="" ?
      
         await axios.get(
        `https://api.pokemontcg.io/v2/cards?q=types:${searchTypes.join(',') || ''}`
      , {
			headers: {
				'X-Api-Key': "9951b2a4-a159-4931-a108-23a08fbfec88"
				}}).then(res => setCards(res.data.data))
       :
      await axios.get(
        `https://api.pokemontcg.io/v2/cards?q=name:${searchTerm}&types:${searchTypes.join(',') || ''}`
      , {
			headers: {
				'X-Api-Key': "9951b2a4-a159-4931-a108-23a08fbfec88"
		}}).then(res => setCards(res.data.data))
      setSearchTerm('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleTypeChange = e => {
    const { value, checked } = e.target;

    if (checked) {
      setSearchTypes(current => [...current, value]);
    } else {
      setSearchTypes(searchTypes.filter(type => type !== value));
    }
  };

  useEffect(() => {
    const getInitialCards = async () => {
      try {
        const { data } = await axios.get('https://api.pokemontcg.io/v2/cards?pageSize=50', {
			headers: {
				'X-Api-Key': "9951b2a4-a159-4931-a108-23a08fbfec88"
		}});

        setCards(data.data);
      } catch (err) {
        console.error(err);
      }
    };

    getInitialCards();
  }, []);

  return (
    <form className="flex flex-col items-center my-5" onSubmit={handleOnSubmit}>
      <div>
        <input
          className="border border-gray-500 rounded shadow h-full flex-grow p-1"
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button className="bg-blue-700 text-black border rounded shadow px-2 ml-2 h-full">
          Search
        </button>
      </div>
      <PokeTypes onInputChange={handleTypeChange} />
    </form>
  );
};

SearchForm.propTypes = {
  setCards: PropTypes.func
};

export default SearchForm;