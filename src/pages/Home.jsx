import axios from 'axios'
import React from 'react'

function home() {
  const getAllPokemons = async () => {
    const data = await axios.get('https://pokeapi.co/api/v2/pokemon/bulbasaur');
    console.log(data)
  }

  getAllPokemons()

  return (
    <>

    </>
  )
}

export default home