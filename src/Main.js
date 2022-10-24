import { useState, useEffect } from 'react';
import './App.css';
import { db } from './firebase'
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore'
import { async } from '@firebase/util';
import { render } from '@testing-library/react';

function Main() {

    const [users, setUsers] = useState([]);
    const [newName, setNewName] = useState("")
    const [newAge, setNewAge] = useState(0)

    const usersCollectionRef = collection(db, "users") // specify which collection, in this case "users", to get from the DB collection 

    const createUser = async () => {
        // takes in two parameters (1. a reference to the collection we are talking about, 2. an object of the data we want to add)
        await addDoc(usersCollectionRef, { firstName: newName, age: Number(newAge) })
    }

    const updateUser = async (id, age) => {

        const userDoc = doc(db, "users", id)
        const newFields = { age: age + 1 }
        await updateDoc(userDoc, newFields);

    }

    const deleteUser = async (id) => {
        const userDoc = doc(db, "users", id) //references to that document
        await deleteDoc(userDoc);
    }

    useEffect(() => {

        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef); // handle promise, will return all documents from a specific collection
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }

        getUsers()

    }, [])

    return (
        <div className="Main">

            <input
                placeholder='Name...'
                onChange={(event) => setNewName(event.target.value)} // we are changing the states with what we write in the text boxes
            />

            <input
                type='number' placeholder='Age...'
                onChange={(event) => setNewAge(event.target.value)}
            />

            <button onClick={createUser}> Create User </button>

            {users.map((user) => {
                return (
                    <div>
                        {" "}
                        <h1>Name: {user.firstName}  </h1>
                        <h1>Age: {user.age} </h1>
                        <button onClick={() => updateUser(user.id, user.age)}>Increase Age</button>
                        <button onClick={() => deleteUser(user.id)}> Delete User </button>
                    </div>
                );
            })}


        </div>
    );
}

export default Main;