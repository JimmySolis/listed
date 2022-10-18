import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import {  MUTATION_ADDLIST } from '../../utils/mutations';


import Auth from '../../utils/auth';

const MakeAList = () => {
    const [listName, setListName] = useState('');

    const [characterCount, setCharacterCount] = useState(0);

    const [addList, {error}] = useMutation(MUTATION_ADDLIST);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try{
            const { data } = await addList({
                variables: {
                    listName,
                    listMaker: Auth.getProfile().data.username
                }
            });

          setListName('');
          window.location.assign('/me');
        } catch (err){
          console.error(err);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        if(name === 'listName' && value.length <= 20) {
            setListName(value);
            setCharacterCount(value.length);
        }
    };

    return (
        <div>
            <h3> Name Your List!</h3>

            {Auth.loggedIn() ? (
                <>
                <p className={`m-0 ${
                    characterCount === 20 || error ? 'text-danger' : ''
                }`}
                >
                  Character Count: {characterCount}/20
                </p>
                <form
                className='flex-row justify-center justify-space-between-md align-center'
                onSubmit={handleFormSubmit}
                >
                <div className='col-12 col-lg-9'>
                    <input
                    name='listName'
                    placeholder='Name Your List...'
                    value={listName}
                    className='form-input w-50'
                    style={{lineHeight: '1.5', resize: 'vertical'}}
                    onChange={handleChange}
                    ></input>
                </div>

                <div className='col-12 col-lg-3'>
                    <button className='btn btn-primary btn-block py-3' type='submit'>
                        Submit List Name
                    </button>
                </div>
                {error && (
                    <div className='col-12 my-3 bg-danger text-white p-3'>
                        {error.message}
                    </div>
                )}
                </form>
                </>

            ): (
                <p>
                    You need to be logged in to share your thoughts. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
                </p>
            )}
        </div>
    );
};

export default MakeAList;