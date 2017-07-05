import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { signinUser } from "../../actions";

class Signin extends Component {
    handleFormSubmit({ email, password }) {
        // Need to log user in
        this.props.signinUser({ email, password });
    }

    renderInput(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${ touched && error ? "has-danger" : "" }`;

        return (
            <fieldset className={className}>
                <label>{ field.label }</label>
                <input type={ field.type || "text" } placeholder={ field.placeholder } { ...field.input } className="form-control" required={ field.required } />
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
                    required="true"
                    component={ this.renderInput }
                />
                { this.renderAlert() }
                <button action="submit" className="btn btn-primary">Sign In</button>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.email) {
        errors.email = "Email is required";
    }
    if (!values.password) {
        errors.password = "Password is required";
    }

    return errors;
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

export default reduxForm({
    form: "signin",
    validate
})(
    connect(mapStateToProps, { signinUser })(Signin)
);
