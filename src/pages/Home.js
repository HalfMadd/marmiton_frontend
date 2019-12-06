import React, {Component} from 'react';
import Recette from '../components/Recette';
import RecetteService from '../services/recettes.services';
class Home extends Component{

	constructor(props){
		super(props);
		this.state = {
			recettes: [],
		};
	}

	async componentDidMount(){
		//Récup recettes
		let response = await RecetteService.list();
		if(response.ok){
			let data = await response.json();
			console.log(data.recettes);
			this.setState({recettes: data.recettes});
		}
	}

	async deleteRecette(id){
		let response = await RecetteService.delete(id);
		if(response.ok){
			let recettes = this.state.recettes;
			let index = recettes.findIndex(recette => recette._id === id);
			recettes.splice(index, 1);

			this.setState({recettes: recettes});
		}
	}

	

	render(){
		return(
			<div className="container">
				<table className="table">
                    <thead>
                        <tr>
                        	<th>Link</th>
                            <th>Id</th>
                            <th>Titre</th>
                            <th>Ingrédients</th>
                            <th>Catégories</th>
                            <th>Recetteur</th>
                        </tr>
                    </thead>
                    <tbody>
                         {
                            this.state.recettes.map((item, index) => {
                                return (
                                	<Recette key="{index}" data={item} deleteRecette={(id) => this.deleteRecette(id)}/>
                                )
                            })
                         }
                    </tbody>
                </table>
			</div>
		)
	}
}

export default Home;