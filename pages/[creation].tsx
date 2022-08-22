/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router'
import axios from "axios"
// pages/posts/[id].js

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const posts = await fetch('https://api.pokemontcg.io/v1/cards');
  const {cards} = await posts.json();
  //const {cards}: any = await posts
  // Get the paths we want to pre-render based on posts
  const paths = cards.map((post) => ({
    params: { creation: post.id },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  const posts = await fetch(`https://api.pokemontcg.io/v1/cards/${params.creation}`)
  const post = await posts.json()
  // Pass post data to the page via props
  return { props: { post } }
}




export default function Post ({post}){
  
  const {card} = post
  return(


    <li className="flex flex-col justify-center min-h-screen  items-center">
      <a className="block h-full"  rel="noopener noreferrer">
        
        <img className="w-full h-auto" width={490} height={684} src={card.imageUrl} alt={`${card.name} Pokemon Card`} />
      </a>
    </li>
  )
}

