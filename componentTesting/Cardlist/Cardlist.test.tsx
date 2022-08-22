import {screen, render, waitFor, findAllByTestId} from "@testing-library/react"
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import CardList from './Cardlist'
import {ArrayCards} from "../../public/ArrayCards"
import {BrowserRouter} from "react-router-dom"
import userEvent from "@testing-library/user-event"
import CardListItem from "../Card/Card"
import jsxToString from 'jsx-to-string';
import { renderToString } from 'react-dom/server'

const server = setupServer()

const {data} = ArrayCards

beforeAll(() => {
  // Establish requests interception layer before all tests.
  server.listen()
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
    render(<CardList cards={[]}/>)
    const image = await screen.findByText(/No Results/i)
    expect(image).toBeInTheDocument()
})



it("ul is rendered if cards array is longer than length 0", async() => {
    render(<CardList cards={data}/>)
    const UL = await screen.findByTestId("ul")
    expect(UL).toBeInTheDocument()
})




it("CardlistItem component renders and cards are rendered", async () => {
    render(<CardList cards={data}/>)
    const UL = await screen.findByTestId("ul")
    //const {findAllByTestId} = render(<CardListItem card={data[0]}/>)
    const li = await screen.findAllByTestId("li")    
    expect(li).toHaveLength(2)
})



it("renders the card", () => {
    render(<CardList cards={data}/>)
})