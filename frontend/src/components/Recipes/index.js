import React, { useState,useEffect, useRef} from "react";
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
export default function Recipes(props){
  function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
  const [recipeData, setRecipeData] = useState([])
  const recipeRef = useRef(null)

  useEffect(async () => {
    await axios.get('/get_recipes').then((res) =>{
    setRecipeData(res.data)
    })
  },[]);
  function checkState(){
    console.log(recipeData[0].title)
  }
  async function viewRecipe(event){
    event.preventDefault()
      let recipe_id = recipeRef.current.id
      var csrftoken = getCookie('csrftoken');
      const json = JSON.stringify({recipe_id:recipe_id});
      const res = await axios.post('make_recipe/', json, {
        headers: {
      // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json',
        'X-CSRFTOKEN' :csrftoken
      }
    }).then(res => {props.cbFxn(res.statusText)})
  }

  const cardGenerator = () => {
    return recipeData.map(function(recipe,i){
      return (
        <Card  id={recipe.id} ref={recipeRef} key={i} style={{ width: '18rem' }}>
          <Card.Img variant="top" src={recipe.image} />
          <Card.Body>
            <Card.Title>{recipe.title}</Card.Title>
            <Card.Text>
              {recipe.description}
            </Card.Text>
            <Button onClick={viewRecipe} variant="primary">View Recipe</Button>
          </Card.Body>
        </Card>
      )
    })
  }
  return(
    <div>{cardGenerator()}<button onClick={checkState}> </button></div>
  )
}
