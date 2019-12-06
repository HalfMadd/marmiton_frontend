import React, {Component} from 'react';

import RecetteService from '../services/recettes.services';
import CategorieService from '../services/categories.services';
import IngredientService from '../services/ingredients.services';
import UserService from '../services/ingredients.services';

class AddRecette extends Component{

	constructor(props){
		super(props);

		this.state= {
			//elements a ajouter
			name: '',
			contenu: '',
			categories: [],
			ingredients: [],
			user_id: '5de0d8a3edc7ff20acebca86',
			//elements à afficher
			categoriesDisplay: [],
			ingredientsDisplay: [],
			usersDisplay: [],
			//success et message
			success: false,
			msgSuccess: ''
		}

	}

	async componentDidMount(){
		//Récup categories
		let responseCategorie = await CategorieService.list();
		if(responseCategorie.ok){
			let data = await responseCategorie.json();
			this.setState({categoriesDisplay: data.categories});
		}

		//Récup ingredients
		let responseIngredient = await IngredientService.list();
		if(responseIngredient.ok){
			let data = await responseIngredient.json();
			this.setState({ingredientsDisplay: data.ingredients});
		}

		//Récup users
		// let responseUser = await UserService.list();
		// if(responseUser.ok){
		// 	let data = await responseUser.json();
		// 	this.setState({usersDisplay: data.users});
		// }
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

		let body = {
			name: this.state.name,
			contenu: this.state.contenu,
			categories: this.state.categories,
			ingredients: this.state.ingredients,
			user_id: this.state.user_id
		};
		let response = await RecetteService.create(body);
		if(response.ok){
			this.setState({
				success: true,
				msgSuccess: "Recette successfully created"
			})
			console.log("Recette created");
		}
	}


	render(){
		return(
			<div className="container">
				<h1>Ajouter une recette</h1>
				<form onSubmit = { (e) => this.submit(e) }>
					<div className="form-group">
						<h2>Nom</h2>
						<input type="text" className="form-control" required id="name" onChange={ (e) => this.handleChange(e) }/>
					</div>
					
					<div className="form-group">
						<h2>Contenu</h2>
						<textarea className="form-control" required id="contenu" onChange={ (e) => this.handleChange(e) }/>
					</div>

					<div className="form-group">
						<h2>Catégories</h2>
						{
                            this.state.categoriesDisplay.map((item, index) => {
                                return (
                                	<div>
                                		{item.nom}
                                		<input type="checkbox" name={item.nom} onChange={ (e) => this.handleChangeCheckboxCategories(e) }/>
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
                                		<input type="checkbox" name={item.name} onChange={ (e) => this.handleChangeCheckboxIngredients(e) }/>
                                	</div>
                                )
                            })
                         }
					</div>				

					<button type="submit" className="btn btn-primary">Ajouter la recette</button>
				</form>

				{
					this.state.success ? <p>{this.state.msgSuccess}</p> : null
				}
			</div>	
		)
	}

}

export default AddRecette;