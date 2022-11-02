import { useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { auth, metadata } from './firebase'
import { async } from "@firebase/util";
import { db } from './firebase'
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore'

function Register() {

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [user, setUser] = useState({});

    const usersCollectionRef = collection(db, "users")
    const adminsCollectionRef = collection(db, "admins")

    onAuthStateChanged(auth, (currentUser) => {

        setUser(currentUser);
    })

    const logout = async () => {

        await signOut(auth);
    }

    const registerUser = async (firstName, lastName, email, password) => {

        try {
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);

            const currentDate = new Date();
            const userName = firstName.charAt(0).toLowerCase() + lastName.toLowerCase() + currentDate.getFullYear().toString().substring(2);

            await addDoc(usersCollectionRef, { firstName: firstName, lastName: lastName, username: userName, email: email, password: password })

        } catch (error) {
            console.log(error.message)
        }

    }


    return (
        <div className="Register">

            <h1>Register Screen</h1>

            <input placeholder="First Name" onChange={(event) => { setFirstName(event.target.value) }}></input>
            <input placeholder="Last Name" onChange={(event) => { setLastName(event.target.value) }}></input>
            <input placeholder="Email" onChange={(event) => { setRegisterEmail(event.target.value) }}></input>
            <input placeholder="Password" onChange={(event) => { setRegisterPassword(event.target.value) }}></input>

            <button onClick = {() => registerUser(firstName, lastName, registerEmail, registerPassword) } > Create User </button>

            <p>Current User Logged In : {user?.email} </p>
            <button onClick = {logout} >Log Out</button>

        </div>
    );

}

export default Register;