import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { MUTATION_LOGINUSER } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = (props) => {
    const [formState, setFromState] = useState({ email: '', password: '' });
    const [login, { error, data }] = useMutation(MUTATION_LOGINUSER);
     
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFromState({ 
            ...formState,
            [name]: value,
        });
    };

    const handleFromSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
        try{
            const { data } = await login({
                variables: { ...formState },
            });

            Auth.login(data.login.token);
        } catch (e) {
            console.error(e);
        }

        setFromState({
            email: '',
            password: ''
        })
    };

    return (
        <main>
          <div>
            <div>
                <h4>Login </h4>
                    <div>
                        {data ? (
                            <p>
                                You are logged in! {' '}
                                <Link to="/"> Head back to the home page!</Link>
                            </p>
                        ): (
                            <form onSubmit={handleFromSubmit}>
                                <input
                                className="form-input"
                                placeholder="Your email"
                                name="email"
                                type="email"
                                value={formState.email}
                                onChange={handleChange}
                                />
                                <input
                                className="form-input"
                                placeholder="******"
                                name="password"
                                type="password"
                                value={formState.password}
                                onChange={handleChange}
                                />
                                <button
                                className="btn btn-block btn-primary"
                                style={{ cursor: 'poniter' }}
                                type="submit"
                                >
                                    Submit
                                </button>
                            </form>
                        )}

                        {error && (
                            <div className="my-3 p-3 bg-danger text-white">
                                {error.message}
                            </div>
                        )}
                    </div>
            </div>
          </div>
        </main>
    );
};

export default Login;