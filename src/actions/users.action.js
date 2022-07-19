import { collection, query, where, onSnapshot, addDoc, orderBy } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { userConstant } from "./constants"


export const getRealtimeUsers = (uid) => {
    return async (dispatch) => {
        dispatch({type:`${userConstant.GET_REALTIME_USERS}_REQUEST`});

        const db = getFirestore();
        const q = query(collection(db, "users"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const users = [];
       querySnapshot.forEach((doc) => {
        if(doc.data().uid != uid){
            users.push(doc.data());

        }
  });
      
       dispatch({
            type: `${userConstant.GET_REALTIME_USERS}_SUCCESS`,
            payload: { users }
       })
       
});

       return unsubscribe;
    }
    
}

export const sendMsg = (message) => {
       return async dispatch => {
        
          const db = getFirestore();
          addDoc(collection(db,"conversations"),{
             ...message,
             isView:false,
             createdAt: new Date()
          })
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          })
       }
}

export const getRealtimeMessages = (user) => {
    return async dispatch => {
        const db = getFirestore();
        const q = query(collection(db,"conversations"),where('user_uid_1','in',[user.uid_1, user.uid_2]),orderBy('createdAt','asc'))
        onSnapshot(q,(querySnapshot) => {
                        const messages = [];

                       
                        querySnapshot.forEach((doc) => {
                            if((doc.data().user_uid_1 == user.uid_1 && doc.data().user_uid_2 == user.uid_2) || 
                            (doc.data().user_uid_1 == user.uid_2 && doc.data().user_uid_2 == user.uid_1)
                            ){messages.push(doc.data())}
                            
                            
                        }) 
                        
                        dispatch({
                            type:userConstant.GET_REALTIME_MESSAGES,
                            payload:{messages}
                        })
                        
                        console.log(messages);    
        })
    }
}