import React, { useState } from 'react'

const CardRender = ({}) => {
  const [allPokemons, setAllPokemons] = useState([])
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')
  const getAllPokemons = async () => {
    const res = await axios.get(loadMore)

    setLoadMore(res.data.next)

    function addPoketoList(results) {
      results.forEach(async pokemon => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data = await res.json()
        setAllPokemons(currentList => [...currentList, data])
      })
    }
    addPoketoList(res.data.results)
  }
  return (
    <>
      <div className="text-stale-600">I am Card Render</div>
    </>
  )
}

export default CardRender