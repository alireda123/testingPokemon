import Head from 'next/head'
import Image from 'next/image'
import SearchForm from '../componentTesting/SearchForm/SearchForm';
import CardList from '../componentTesting/Cardlist/Cardlist';
import {useState} from "react"

export default function Home() {

   const [cards, setCards] = useState([]);

  return (
    <div >
      <div className="flex flex-col">
        <div className="flex justify-center bg-red-700 text-black">
        <h1 className="text-3xl text-white py-2">Pokemon TCG Search</h1>
      </div>
      <div className="flex flex-col">
        <SearchForm setCards={setCards} />
        <CardList cards={cards} />
      </div>
      </div>
    </div>
  )
}
