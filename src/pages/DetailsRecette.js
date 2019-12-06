import React, {Component} from 'react';
import Recette from '../components/Recette';

import RecetteService from '../services/recettes.services';
import CategorieService from '../services/categories.services';
import IngredientService from '../services/ingredients.services';


class DetailsRecette extends Component{

	constructor(props){
		super(props);

		this.state= {
			//elements a ajouter
			name: '',
			contenu: '',
			categories: [],
			ingredients: [],
			user_id: '5de0d8a3edc7ff20acebca86',
			user_name: 'Paul',
			//elements à afficher
			categoriesDisplay: [],
			ingredientsDisplay: [],
			//success et message
			success: false,
			msgSuccess: ''
		}

	}

	async componentDidMount(){

		//récup recette
		let {id} = this.props.match.params;
		let response = await RecetteService.details(id);
		if(response.ok){
			let data = await response.json();
			console.log(data);
			this.setState({name: data.recette.name});
			this.setState({contenu: data.recette.contenu});
			this.setState({categories: data.recette.categories});
			this.setState({ingredients: data.recette.ingredients});
		}

		//Récup categories à afficher
		let responseCategorie = await CategorieService.list();
		if(responseCategorie.ok){
			let data = await responseCategorie.json();
			this.setState({categoriesDisplay: data.categories});
		}

		//Récup ingredients à afficher
		let responseIngredient = await IngredientService.list();
		if(responseIngredient.ok){
			let data = await responseIngredient.json();
			this.setState({ingredientsDisplay: data.ingredients});
		}

	}

	//change state value
	handleChange(e){
		this.setState({
			[e.target.id]: e.target.value
		})
	}

	//add values in categories
	handleChangeCheckboxCategories(e){
		const item = e.target.name;
    	const isChecked = e.target.checked;
    	if(isChecked){
    		let categories = this.state.categories;
    		categories.push(e.target.name);
    		this.setState({ categories: categories });
		}else{
			let categories = this.state.categories;
			let index = categories.findIndex(categorie => categorie.nom === e.target.name);
			categories.splice(index, 1);
			this.setState({categories: categories});
		}
	}

	//add values in ingredients
	handleChangeCheckboxIngredients(e){
		const item = e.target.name;
    	const isChecked = e.target.checked;
    	if(isChecked){
    		let ingredients = this.state.ingredients;
    		ingredients.push(e.target.name);
    		this.setState({ ingredients: ingredients });
		}else{
			let ingredients = this.state.ingredients;
			let index = ingredients.findIndex(ingredient => ingredients.name === e.target.name);
			ingredients.splice(index, 1);
			this.setState({ingredients: ingredients});
		}
	}

	//add recette
	async submit(e){
		e.preventDefault();
		this.setState({ success: false })

		let {id} = this.props.match.params;
		let body = {
			name: this.state.name,
			contenu: this.state.contenu,
			categories: this.state.categories,
			ingredients: this.state.ingredients,
			user_id: this.state.user_id,
			user_name: this.state.user_name,
		};

		let response = await RecetteService.update(id, body);
		if(response.ok){
			this.setState({
				success: true,
				msgSuccess: "Recette successfully modified"
			})
			this.props.history.push('/')
		}
	}


	render(){
		return(
			<div className="container">
				<h1>Details de recette</h1>
				<form onSubmit = { (e) => this.submit(e) }>
					<div className="form-group">
						<h2>Nom</h2>
						<input type="text" className="form-control" required id="name" value={this.state.name} onChange={ (e) => this.handleChange(e) }/>
					</div>
					
					<div className="form-group">
						<h2>Contenu</h2>
						<textarea className="form-control" required id="contenu" value={this.state.contenu} onChange={ (e) => this.handleChange(e) }/>
					</div>

					<div className="form-group">
						<h2>Catégories</h2>
						{
                            this.state.categoriesDisplay.map((item, index) => {
                                return (
                                	<div>
                                		{item.nom}
                                		{ this.state.categories.includes(item.nom) ?
                                			<input type="checkbox" name={item.nom}  onChange={ (e) => this.handleChangeCheckboxCategories(e) } checked />
                                		: 
                                			<input type="checkbox" name={item.nom}  onChange={ (e) => this.handleChangeCheckboxCategories(e) } />
                                		}
                                		
                                	</div>
                                )
                            })
                         }
					</div>

					<div className="form-group">
						<h2>Ingrédients</h2>
						{
                            this.state.ingredientsDisplay.map((item, index) => {
                                return (
                                	<div>
                                		{item.name}
                                		{ this.state.ingredients.includes(item.name) ?
                                			<input type="checkbox" name={item.name}  onChange={ (e) => this.handleChangeCheckboxIngredients(e) } checked />
                                		: 
                                			<input type="checkbox" name={item.name}  onChange={ (e) => this.handleChangeCheckboxIngredients(e) } />
                                		}
                                		
                                	</div>
                                )
                            })
                         }
					</div>					

					<button type="submit" className="btn btn-primary">Modifier la recette</button>
				</form>

				{
					this.state.success ? <p>{this.state.msgSuccess}</p> : null
				}
			</div>	
		)
	}

}

export default DetailsRecette;