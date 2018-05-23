import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './Input';
import {login} from '../../actions/auth';
import {required, nonEmpty} from '../../validators';
import './login-form.css'

export class LoginForm extends React.Component {
    onSubmit(values) {
        return this.props.dispatch(login(values.email, values.password));
  
    }

    render() {
        let error;
        if (this.props.error) {
            error = (
                <div className="form-err" aria-live="polite">
                    {this.props.error}
                </div>
            );
        }
        return (
            <form
                className="login-form"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                {error}
                <h4>Example User</h4>
                <p>Email: bob@bob.com</p>
                <p>Password: thepriceisright</p>
                <Field
                className="email-field"
                    component={Input}
                    type="text"
                    name="email"
                    id="email"
                    label="Email"
                    validate={[required, nonEmpty]}
                />
             
                <Field
                className="pass-field"
                    component={Input}
                    type="password"
                    name="password"
                    id="password"
                    label="Password"
                    validate={[required, nonEmpty]}
                />
            
                <button disabled={this.props.pristine || this.props.submitting}>
                    Log in
                </button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'login',
    onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);
