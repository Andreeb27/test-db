import { useState } from "react";
import { db } from './firebase'
import * as firebase from 'firebase/app'
import { collection, getDocs, getDoc, updateDoc, query, where, arrayUnion, documentId } from 'firebase/firestore'
import "firebase/firestore"

function Admin() {

    const [password, setPassword] = useState("")

    const usersColRef = collection(db, "users")

    const updatePassword = async (newPassword) => {

        const q = query(collection(db, "users"), where("passwords", "array-contains", newPassword))

        const userID = ""

        

        const querySnapshot = await getDocs(q);



        if(querySnapshot.empty)
        {
            
            try 
            {


                /*await updateDoc(usersColRef, {
                    passwords : firebase.firestore.FieldValue.arrayUnion(...passwords)
                })*/

            } catch (error) 
            {
                console.log(error)
            }
        }
        else
        {
            console.log("That password has previously been used")
        }

        /*querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
        } )

        console.log(q.databaseId)*/

        /*getDocs(usersColRef)
            .then((snapshot) => {
                let passwords = []
                
                snapshot.docs.forEach((doc) => {

                        passwords.push({ ...doc.data(), id: doc.id })

                })

                console.log(passwords)
            })*/

        //const usersQuery = query(usersColRef, where( "passwords", "array-contains", newPassword ) )

    }

    return (
        <div className="Admin">

            <h1>Admin Page</h1>

            <h2> Change Password for Billy Bob </h2>

            <input placeholder="New Password" onChange={(event) => { setPassword(event.target.value) }}></input>

            <button onClick = {() => updatePassword(password)}> Update Password </button>

        </div>
    );
}

export default Admin;