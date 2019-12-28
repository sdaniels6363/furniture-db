import '../../styles/Form.css';
import React from 'react';
import { render } from 'react-dom';
import { withFormik } from 'formik';
import * as Yup from 'yup';


// class loginForm extends React.Component {
//     render() {
//         return (

const formikEnhancer = withFormik({
            validationSchema: Yup.object().shape({
                loginName: Yup.string()
                    .min(2, "C'mon, your Login is longer than that")
                    .required('Login name is required.'),
                password: Yup.string()
                    .password('Invalid password')
                    .required('Password is required!'),
            }),

            mapPropsToValues: ({ user }) => ({
                ...user,
            }),
            handleSubmit: (payload, { setSubmitting }) => {
                alert(payload.password);
                setSubmitting(false);
            },
            displayName: 'Login',
        });

const InputFeedback = ({ error }) =>
                error ? <div className="input-feedback">{error}</div> : null;

const Label = ({ error, className, children, ...props }) => {
                return (
                    <label className="label" {...props}>
                        {children}
                    </label>
                );
            };

const TextInput = ({ type, id, label, error, value, onChange, className, ...props }) => {
                const classes = classnames(
                    'input-group',
                    {
                        'animated shake error': !!error,
                    },
                    className
                );
                return (
                    <div className={classes}>
                        <Label htmlFor={id} error={error}>
                            {label}
                        </Label>
                        <input
                            id={id}
                            className="text-input"
                            type={type}
                            value={value}
                            onChange={onChange}
                            {...props}
                        />
                        <InputFeedback error={error} />
                    </div>
                );
            };
const MyForm = props => {
                const {
                    values,
                    touched,
                    errors,
                    dirty,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    handleReset,
                    isSubmitting,
                } = props;
                return (
                    <form onSubmit={handleSubmit}>
                        <TextInput
                            id="loginName"
                            type="text"
                            label="Login"
                            placeholder="John"
                            error={touched.loginName && errors.loginName}
                            value={values.loginName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <TextInput
                            id="password"
                            type="password"
                            label="Passowrd"
                            placeholder="Enter your password"
                            error={touched.password && errors.password}
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <button
                            type="button"
                            className="outline"
                            onClick={handleReset}
                            disabled={!dirty || isSubmitting}
                        >
                            Reset
      </button>
                        <button type="submit" disabled={isSubmitting}>
                            Submit
      </button>
                        <DisplayFormikState {...props} />
                    </form>
                );
            };

const MyEnhancedForm = formikEnhancer(MyForm);

// Helper for the demo
// import { MoreResources, DisplayFormikState } from './formik-demo';

const App = () => (
                <div className="app">
                    <h1>
                        Building input primitives with{' '}
                        <a href="https://github.com/jaredpalmer/formik">Formik</a>
                    </h1>
                    <p>
                        Formik's enables you to quickly build and style your own reusable form-related
                        components extremely quickly.
    </p>
                    <p>
                        This example does just that. It demonstrates a custom text input, label, and form
                        feedback components as well as a cool shake animation that's triggered if a field is
                        invalid.
    </p>

                    <MyEnhancedForm user={{ email: '', firstName: '', lastName: '' }} />

                </div>
            );
//         )
// }
// }

export default Login



