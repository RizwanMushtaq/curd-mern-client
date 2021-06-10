import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import './App.css';

function App() {
  
  const [foodName, setFoodName] = useState('')
  const [days, setDays] = useState(0)
  const[newFoodName, setNewFoodName] = useState('')
  const [foodList, setFoodList] = useState([])

  useEffect(()=> {
    Axios.get("http://localhost:80/read").then((response)=>{
      console.log(response)
      setFoodList(response.data) 
    })
  }, [])

  const addToList = () => {
    console.log(foodName + days);
    Axios.post("http://localhost:80/insert", {
      foodName: foodName,
      days: days,
    })
  }

  const updateFood = (id) => {
    Axios.put("http://localhost:80/update", {
      id:id,
      newFoodName: newFoodName,
    })
  }
  const deleteFood = (id) => {
    Axios.delete(`http://localhost:80/delete/${id}`)
  }

  return (
    <div className="App">
      <h1>CURD App with MERN</h1> 

      <label>Food Name</label>
      <input 
        type='text'
        onChange={(event)=> {setFoodName(event.target.value)}}>
      </input>
      
      <label>Days Since You Ate it</label>
      <input 
        type='number'
        onChange={(event)=> {setDays(event.target.value)}}>
      </input>
      
      <button onClick={addToList}>Add To List</button>
      
      <h1>Food List</h1>
      {foodList.map((val, key)=> {
        return <div key={key} className="listItem"> 
          <h2>{val.foodName}</h2> 
          <h2>{val.daysSinceIAte}</h2>
          <div>
          <input 
            type='text' 
            placeholder='New Food Name...'
            onChange={(event)=> {
              setNewFoodName(event.target.value)
            }}></input>
          <button onClick={() => updateFood(val._id)}>Update</button>
          </div>
          <button onClick={() => deleteFood(val._id)}>Delete</button>
        </div>
      })}

    </div>
  );
}

export default App;
