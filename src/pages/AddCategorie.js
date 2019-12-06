import React, {Component} from 'react';

import CategorieService from '../services/categories.services';

class AddCategorie extends Component{

	constructor(props){
		super(props);

		this.state= {
			//elements a ajouter
			nom: '',

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

	//add categorie
	async submit(e){
		e.preventDefault();
		this.setState({ success: false })

		let body = {
			nom: this.state.nom
		};
		let response = await CategorieService.create(body);
		if(response.ok){
			this.setState({
				success: true,
				msgSuccess: "Categorie successfully created"
			})
			console.log("Categorie created");
		}
	}


	render(){
		return(
			<div className="container">
				<h1>Ajouter une categorie</h1>
				<form onSubmit = { (e) => this.submit(e) }>
					<div className="form-group">
						<h2>Nom</h2>
						<input type="text" className="form-control" required id="nom" onChange={ (e) => this.handleChange(e) }/>
					</div>	

					<button type="submit" className="btn btn-primary">Ajouter la categorie</button>
				</form>

				{
					this.state.success ? <p>{this.state.msgSuccess}</p> : null
				}
			</div>	
		)
	}

}

export default AddCategorie;