import React from "react";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import AUsersPage from "./pages/AUsersPage";
import Footer from "./components/Footer";
import Header from './components/Header';

const httpLink = createHttpLink({
    uri: '/graphql',
  });
  

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('id_token');

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
          },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

function App() {
    return (
        <ApolloProvider client={client}>
           <Router>
             <div className="flex-column justify-flex-start min-100-vh">
               <Header />
                <div className="container">
                 <Routes>
                <Route 
                path="/"
                element={<Home />}
                 />
                <Route 
                path="/login"
                element={<Login />}
                 />
                 <Route 
                path="/signup"
                element={<Signup />}
                 />
                <Route 
                path="/me"
                element={<Profile />}
                 />
                  <Route 
                path="/user/:username"
                element={<AUsersPage />}
                 />
                </Routes>
              </div>
            <Footer/>
           </div>
         </Router>
        </ApolloProvider>
    )
}

export default App;