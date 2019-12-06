import React, {Component} from 'react';
import UserService from '../services/users.services';

class SignIn extends Component {

	constructor(props){
		super(props);
		this.state = {
		  	name: localStorage.getItem('name'),
		  	mdp: localStorage.getItem('mdp')
		};
 
	//change state value
	handleChange(e){
		this.setState({
			[e.target.id]: e.target.value
		});
	}

	async submit(e){
		e.preventDefault();

  		const { name , mdp } = this.state;
  		localStorage.setItem('name', name);
  		localStorage.setItem('role', role);
	};
 
  	render(){
	  	return (
	    	<form onSubmit = { (e) => this.submit(e) }>
	      		<label>
	        		User: <input id="name" type="text" onChange={ (e) => this.handleChange(e) }/>
	      		</label>
	      		<label>
	        		 Mdp: <input id="mdp" type="text" onChange={ (e) => this.handleChange(e) } />
	      		</label>
	      		<button type="submit">Sign In</button>
	    	</form>
	  	);
	}
}