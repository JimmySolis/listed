import React from 'react';
import { useQuery } from '@apollo/client';

import MainPageList from '../components/MainPageList';

import { QUERY_ALLUSER } from '../utils/queries';

const Home = () => {
    const { loading, data } = useQuery(QUERY_ALLUSER);
    const users = data?.users || [];

    return (
        <main>
            <div className="flex-row justify-center">
            {loading ? (
            <div>Loading...</div>
          ) : (
            <MainPageList
            users={users}
            />
          )}
            </div>
        </main>
    )

}

export default Home;