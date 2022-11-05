import { useState } from "react";
import { auth } from './firebase'

function UserConfig() {

    return (
        <div className="UserConfig">

            <h1>User Configuration Page</h1>

            <div>
                <h2>View A User</h2> 
            </div>

            <div>
                <h2>Edit A User</h2>
                <button>Edit</button>
            </div>


        </div>
    );
}

export default UserConfig;