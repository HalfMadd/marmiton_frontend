import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Footer extends Component{

	constructor(props){
		super(props);
	}


	render(){
		return(
			<nav class="navbar navbar-expand-lg navbar-light bg-light">
			  	<a class="navbar-brand" href="#">Prototype Marmiton</a>
			  	<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			    	<span class="navbar-toggler-icon"></span>
			  	</button>

			  	<div class="collapse navbar-collapse" id="navbarSupportedContent">
			    	<ul class="navbar-nav mr-auto">
				      	<li class="nav-item">
				        	<Link className="nav-link" to={'/supprimer-recette'}>Supprimer une recette </Link>
				      	</li>
				      	&nbsp;
				      	<li class="nav-item">
				        	<Link className="nav-link" to={'/supprimer-ingredient'}>Supprimer un ingredient </Link>
				      	</li>
				      	&nbsp;
				      	<li class="nav-item">
				        	<Link className="nav-link" to={'/supprimer-categorie'}>Supprimer une categorie </Link>
				      	</li>
			      		&nbsp;
			    	</ul>
			    	
			  	</div>
			</nav>
		)
	}

}

export default Footer;