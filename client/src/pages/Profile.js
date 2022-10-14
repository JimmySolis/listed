import React from "react";
import { useQuery } from "@apollo/client";

import ListFrom from '../components/ListFrom';

import { QUERY_USER } from "../utils/queries";

import { MUTATION_ADDLIST,
         MUTATION_ADDGIFT, 
         MUTATION_DELETEUSER,
         MUTATION_DELETELIST,
         MUTATION_DELETEGIFT
        } from "../utils/mutations";

const Profile = () => {
    const { loading, data } = useQuery(QUERY_USER);
    const user = data?.user || [];

    return(
        <main>
            
        </main>
    )

}

export default Profile;
