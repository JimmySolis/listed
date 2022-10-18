import React from "react";
import { useMutation } from "@apollo/client";

import { MUTATION_DELETEGIFT } from "../../utils/mutations";

const RemoveGift = ({ listId, giftId }) => {
    const [removeGift, {error}] = useMutation(MUTATION_DELETEGIFT);

    const handleChange = async (event) => {
         
        try {
            const { data } = await removeGift({
                variables: { 
                    giftId,
                    listId
                 }
            });

        } catch (err){
            console.log(err);
        }

        window.location.assign('/me')
    };

    return(
        <a 
        onClick={handleChange}
        >🗑</a>
    )
}

export default RemoveGift;