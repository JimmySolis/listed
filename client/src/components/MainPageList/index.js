import React from "react";

const MainPageList = ({ users }) => {
    if(!users.length){
        return <h3> No Users Yet</h3>;
    }

    return(
        <div>
            {users &&
            users.map((user) => (
              <ul key={user._id}>
                <li>
                    <div className="card mb-3">
                      <div className="card-body bg-light p-2">
                        <p>{user.username}</p>
                      </div>
                    </div>
                </li>
              </ul>  
            ))}
        </div>
    )
}

export default MainPageList;