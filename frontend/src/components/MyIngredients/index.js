import React, { useState,useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import { Redirect } from "react-router-dom"
export default function MyIngredients() {

  const [ingredient_name, setIngredientName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [ingredientData, setIngredientData] = useState([])
  const [redirect, setRedirect] = useState(false)

  useEffect(async () => {
    await axios.get('/get_ingredients').then((res) =>{
      const ingredientDataRes = JSON.parse(res.data)
      setIngredientData(ingredientDataRes)
    })
  },[]);

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

// gets ingredients from database to display
  async function handleSubmit(event) {
    event.preventDefault()
    var csrftoken = getCookie('csrftoken');
    console.log('submitted')
    const json = JSON.stringify({ingredient_name:ingredient_name, quantity:quantity});
    const res = await axios.post('save_ingredient/', json, {
      headers: {
    // Overwrite Axios's automatically set Content-Type
      'Content-Type': 'application/json',
      'X-CSRFTOKEN' :csrftoken
    }
  }).then(res => {
      axios.get('/get_ingredients').then((res) =>{
        const ingredientDataRes = JSON.parse(res.data)
        console.log(ingredientDataRes)
        setIngredientData(ingredientDataRes)
      })
    })
  }
  async function getRecipes(event) {
    setRedirect(true)
    event.preventDefault()
    var csrftoken = getCookie('csrftoken');
    const res = await axios.get('get_recipes/', {
      headers: {
    // Overwrite Axios's automatically set Content-Type
      'Content-Type': 'application/json',
      'X-CSRFTOKEN' :csrftoken
    }
  }).then(res => {
      console.log(res)
    })
  }
  async function clearTable(event) {
    var csrftoken = getCookie('csrftoken');
    const res = await axios.get('clear_table/', {
      headers: {
    // Overwrite Axios's automatically set Content-Type
      'Content-Type': 'application/json',
      'X-CSRFTOKEN' :csrftoken
    }
  }).then(res => {
      window.location.reload()
    })
  }
  // generates table from with response data
  const tableGenerator = () => {
    return ingredientData.map(function(item,i){
      return (
        <>
        <tr>
        <td key={i}>{item.fields.name}</td>
        <td key={i+1}>{item.fields.quantity}</td>
        </tr>
        </>
      )
    })
  }

  if(redirect === true){
    return <Redirect to='recipes'></Redirect>
  }
  else{
    return (
      <>
        <div className="Ingredient_name">
          <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="ingredient_name">
            <Form.Label>ingredient</Form.Label>
            <Form.Control
              autoFocus
              type="ingredient_name"
              value={ingredient_name}
              onChange={(e) => setIngredientName(e.target.value)}
            />
          </Form.Group>
            <Form.Group size="lg" controlId="quantity">
              <Form.Label>quantity</Form.Label>
              <Form.Control
                type="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Form.Group>
            <Button block size="lg" type="submit" >
              Enter
            </Button>
          </Form>
        </div>
        <table>
          <tr>
            <th>Ingredient</th>
            <th>Quantity</th>
          </tr>
          {tableGenerator()}
        </table>
        <button onClick={getRecipes} type='submit'>Get Recipes</button>
        <button onClick={clearTable} type='submit'>Clear</button>
      </>
    );
 }
}
