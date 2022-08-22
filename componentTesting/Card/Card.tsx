/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {useRouter} from "next/router"



const CardListItem = ({ card }) => {
  
  let router = useRouter()
  const pokeDotCom = `https://www.pokemon.com/us/pokemon-tcg/pokemon-cards/?cardName=${
    card.name || ''
  }&evolvesFrom=${card.evolvesFrom || ''}&particularArtist=${card.artist || ''}`;

  return (
    <li data-testid="li" className="flex flex-col   items-center">
      <a className="block h-full"  href={pokeDotCom} rel="noopener noreferrer">
        <img className="w-full h-auto" src={card.images.large} alt={`${card.name} Pokemon Card`} />
      </a>
      <Link role="link" href={`/${card.id}`}>
         <button onClick={() => router.push(`/${card.id}`)} className="w-1/2 bg-teal-600 mt-2 rounded-md">View individually on separate page</button>
      </Link>
    </li>
  );
};
//bro test the pokemon website if the link works
export default CardListItem;