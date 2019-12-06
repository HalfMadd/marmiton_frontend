import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
//Pages
import Home from './pages/Home';

//Add
import AddRecette from './pages/AddRecette';
import AddCategorie from './pages/AddCategorie';
import AddIngredient from './pages/AddIngredient';
import AddUser from './pages/AddUser';

//Delete
import DelRecette from './pages/DelRecette';
import DelCategorie from './pages/DelCategorie';
import DelIngredient from './pages/DelIngredient';

//Details
import DetailsRecette from './pages/DetailsRecette';

//Components
import Recette from './components/Recette';
import Header from './components/Header';
import Footer from './components/Footer';


import logo from './logo.svg';
import './App.css';

class App extends Component{
  constructor(props){
    super(props);
  }

  componentWillMount(){
    console.log("Component will mount");
  }

  componentDidMount(){
    console.log("Component did mount");
  }

  render(){
    return (
      <BrowserRouter>
        <Header/>
        <Route path="/" exact component = {Home} />

        
        <Route path="/ajouter-recette" exact component = {AddRecette} />
        <Route path="/ajouter-categorie" exact component = {AddCategorie} />
        <Route path="/ajouter-ingredient" exact component = {AddIngredient} />
        <Route path="/ajouter-user" exact component = {AddUser} />

        <Route path="/supprimer-recette" exact component = {DelRecette} />
        <Route path="/supprimer-categorie" exact component = {DelCategorie} />
        <Route path="/supprimer-ingredient" exact component = {DelIngredient} />

        
        <Route path="/recettes/:id" exact component = {DetailsRecette} />



        <Footer/>
      </BrowserRouter>

    )
  }



}

export default App;