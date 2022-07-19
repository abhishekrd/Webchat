import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, updateDoc, where } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { authConstant } from "./constants";

export const signup = (user) => {

    return async (dispatch) => {
        const db = getFirestore();

        dispatch({ type: `${authConstant.USER_LOGIN}_REQUEST` })

        const auth = getAuth()
        createUserWithEmailAndPassword(auth, user.email, user.password)
            .then((data) => {
                console.log(data);
                const currentUser = auth.currentUser;
                const name = `${user.firstname} ${user.lastname}`;
                updateProfile(currentUser, {
                    displayName: name
                }).then(() => {
                    //
                    setDoc(doc(db, "users", data.user.uid), {
                        firstname: user.firstname,
                        lastname: user.lastname,
                        uid: data.user.uid,
                        createdAt: new Date(),
                        isOnline:true
                    })
                        .then(() => {
                            //
                            const loggedInUser = {
                                firstname: user.firstname,
                                lastname: user.lastname,
                                uid: data.user.uid,
                                email: user.email
                            }
                            localStorage.setItem("user", JSON.stringify(loggedInUser))

                            console.log("User logged in Successfully....");
                            dispatch({ type: `${authConstant.USER_LOGIN}_SUCCESS`, payload: { user: loggedInUser } })
                        })
                        .catch((error) => {
                            console.log(error);
                            dispatch({
                                type: `${authConstant.USER_LOGIN}_FAILURE`,
                                payload: { error }
                            })
                        })
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }
}


export const signin = (user) => {

    return async (dispatch) => {
        dispatch({ type: `${authConstant.USER_LOGIN}_REQUEST` });
        const auth = getAuth();
        signInWithEmailAndPassword(auth, user.email, user.password)
            .then((data) => {
                console.log(data);
                
                const db = getFirestore();
                updateDoc(doc(db,"users",data.user.uid),{
                    isOnline: true
                }).then(() => {
                    const name = data.user.displayName.split(" ");
                    const firstname = name[0];
                    const lastname = name[1];
    
                    const loggedInUser = {
                        firstname,
                        lastname,
                        uid: data.user.uid,
                        email: data.user.email
                    }
    
                    localStorage.setItem('user', JSON.stringify(loggedInUser));
    
                    dispatch({
                        type: `${authConstant.USER_LOGIN}_SUCCESS`,
                        payload: { user: loggedInUser }
                    })
                }).catch(error => {
                    console.log(error);
                })
           

            }).catch(error => {
                console.log(error);
                dispatch({
                    type: `${authConstant.USER_LOGIN}_FAILURE`,
                    payload: { error }
                })
            })
    }
}

export const isLoggedInUser = () => {
    return async dispatch => {
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

        if (user) {
            dispatch({
                type: `${authConstant.USER_LOGIN}_SUCCESS`,
                payload: { user }
            });
        }
        else {
            dispatch({
                type: `${authConstant.USER_LOGIN}_FAILURE`,
                payload: { error: 'Login again please' }
            });
        }
    }
}


export const logout = (uid) => {
    return async dispatch => {
        dispatch({ type: `${authConstant.USER_LOGOUT}_REQUEST` })
        const db = getFirestore();
          updateDoc(doc(db,"users",uid),{
            isOnline:false
         }).then(() => {
            const auth = getAuth();
            signOut(auth).then(() => {
                localStorage.clear();
                dispatch({ type: `${authConstant.USER_LOGOUT}_SUCCESS` })
                window.location.reload()
            }).catch(error => {
                console.log(error);
                dispatch({
                    type: `${authConstant.USER_LOGOUT}_FAILURE`,
                    payload: { error }
                })
            })
         }).catch(error => {
            console.log(error);
         })
        
    }
}