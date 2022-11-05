import { useState } from "react";
import { db, storage } from './firebase'
import * as firebase from 'firebase/app'
import { collection, getDocs, getDoc, updateDoc, query, where, arrayUnion, documentId, doc, arrayRemove } from 'firebase/firestore'
import "firebase/firestore"
import { ref, uploadBytes } from 'firebase/storage'

function Admin() {

    const [password, setPassword] = useState("")
    const [docID, setDocID] = useState("")
    const [myArr, setMyArr] = useState([])
    const [imageUpload, setImageUpload] = useState(null)

    const usersColRef = collection(db, "users")
    const expiredPassColRef = collection(db, "expiredPasswords")

    const getExpiredUsername = async (username, docToBeEditted) => {
        await updateDoc(docToBeEditted, {
            users: arrayUnion(username)
        })
    }

    /*
        This arrow function takes in an entered password from a user, and checks to see if that user previously used that password
    */
    const updatePassword = async (newPassword) => {

        getDocs(usersColRef)
            .then(snapshot => {
                snapshot.forEach(user => {
                    //billybobID = user.id
                    if (user.data().firstName === 'Sav')
                    {
                        setDocID(user.id) // setting this variable to the document's ID - 'XsZ0SW2vOIfnosVyvGs3'
                    }

                })
            })

        const q = query(collection(db, "users"), where("passwords", "array-contains", newPassword))

        const querySnapshot = await getDocs(q);

        const docToBeEditted = doc(db, "users", docID)

        const currentDate = new Date();

        // IF 'querySnapshot' is empty, that means the entered password is NOT in the list of previously used passwords and can be used
        if (querySnapshot.empty) {
            try {
                // adding the new typed password into the array of previously used passwords
                await updateDoc(docToBeEditted, {
                    passwords: arrayUnion(newPassword)
                })

                //setting the currentPassword to the newly entered password
                await updateDoc(docToBeEditted, { currentPassword: newPassword })

                //sets the creation date of this new password, stores in DB
                await updateDoc(docToBeEditted, { passCreationDate: currentDate })

            } catch (error) {
                console.log(error)
            }
        }
        else {
            console.log("That password has previously been used")
        }
    }

    const testFunctionality = async () => {

        const billbobID = ""

        //finding the user with the firstName 'Billy', and recording that document ID
        getDocs(usersColRef)
            .then(snapshot => {
                snapshot.forEach(user => {
                    //billybobID = user.id
                    if (user.data().firstName === 'Billy')

                        setDocID(user.id) // setting this variable to the document's ID - 'XsZ0SW2vOIfnosVyvGs3'

                })
            })


        const docToBeEditted = doc(db, "users", docID)

        await updateDoc(docToBeEditted, {
            expiredPasswords: arrayUnion(myArr)
        })
    }

    const displayExpiredPasswords = async () => {
        /*
            1 - Search through list of users to see if their password is expired

            2 - Add those users to the "Expired Passwords Collection" under "Users with Expired Passwords"

            3 - Using the newly made "Users with Expired Passwords" - Print this list to the screen
        */

        const currentDate = new Date()

        getDocs(expiredPassColRef)
            .then(snapshot => {
                snapshot.forEach(user => {
                    //billybobID = user.id
                    if (user.data().collectionName === 'expiredPasswords')
                    {
                        setDocID(user.id) // setting this variable to the document's ID - 'XsZ0SW2vOIfnosVyvGs3'
                    }

                })
            })

        const docToBeEditted = doc(db, "expiredPasswords", docID)

        getDocs(usersColRef)
            .then(snapshot => {
                snapshot.forEach(user => {
                    
                    if(user.data().passCreationDate < currentDate)
                    {
                        //setMyArr( myArr => [...myArr, user.data().username] )

                        getExpiredUsername(user.data().username, docToBeEditted)

                        //console.log(user.data().username)

                        if(user.data().passCreationDate.toDate() < currentDate)
                        {
                            console.log("passCreationDate < currentDate")
                            console.log(user.data().username)
                            console.log(user.data().passCreationDate.toDate())
                            console.log(currentDate)
                        }

                        if(user.data().passCreationDate > currentDate)
                        {
                            console.log("passCreationDate > currentDate")
                        }
                    }
                       
                })
            })

    }

    const viewAllUsers = async () => {
        getDocs(usersColRef)
            .then(snapshot => {
                snapshot.forEach(user => {

                    console.log("User: " + user.data().firstName + " " + user.data().lastName)

                })
            })
    }

    const uploadImage = () => {

        if(imageUpload == null) return;

        const imageRef = ref(storage, `images/${imageUpload.name}`)

        uploadBytes(imageRef, imageUpload).then(() => {
            alert("Image Uploaded")
        } )


    }

    return (
        <div className="Admin">

            <h1>Admin Page</h1>

            <h2> Change Password for Billy Bob </h2>

            <input placeholder="New Password" onChange={(event) => { setPassword(event.target.value) }}></input>

            <button onClick={() => updatePassword(password)}> Update Password </button>

            <button onClick={viewAllUsers}> View All Users </button>

            <button onClick={displayExpiredPasswords} > Expired Password Usernames </button>

            <div>
                <input type = "file" onChange = {(event) => {setImageUpload(event.target.files[0])} } />
                <button onClick = { uploadImage } > uploadImage </button>

            </div>

        </div>
    );
}

export default Admin;