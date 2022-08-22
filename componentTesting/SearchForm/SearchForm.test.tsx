import {screen, render, waitFor, findAllByTestId} from "@testing-library/react"
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import CardList from '../Cardlist/Cardlist'
import {ArrayCards} from "../../public/ArrayCards"
import {BrowserRouter} from "react-router-dom"
import userEvent from "@testing-library/user-event"
import CardListItem from "../Card/Card"
import {card} from "../../public/card"
import {fiftycards} from "../../public/50cards"
import SearchForm from "./SearchForm" 
import {useState} from "react"


const server = setupServer()
const {data} = ArrayCards
const cardlist = render(<CardList cards={data}/>)
const singleCardData = card.data
const cardlistitem = render(<CardListItem card={singleCardData}/>)
const setCards = () => {

}


beforeAll(() => {
  // Establish requests interception layer before all tests.
  server.listen()
  
})
beforeEach(() => {
  server.use(
    rest.get("https://api.pokemontcg.io/v2/cards", (req,res,ctx) => {
    return res(ctx.json({
        fiftycards
      }))
    })
    
  )
  
})
afterEach(() => {
  server.resetHandlers()
})
afterAll(() => {
  // Clean up after all tests are done, preventing this
  // interception layer from affecting irrelevant tests.
  server.close()
})


it("if no cards, it shows no result",async () => {
    render(<SearchForm setCards={jest.fn()}/>)
    
    const allCards = await screen.findAllByTestId("li")
    console.log(allCards)
    expect(allCards.length).toBe(50)
})


