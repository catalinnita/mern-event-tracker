import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { doLogin } from '../actions';

class Login extends Component {

	renderField ( field ) {

		return (
			<div className="form-group">
				<label>{field.label}</label>
				<input className="form-control" type={field.type} name={field.name} placeholder={field.placeholder} { ...field.input } />
				{field.meta.touched ? field.meta.error : ''}
			</div>
		);

	}

	onSubmit( values ) {
		this.props.doLogin(values);

	}

	render() {

		const { handleSubmit } = this.props;

		return (
			<div className="jumbotron login-box">
			 	<h1 className="display-3">Login</h1>
			 	<p className="lead">If you don't have an account yet, please register here.</p>

				<form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
			      <Field type="text" name="email" placeholder="name@example.com" label="Email address" component={ this.renderField } />
			      <Field type="password" name="password" label="Password" component={ this.renderField } />

			      <button type="submit" className="btn btn-primary">Login</button>
				</form>
			</div>
		);

	}

}

function validate( values ) {
	const errors = {};

	if ( !values.email ) {
		errors.email = 'Please enter a title';
	}

	return errors;

}

export default reduxForm({
	validate, 
	form: 'LoginForm'
})(
	connect(null, { doLogin })(Login)
);