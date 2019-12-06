import React, {Component} from 'react';

import UserService from '../services/users.services';
import RoleService from '../services/roles.services';

class AddUser extends Component{

	constructor(props){
		super(props);

		this.state= {
			//elements a ajouter
			name: '',
			role: '',
			mdp: '',
			//elements à afficher
			rolesDisplay: [],
			//success et message
			success: false,
			msgSuccess: ''
		}

	}

	async componentDidMount(){
		//Récup roles
		let responseRole = await RoleService.list();
		if(responseRole.ok){
			let data = await responseRole.json();
			this.setState({rolesDisplay: data.roles});
		}
	}

	//change state value
	handleChange(e){
		this.setState({
			[e.target.id]: e.target.value
		})
	}

	//add recette
	async submit(e){
		e.preventDefault();
		this.setState({ success: false })

		let body = {
			name: this.state.name,
			role: this.state.role,
			mdp: this.state.mdp
		};

		console.log(this.state.role);
		let response = await UserService.create(body);
		if(response.ok){
			this.setState({
				success: true,
				msgSuccess: "User successfully created"
			})
			console.log("User created");
		}
	}


	render(){
		return(
			<div className="container">
				<h1>Ajouter un utilisateur</h1>
				<form onSubmit = { (e) => this.submit(e) }>
					<div className="form-group">
						<h2>Nom</h2>
						<input type="text" className="form-control" required id="name" onChange={ (e) => this.handleChange(e) }/>
					</div>

					<div className="form-group">
						<h2>Catégories</h2>
						<select name="role" id="role" onChange={ (e) => this.handleChange(e) }>
						{
                            this.state.rolesDisplay.map((item, index) => {
                                return (
                                	<option value={item.name} id="role" name={item.name}> {item.name} </option>
                                );
                            })
                        }
                        </select>
					</div>	

					<div className="form-group">
						<h2>mdp</h2>
						<input type="text" className="form-control" required id="mdp" onChange={ (e) => this.handleChange(e) }/>
					</div>			

					<button type="submit" className="btn btn-primary">Ajouter l'utilisateur </button>
				</form>

				{
					this.state.success ? <p>{this.state.msgSuccess}</p> : null
				}
			</div>	
		)
	}

}

export default AddUser;