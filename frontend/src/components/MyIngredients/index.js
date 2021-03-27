import React, { useState,useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import axios from 'axios';
import { Redirect } from "react-router-dom"
import {Container,IngredientsContainer, TableContainer} from './IngredientElements'

export default function MyIngredients() {

  const [ingredient_name, setIngredientName] = useState("");
  const [quantity, setQuantity] = useState("1");
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
  function consolog(){
    console.log(ingredientData)
  }
  // generates table from with response data
  const tableGenerator = () => {
    return ingredientData.map(function(item,i){
      return (
        <>
        <tr key={i}>
        <td style={{color:'white'}}>{item.fields.name}</td>
        <td style={{color:'white'}}>{item.fields.quantity}</td>
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
      <Container>
        <IngredientsContainer>
          <h3>Step 1 - Add one ingredient at a time</h3>
          <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="ingredient_name">
            <Form.Label style={{color:'white'}}>Ingredient</Form.Label>
            <Form.Control
              autoFocus
              defaultValue='apple'
              type="ingredient_name"
              value={ingredient_name}
              onChange={(e) => setIngredientName(e.target.value)}
            />
          </Form.Group>
            <Form.Group size="lg" controlId="quantity">
              <Form.Label style={{color:'white'}}>quantity</Form.Label>
              <Form.Control
                type="quantity"
                defaultValue={1}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Form.Group>
            <Button className="custom-btn" block size="lg" type="submit" >
              Add Ingredient
            </Button>
          </Form>
          <TableContainer>
          {ingredientData.length > 0 && <div style={{}}>
            <h3>Step 2 - Click get recipes</h3>
            <Table striped bordered >
            <tr>
              <th style={{color:'white'}}>Ingredient</th>
              <th style={{color:'white'}}>Quantity</th>
            </tr>
            {tableGenerator()}
          </Table>
            <Button  className="custom-btn" style={{marginTop:'10px'}} block size='lg' onClick={getRecipes} type='submit'>Get Recipes</Button>
            </div>
          }
          </TableContainer>
        </IngredientsContainer>
      </Container>
    );
  }
}
