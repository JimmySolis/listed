import React from "react";

import { useQuery } from "@apollo/client";
import { useParams } from 'react-router-dom';

import { QUERY_USER } from '../utils/queries'; 

const AUsersPage = () => {

    const { username } = useParams();

    const { loading, data} = useQuery(QUERY_USER, {
        variables: { username: username }
      });
    
      const user = data?.user || {};


      
    if (loading) {
        return <div>Loading...</div>;
    } else if ( !data?.user ){
        return <div>
               <h3>No User Found with that name...</h3>
               <h3>Please Search Again...</h3>
               <h3>Check capitalize is correctly...</h3>
               </div>
    }

    return(
        <div>
            <h2>
            Viewing {user.username} Lists:
            </h2>
            {(!user.lists.length == 0) ? (
                 <div>
                {user.lists.map((list) => (
                    <div className="card mb-3" key={list._id}>
                        <h3  >{list.listName}</h3>
                        {list.gifts.map((gift) => (
                            <div key={gift._id}>
                            <li><a href={gift.giftUrl}>{gift.giftName}</a></li>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            ):(
                <div>
                    <h3>No Lists Yet...</h3>
                </div>
            )}
        </div>
    )
}

export default AUsersPage;