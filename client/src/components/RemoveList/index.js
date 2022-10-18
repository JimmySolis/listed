import React from "react";
import { useMutation } from '@apollo/client';

import {  MUTATION_DELETELIST } from '../../utils/mutations';


const RemoveList = ({ listId }) => {
  const [removeList, {error}] = useMutation(MUTATION_DELETELIST);

  const handleChange = async (event) => {

    try{
        const { data } = await removeList({
            variables: {listId}
        });

    } catch (err){
        console.error(err);
    }

    window.location.assign('/me')
  };

  return(
    <a
    onClick={handleChange}
    >🗑</a>
  )

}

export default RemoveList;