import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { doRegister } from '../actions';

class Register extends Component {

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
		this.props.doRegister(values);

	}

	render() {

		const { handleSubmit } = this.props;

		return (
			<div className="jumbotron register-box">
			 	<h1 className="display-3">Register</h1>
			 	<p className="lead">If you already have an account, please login here.</p>

				<form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
			      <Field type="text" name="email" placeholder="name@example.com" label="Email address" component={ this.renderField } />
			      <Field type="password" name="password" label="Password" component={ this.renderField } />
			      <Field type="password" name="passwordv" label="Verify Password" component={ this.renderField } />

			      <button type="submit" className="btn btn-primary">Create account</button>
				</form>
			</div>
		);

	}

}

function validate( values ) {
	const errors = {};

	if ( !values.email ) {
		errors.email = 'Please enter a valid email address';
	}

	return errors;

}

export default reduxForm({
	validate, 
	form: 'RegisterForm'
})(
	connect(null, { doRegister })(Register)
);