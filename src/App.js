import React, {useState, useEffect} from 'react'
import Img from './contenedor/img'
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import logo from './logo.png'

function App(){
  // state con urls de imagenes pokemon
  const [pokeData, setPokeData] = useState([]);

  const pokeApi = () => {
    const pokeSprites = [];

    /*const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    const obj = await res.json();
    const url = obj.results.map(it => it.url); // Extrae las urls a consulta del arreglo de objetos pokemon
    const resUrl = url.map(async it => await fetch(it));
    const data = resUrl.map(it => it.then(data => data).then(data => data.json()));
    const sprites = data.map(it => it.then(data => data.sprites.front_default).then(data => pokeSprites.push(data)));*/

    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then(res => res.json())
    .then(obj => obj.results)
    .then(arr => arr.map(it => it.url))
    .then(arrUrl => arrUrl.map(it => fetch(it)))
    .then(arrProm => arrProm.map(it => it.then(data => data).then(data => data.json())))
    .then(arrObj => arrObj.map(it => 
                               it.then(data => data)
                                  .then(data => data.sprites.front_default)
                                  .then(data => 
                                        setPokeData(it => [...it, data])
                                        )
                               )
          );

  setPokeData(() => pokeSprites);
  }

  useEffect(() =>{
    /*fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then(res => res.json())
    .then(obj => obj.results)
    .then(arr => arr.map(it => it.url))
    .then(arrUrl => arrUrl.map(it => fetch(it)))
    .then(arrProm => arrProm.map(it => it.then(data => data).then(data => data.json())))
    .then(arrObj => arrObj.map(it => 
                               it.then(data => data)
                                  .then(data => data.sprites.front_default)
                                  .then(data => 
                                        setPokeData(it => [...it, data])
                                        )
                               )
          );*/

    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then(res => res.json())
    .then(obj => obj.results)
    .then(arr => arr.map(it => it.url))
    .then(arrUrl => arrUrl.map(it => fetch(it)))
    .then(arrProm => arrProm.map(it => it.then(data => data).then(data => data.json())))
    .then(arrObj => arrObj.map(it => 
                                it.then(data => data)
                                  .then(data => setPokeData(it => [...it, data])
                                ))
          );
    console.log("!", pokeData)
  }, []);

  return (
    <div className = "main">
      <img src = {logo} className = "logo"></img>
      <div className = "container">
        {
          pokeData.map(it => it === {} ? null :
          <div className = "tarjeta">  
            <div className = "imagen">
              <Img 
                src = {it.sprites.front_default}
                key = {uuidv4()}
              />        
            </div> 
            <div className = "data">
              <p className = "header">Name</p>
              <p className = "name">{it.name.charAt(0).toUpperCase() + it.name.substring(1)}</p>
              <br/>
              <p className = "header">Type</p>
              <p className = "type">{it.types[0].type.name.charAt(0).toUpperCase() + it.types[0].type.name.substring(1)}</p>
            </div> 
          </div>
          )
        }
      </div>  
    </div>
  );
}

export default App

/*
            
*/