import React from 'react';
import { useQuery } from '@apollo/client';

import AllUsersList from '../components/AllUsersList';
import MainListOnHomePage from '../components/MainListOnHomePage';

import { QUERY_ALLUSER } from '../utils/queries';

const Home = () => {
    const { loading, data } = useQuery(QUERY_ALLUSER);
    const users = data?.users || [];

    return (
        <main>
            <div>
            {loading ? (
            <div>Loading...</div>
          ) : (
            <div>
            <MainListOnHomePage/>
            <br/>
            <AllUsersList
            users={users}
            />
            </div>
          )}
            </div>
        </main>
    )

}

export default Home;