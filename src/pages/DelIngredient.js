import React, {Component} from 'react';

import IngredientService from '../services/ingredients.services';

class DelIngredient extends Component{

	constructor(props){
		super(props);
		this.state = {
			ingredients: [],
		};
	}

	async componentDidMount(){
		//Récup ingredients
		let response = await IngredientService.list();
		if(response.ok){
			let data = await response.json();
			console.log(data.ingredients);
			this.setState({ingredients: data.ingredients});
		}
	}

	async deleteIngredient(id){
		let response = await IngredientService.delete(id);
		if(response.ok){
			let ingredients = this.state.ingredients;
			let index = ingredients.findIndex(ingredient => ingredient._id === id);
			ingredients.splice(index, 1);

			this.setState({ingredients: ingredients});
		}
	}

	

	render(){
		return(
			<div className="container">
				<table className="table">
                    <thead>
                        <tr>
                        	<th>Nom</th>
                        </tr>
                    </thead>
                    <tbody>
                         {
                            this.state.ingredients.map((item, index) => {
                                return (
                                	<tr key={item._id}>
                                		<td>{item.name}</td>
                                		<td><button className="btn btn-danger" onClick= { () => this.deleteIngredient(item._id) }>Supprimer</button></td>
                                	</tr>
                                )
                            })
                         }
                    </tbody>
                </table>
			</div>
		)
	}
}

export default DelIngredient;