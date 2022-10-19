import React, { useState } from "react";
import { Link} from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { MUTATION_ADDGIFT } from '../../utils/mutations';
import { QUERY_USER, QUERY_ME } from "../../utils/queries";

import Auth from '../../utils/auth';

const AddGift = ({ listId }) => {
    const [giftState, setGiftState] = useState({
        giftName: '',
        giftUrl: ''
    });

    const [addGift, {error}] = useMutation(MUTATION_ADDGIFT);

    const handleFormSubmit = async(event) => {
        event.preventDefault();

        try{
            const { data } = await addGift({
                variables: {
                    ...giftState,
                    listId: listId,
                    giftMaker: Auth.getProfile().data.username
                }
            })
            
            setGiftState('');
            window.location.assign("/me");
        } catch (e){
            console.error(e);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setGiftState({
            ...giftState,
            [name]: value
        })
    };

    return (
        <div className="card-header bg-primary  bg-opacity-25  p-2">
            <h5> Fill Out Your Gift Information: </h5>

            {Auth.loggedIn() ? (
                <>
                <form
                className="flex-row justify-center justify-space-between-md align-center"
                onSubmit={handleFormSubmit}
                >
                <div className="col-12 col-lg-9">
                    <input
                    name="giftName"
                    placeholder="Gift Name..."
                    value={giftState.giftName}
                    className='form-input w-50'
                    type="text"
                    style={{lineHeight: '1.5', resize: 'vertical'}}
                    onChange={handleChange}
                    />
                    <input
                    name="giftUrl"
                    placeholder="Gift URL..."
                    value={giftState.giftUrl}
                    className='form-input w-50'
                    type="text"
                    style={{lineHeight: '1.5', resize: 'vertical'}}
                    onChange={handleChange}
                    />
                 <button
                    className="btn btn-block btn-primary"
                     style={{ cursor: 'pointer'}}
                     type="submit"
                     >
                     Submit
                    </button>
                </div>
                {error && (
                    <div className="col-12 my-3 bg-danger text-white p-3">
                        {error.message}
                    </div>
                )}
            </form>
                </>
            ) : (
                <p>
                You need to be logged in to share your thoughts. Please{' '}
      <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
            </p>
            )}
        </div>
    );

};

export default AddGift;