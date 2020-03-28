import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { authenticationService } from '@/_services';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // redirect to home if already logged in
        if (authenticationService.currentUserValue) {
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div style={{ marginTop: '50px', borderRadius: '5px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                            <div className="alert alert-info">
                                <strong>Normal User</strong> - U: user P: user<br />
                                <strong>Administrator</strong> - U: admin P: admin
                            </div>
                            <div style={{ padding: '40px' }}>
                                <h2>Login</h2>
                                <Formik
                                    initialValues={{
                                        username: '',
                                        password: ''
                                    }}
                                    validationSchema={Yup.object().shape({
                                        username: Yup.string().required('Username is required'),
                                        password: Yup.string().required('Password is required')
                                    })}
                                    onSubmit={({ username, password }, { setStatus, setSubmitting }) => {
                                        setStatus();
                                        authenticationService.login(username, password)
                                            .then(
                                                user => {
                                                    const { from } = this.props.location.state || { from: { pathname: "/" } };
                                                    this.props.history.push(from);
                                                },
                                                error => {
                                                    setSubmitting(false);
                                                    setStatus(error);
                                                }
                                            );
                                    }}
                                    render={({ errors, status, touched, isSubmitting }) => (
                                        <Form>
                                            <div className="form-group">
                                                <label htmlFor="username">Username</label>
                                                <Field name="username" type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                                                <ErrorMessage name="username" component="div" className="invalid-feedback" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="password">Password</label>
                                                <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                            </div>
                                            <div className="form-group">
                                                <button type="submit" className="btn btn-dark" disabled={isSubmitting}>Login</button>
                                                {isSubmitting &&
                                                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                                }
                                            </div>
                                            {status &&
                                                <div className={'alert alert-danger'}>{status}</div>
                                            }
                                        </Form>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export { LoginPage }; 