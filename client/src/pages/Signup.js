import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import {  MUTATION_SIGNUPUSER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
    const [formState, setFromState] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [addUser, { error, data }] = useMutation(MUTATION_SIGNUPUSER);

    const handleChange = ( event) => {
        const { name, value } = event.target;

        setFromState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);

        try {
            const { data } = await addUser({
                variables: { ...formState },
            }); 

            Auth.login(data.addUser.token);
        } catch (e) {
            console.error(e);
        }
    };

    return(
        <main>
            <div>
                <div>
                    <h4>Sign Up</h4>
                     <div>
                        {data ? (
                            <p> 
                                Success! You may now head{' '}
                                <Link to="/">back to the homepage.</Link>
                            </p>
                        ) : (
                            <form onSubmit={handleFormSubmit}>
                                <input
                                className="form-input"
                                placeholder="Your username"
                                name="username"
                                type="text"
                                value={formState.name}
                                onChange={handleChange}
                                />
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
                                style={{ cursor: 'pointer'}}
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

export default Signup;