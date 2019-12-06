import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import UserService from '../services/users.services';

class Recette extends Component{

	constructor(props){
		super(props);

		this.state= {
			recetteur: ''
		}
	}

	async componentDidMount(){
		console.log(this.props.data.user_id);
		let responseRecetteur = await UserService.details(this.props.data.user_id);
		if(responseRecetteur.ok){
			let data = await responseRecetteur.json();
			this.setState({recetteur: data.user.name});
		}

		console.log('Recette Did Mount');
	}

	render(){
		return(
			
			<tr key={this.props.data._id}>
				<td><Link to={`/recettes/${this.props.data._id}`}>Details</Link></td>
				<td>{this.props.data._id}</td>
				<td>{this.props.data.name}</td>
				<td>
					<ul>
					{
                        this.props.data.ingredients.map((ingredient) => {
                            return (
                            	<li>{ingredient}</li>
                            )
                        })
                    }
					</ul>
				</td>
				<td>
					<ul>
					{
                        this.props.data.categories.map((categorie) => {
                            return (
                            	<li>{categorie}</li>
                            )
                        })
                    }
					</ul>
				</td>
				<td>{this.state.recetteur}</td>
				<td>
					<button className="btn btn-danger" onClick= { () => this.props.deleteRecette(this.props.data._id) }>Supprimer</button>
				</td>
			</tr>
			
		)
	}

}

export default Recette;