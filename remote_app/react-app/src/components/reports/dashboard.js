import React, { Component } from 'react';
import { connect } from 'react-redux';

class Dashboard extends Component {


	render() {

		return (
			<div className="reports">
				<div className="header">
					<nav className="navbar navbar-light bg-faded rounded navbar-toggleable-md">
			        
				       <div className="col-md-8">
				        	<div className="navbar-brand">Hello Catalin!</div>
				       </div>
				       <div className="col-md-4">
					        <ul className="nav justify-content-end">
							 	<li className="nav-item dropdown">
						      		<a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Your Account</a>
						      		<div className="dropdown-menu">
						        		<a className="dropdown-item" id="dropdown1-tab" href="#dropdown1" role="tab" data-toggle="tab" aria-controls="dropdown1">Change password</a>
						        		<a className="dropdown-item" id="dropdown2-tab" href="#dropdown2" role="tab" data-toggle="tab" aria-controls="dropdown2">Membership</a>
						        		<a className="dropdown-item" id="dropdown3-tab" href="#dropdown3" role="tab" data-toggle="tab" aria-controls="dropdown3">Settings</a>
						        		<a className="dropdown-item" id="dropdown4-tab" href="#dropdown4" role="tab" data-toggle="tab" aria-controls="dropdown4">Help & Support</a>
						      		</div>
						    	</li>
							</ul>
						</div>

			      	</nav>
				</div>

				<div className="main">
				 	<div className="row">
				 		<div className="col-md-3">
					 		<div className="list-group">
							  <a href="#" className="list-group-item active">Dashboard</a>
							  <a href="#" className="list-group-item list-group-item-action">Funnels</a>
							  <a href="#" className="list-group-item list-group-item-action">Flows</a>
							  <a href="#" className="list-group-item list-group-item-action">Segmentation</a>
							  <a href="#" className="list-group-item list-group-item-action">Clustering</a>
							</div>
						</div>
						<div className="col-md-9">

							<h1>Section title</h1>

						</div>
				 	</div>
				</div>
			</div>
		);

	}

}


//export default connect( null, Reports)( Reports );
export default Dashboard;