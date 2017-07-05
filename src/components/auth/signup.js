import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { signupUser } from "../../actions";

class Signup extends Component {
    renderInput(field) {
        const { meta: {touched, error} } = field;
        const className = `form-group ${ touched && error ? "has-danger" : "" }`
        return (
            <fieldset className={ className }>
                <label>{ field.label }</label>
                <input type={ field.type || "text" } { ...field.input } placeholder={ field.placeholder } className="form-control" required={ field.required } />
                <div className="text-help">
                    { touched ? error : "" }
                </div>
            </fieldset>
        );
    }

    renderAlert() {
        if (this.props.errorMessage)  {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> { this.props.errorMessage }
                </div>
            );
        }
    }

    handleFormSubmit({ email, password }) {
        this.props.signupUser(email, password);
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) }>
                <Field
                    name="email"
                    type="email"
                    placeholder="Email"
                    label="Email"
                    component={ this.renderInput }
                />
                <Field
                    name="password"
                    type="password"
                    placeholder="Password"
                    label="Password"
                    component={ this.renderInput }
                    required="true"
                />
                <Field
                    name="passwordConfirm"
                    type="password"
                    placeholder="Confirm Password"
                    label="Confirm Password"
                    component={ this.renderInput }
                    required="true"
                />
                { this.renderAlert() }
                <button action="submit" className="btn btn-primary">Sign Up</button>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.email) {
        errors.email = "Email is required";
    }
    if (!values.password && !values.passwordConfirm) {
        errors.password = "Password is required";
    } else if (values.password !== values.passwordConfirm) {
        errors.passwordConfirm = "Passwords do not match";
    }

    return errors;
}

function mapStateToProps({ auth }) {
    return { errorMessage: auth.error };
}

export default reduxForm({
    form: "signup",
    validate
})(
    connect(mapStateToProps, { signupUser })(Signup)
);
