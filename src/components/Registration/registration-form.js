import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {registerUser} from '../../actions/users';
import {login} from '../../actions/auth';
import Input from '../Login/Input';
import {required, nonEmpty, matches, length, isTrimmed} from '../../validators';
import './registration_form.css';
const passwordLength = length({min: 10, max: 72});
const matchesPassword = matches('password');

export class RegistrationForm extends React.Component {


    onSubmit(values) {
     
            return this.props.dispatch(registerUser({email: values.email, displayName: values.displayName, password: values.password}))
            .then(() => this.props.dispatch(login(values.email, values.password)))
    }

    render() {
        return (
            <form
                className="login-form"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                <Field className="input" component={Input} type="text" name="email" label="Email" />
               
                <Field
                    className="input"
                    label="Display Name"
                    component={Input}
                    type="text"
                    name="displayName"
                    validate={[required, nonEmpty, isTrimmed]}
                />
                <Field
                    component={Input}
                    type="password"
                    name="password"
                    label="Password"
                    validate={[required, passwordLength, isTrimmed]}
                />
                <Field
                    component={Input}
                    type="password"
                    label="Confirm Password"
                    name="passwordConfirm"
                    validate={[required, nonEmpty, matchesPassword]}
                />
             
                <button
                    type="submit"
                    >
                    Register
                </button>
            </form>
        );
    }
}


export default reduxForm({
    form: 'registration',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);

// export default RegistrationForm;
