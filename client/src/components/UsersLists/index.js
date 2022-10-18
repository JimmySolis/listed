import React from "react";
import { Link } from "react-router-dom";

import AddGift from "../../components/AddGift";
import RemoveList from "../../components/RemoveList";
import RemoveGift from "../../components/RemoveGift";

const UsersLists = ({
    lists,
    title,
    showTitle = true,
    showUsername = true
}) => {

    if(!lists.length){
        return <h3>No Lists Yet</h3>;
    }

    return(
        <div>
            {showTitle && <h3>{title}</h3>}
            {lists &&
                lists.map((list) => (
                    <div className="card mb-3" key={list._id}>
                        <h4 className="card-header bg-primary text-light p-2 m-0">
                        {list.listName} 
                        <RemoveList
                        listId={list._id}
                        />
                        </h4>
                        {list.gifts.map((gift) => (
                            <div key={gift._id}>
                                <a href={gift.giftUrl} target="_blank"><h6>{gift.giftName}</h6></a>
                                <RemoveGift
                                giftId={gift._id}
                                listId={list._id}
                                />
                            </div>
                        ))}
                        <AddGift
                        listId={list._id}
                        />
                    </div>
                ))
            }
        </div>

    )
}

export default UsersLists;