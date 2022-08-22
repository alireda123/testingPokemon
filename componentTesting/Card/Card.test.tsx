import {screen, render, waitFor} from "@testing-library/react"
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import CardListItem from './Card'
import {card} from "../../public/card"
import {BrowserRouter} from "react-router-dom"
import userEvent from "@testing-library/user-event"

const server = setupServer()

const {data} = card 

beforeAll(() => {
  // Establish requests interception layer before all tests.
  server.listen()
})
afterAll(() => {
  // Clean up after all tests are done, preventing this
  // interception layer from affecting irrelevant tests.
  server.close()
})


it("renders the card",async () => {
    render(<CardListItem card={data}/>)
    const image = await screen.findByAltText(/Aggron/i)
    expect(image).toBeInTheDocument()
})



it("does button link to other page",async() => {
     
    render(
    <BrowserRouter>
    <CardListItem card={data}/>
    </BrowserRouter>)
  
    
    const newurl = window.location.href + "ex16-1"

    

    const button = await screen.findByRole("button")
    userEvent.click(button);
    
    await waitFor(() => expect(window.location.pathname).toBe("ex16-1"))   

})




it("renders the card", () => {
    render(<CardListItem card={data}/>)
})



it("renders the card", () => {
    render(<CardListItem card={data}/>)
})