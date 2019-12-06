import React, {Component} from 'react';

import CategorieService from '../services/categories.services';

class DelCategorie extends Component{

	constructor(props){
		super(props);
		this.state = {
			categories: [],
		};
	}

	async componentDidMount(){
		//Récup categories
		let response = await CategorieService.list();
		if(response.ok){
			let data = await response.json();
			console.log(data.categories);
			this.setState({categories: data.categories});
		}
	}

	async deleteCategorie(id){
		let response = await CategorieService.delete(id);
		if(response.ok){
			let categories = this.state.categories;
			let index = categories.findIndex(categorie => categorie._id === id);
			categories.splice(index, 1);

			this.setState({categories: categories});
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
                            this.state.categories.map((item, index) => {
                                return (
                                	<tr key={item._id}>
                                		<td>{item.nom}</td>
                                		<td><button className="btn btn-danger" onClick= { () => this.deleteCategorie(item._id) }>Supprimer</button></td>
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

export default DelCategorie;