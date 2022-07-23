import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRealtimeMessages, getRealtimeUsers, sendMsg } from '../actions';
import Layout from './Layout'

const User = (props) => {

  const { user, onClick } = props;

  return (
    <div onClick={() => onClick(user)} className="displayName">
      <div className="displayPic">
        <img src="https://eatopiaworld.com/wp-content/uploads/2022/04/demo-user-1.jpg" alt="" />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flex: 1, margin: '0 10px' }}>
        <span style={{ fontWeight: 500 }}>{user.firstname} {user.lastname}</span>
        <span>{user.isOnline ? "Online" : "Offline"}</span>
      </div>
    </div>
  )
}


const Home = () => {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const user = useSelector(state => state.user)
  let unsubscribe;
  const [userid, setUserid] = useState(null);
  const [chat, setChat] = useState(false);
  const [chatUser, setChatUser] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    unsubscribe = dispatch(getRealtimeUsers(auth.uid))
      .then((unsubscribe) => {
        return unsubscribe;
      }).catch(error => {
        console.log(error);
      })
  }, [])

  useEffect(() => {
    return () => {
      unsubscribe.then(fun => fun()).catch(error => console.log(error))
    }
  }, [])


  const startChat = (user) => {
    setChat(true);
    setChatUser(`${user.firstname} ${user.lastname}`);
    setUserid(user.uid)


    dispatch(getRealtimeMessages({ uid_1: auth.uid, uid_2: user.uid }))
  }

  const sendMessage = (e) => {
    const message = {
      user_uid_1: auth.uid,
      user_uid_2: userid,
      msg //msg:msg
    }

    if (msg !== "") {
      dispatch(sendMsg(message))
        .then(() => {
          setMsg('');
        })
    }
  }
  return (
    <Layout>
      <section className="contain">
        <div className="listOfUsers">
          {
            user.users.length > 0 ?
              user.users.filter(user => user.uid !== auth.uid).map(user => {
                return (
                  <User

                    onClick={startChat}
                    user={user}
                    key={user.uid} />
                )
              }) : null
          }


        </div>
        <div className="chatArea">

          <div className="chatHeader"> {chat ? chatUser : ""} </div>

          <div className="messageSections">
            {chat ? user.messages?.map(message => <div key={message.createdAt} style={{ textAlign: message.user_uid_1 == auth.uid ? 'right' : 'left' }}>
              <p className="messageStyle" >{message.msg}</p>
            </div>) : null
            }


          </div>

          {chat ? <div className="chatControls">
            <textarea placeholder='Type your message here...' value={msg} onChange={(e) => setMsg(e.target.value)} />
            <button className='button-new' onClick={sendMessage}>Send</button>
          </div>
            : null
          }

        </div>
      </section>


    </Layout>

  )
}

export default Home