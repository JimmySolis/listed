import React from "react";

import { Link } from 'react-router-dom';

const AllUsersList = ({ users }) => {
    if(!users.length){
        return <h3> No Users Yet</h3>;
    }

    return(
        <div>
          <h3>Listed Users:</h3>
            {users &&
            users.map((user) => (
              <ul key={user._id}>
                <li>
                    <div className="card mb-3">
                      <div className="card-body bg-success p-2 bg-opacity-25 ">
                        <Link to={`/user/${user.username}`} style={{textDecoration : "none"}}><p>{user.username}</p></Link>
                      </div>
                    </div>
                </li>
              </ul>  
            ))}
        </div>
    )
}

export default AllUsersList;