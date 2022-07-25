import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Cards from '../components/Cards';

function Home() {
  const [found, setFound] = useState(false)
  const [singlepoke, setSinglePoke] = useState()
  const [allPokemons, setAllPokemons] = useState([])
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')

  const colorpicker = (type) => {
    var color = []
    if (type=="fire"){color = ["#dc2626", "#fca5a5"]}
    if (type=="grass"){ color = ["#84cc16", "#bef264"]}
    if (type=="electric"){ color = ["#6366f1", "#a5b4fc"]}
    if (type=="water"){ color = ["#3b82f6", "#93c5fd"]}
    if (type=="ground"){ color = ["#10b981", "#6ee7b7"]}
    if (type=="rock"){ color = ["#6b7280", "#d1d5db"]}
    if (type=="fairy"){ color = ["#ec4899", "#f9a8d4"]}
    if (type=="poison"){ color = ["#a855f7", "#d8b4fe"]}
    if (type=="bug"){ color = ["#22c55e", "#86efac"]}
    if (type=="dragon"){ color = ["#b91c1c", "#ef4444"]}
    if (type=="psychic"){ color = ["#e11d48", "#fb7185"]}
    if (type=="flying"){ color = ["#0ea5e9", "#7dd3fc"]}
    if (type=="fighting"){ color = ["#f97316", "#fdba74"]}
    if (type=="normal"){ color = ["#facc15", "#fef08a"]}
  return color
  }

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

  useEffect(() => {
    getAllPokemons()
  }, [])

  const findYourPokemon = async (e) => {
    e.preventDefault();
    setFound(true)
    try {
      const pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${e.target.pokename.value}`)
      setSinglePoke(pokemon.data)
    } catch (error) {
      console.log(error)
    }
  }
  console.log(singlepoke)

  const back = () => {
    setFound(false)
  }

  return (
    <>
      <div className="block p-2 text-5xl mb-6">
        Find Your Pokemon
      </div>
      <div className="in-search" >
        <form className='flex justify-between gap-8' onSubmit={(e) => findYourPokemon(e)}>
          <input type="text" name="pokename" autoComplete='off' className='px-4 py-2 rounded-md text-black' />
          <button type='submit' className='px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md shadow-md hover:shadow-blue-600 cursor-pointer'>Search</button>
        </form>
      </div>

      <div className="cardwrapper flex flex-wrap justify-center p-10">
        {!found ? <div className='text-center'>
          <div className="wrapper flex flex-wrap justify-center p-10">
            {allPokemons.map((item, index) => {
              return (
                <Cards name={item.name}
                  type={item.types[0].type.name}
                  image={item.sprites.other.dream_world.front_default}
                  gradcolor = {colorpicker(item.types[0].type.name)}
                  key={index}
                />
              )
            })}
          </div>
          <button onClick={getAllPokemons} className="text-white text-xl bg-slate-600 rounded-lg p-2 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 cursor-pointer">Load More...</button>
        </div>
          : <div className="wrapper flex flex-wrap flex-col justify-center p-10">
            <Cards name={singlepoke?.name}
              type={singlepoke?.types[0]?.type?.name}
              image={singlepoke?.sprites.other.dream_world.front_default}
              gradcolor={colorpicker(singlepoke?.types[0].type.name)}
            />
            <button onClick={() => back()} className="text-white text-xl bg-slate-600 rounded-lg p-2 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 cursor-pointer">Go Back</button>
          </div>
        }
      </div>
    </>
  )
}

export default Home