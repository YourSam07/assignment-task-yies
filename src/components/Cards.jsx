import React from 'react'

function Cards({name, type, image, gradcolor=[]}) {
  return (
    <div className="card px-4 py-3 flex flex-col justify-center text-center shadow-md shadow-slate-100 bg-white rounded-lg m-4 hover:cursor-pointer hover:scale-105"
    style={{
      backgroundImage: `linear-gradient(${gradcolor[0]}, ${gradcolor[1]})`
    }}>
      <div className="name text-black text-xl">
        {name}
      </div>
      <div className="image">
        <img src={image} alt="" style={{height: '250px', width: '200px'}} />
      </div>
      <div className="type  text-black text-xl">
        Type: {type}
      </div>
    </div>
  )
}

export default Cards