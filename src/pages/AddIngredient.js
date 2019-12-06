import React, {Component} from 'react';

import IngredientService from '../services/ingredients.services';

class AddIngredient extends Component{

	constructor(props){
		super(props);

		this.state= {
			//elements a ajouter
			name: '',

			//elements à afficher

			//success et message
			success: false,
			msgSuccess: ''
		}
	}


	//change state value
	handleChange(e){
		this.setState({
			[e.target.id]: e.target.value
		})
	}

	//add ingredient
	async submit(e){
		e.preventDefault();
		this.setState({ success: false })

		let body = {
			name: this.state.name
		};
		let response = await IngredientService.create(body);
		if(response.ok){
			this.setState({
				success: true,
				msgSuccess: "Ingredient successfully created"
			})
			console.log("Ingredient created");
		}
	}


	render(){
		return(
			<div className="container">
				<h1>Ajouter un ingredient</h1>
				<form onSubmit = { (e) => this.submit(e) }>
					<div className="form-group">
						<h2>Nom</h2>
						<input type="text" className="form-control" required id="name" onChange={ (e) => this.handleChange(e) }/>
					</div>	

					<button type="submit" className="btn btn-primary">Ajouter l'ingredient</button>
				</form>

				{
					this.state.success ? <p>{this.state.msgSuccess}</p> : null
				}
			</div>	
		)
	}

}

export default AddIngredient;