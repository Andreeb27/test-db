import { useState } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'

function Login() {

    const [user, setUser] = useState({})
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    })

    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(auth, registerEmail, registerPassword);
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className="Login">

            <h1>Login Screen</h1>

            <input
                placeholder='Userame...'
                onChange={(event) => setRegisterEmail(event.target.value)} // we are changing the states with what we right in the text boxes
            />

            <input
                placeholder='Password...'
                onChange={(event) => setRegisterPassword(event.target.value)} // we are changing the states with what we right in the text boxes
            />

            <button onClick = { login } > Login </button>

            <p>Current User Logged In : {user?.email} </p>

        </div>
    );
}

export default Login;
