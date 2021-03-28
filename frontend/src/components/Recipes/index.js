import React, { useState,useEffect, useRef} from "react";
import { MdFavoriteBorder } from 'react-icons/md';
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {Container,CardContainer} from './RecipesElements'
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
        <Card id={recipe.id} ref={recipeRef} key={i} style={{ width: '18rem', margin:'30px' }}>
          <Card.Img variant="top" src={recipe.image} />
          <Card.Body style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
            <Card.Title style={{fontSize:'15px',textAlign:'center'}}>{recipe.title}</Card.Title>
            <Card.Text>
              {recipe.description}
            </Card.Text>
            <div style={{display:'flex', justifyContent:'space-evenly'}}>
              <Button className='custom-btn' onClick={viewRecipe} variant="primary">View Recipe</Button>
              <MdFavoriteBorder size={40}/>
            </div>
          </Card.Body>
        </Card>
      )
    })
  }
  return(
    <Container>
      <CardContainer>
      {cardGenerator()}
      </CardContainer>
    </Container>
  )
}
