import React from 'react'
import Layout from './Layout'

const Home = () => {
  return (
    <Layout>
      <section className="contain">
      <div className="listOfUsers">

<div className="displayName">
    <div className="displayPic">
        <img src="https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg" alt="" />
    </div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center", flex:1, margin: '0 10px'}}>
        <span style={{fontWeight: 500}}>Abhishek Dhanke</span>
        <span>Online</span>
    </div>
</div>
        
</div>
<div className="chatArea">
<div className="chatHeader"> Abhishek Dhanke </div>
<div className="messageSections">

    <div style={{ textAlign: 'left' }}>
        <p className="messageStyle" >Hello User</p>
    </div>

</div>
<div className="chatControls">
    <textarea />
    <button>Send</button>
</div>
</div>
      </section>
   

    </Layout>
   
  )
}

export default Home