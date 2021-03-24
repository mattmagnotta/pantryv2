import React, { useState,useEffect } from "react";
import axios from 'axios'
import Card from 'react-bootstrap'
export default function Recipes(){
  const [recipeData, setRecipeData] = useState([])
  useEffect(async () => {
    await axios.get('/get_recipes').then((res) =>{
    setRecipeData(res.data)
    })
  },[]);
  function checkState(){
    console.log(recipeData[0].title)
  }
  const cardGenerator = () => {
    return recipeData.map(function(recipe,i){
      return (
        <div key={i}>
          {recipe.title}
        </div>
      )
    })
  }
  return(
    <div>{cardGenerator()}<button onClick={checkState}> </button></div>
  )
}
