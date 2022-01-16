import React from 'react'
import "../styles/Twitch.css";
import axios from 'axios'

// class App extends React.Component {
//   state = {
//     teamName: '',
//     streamers: [],
//   }
//   componentDidMount() {
//     const fetchData = async () => {
//       const result = await api.get('https://api.twitch.tv/helix/teams?name=astro')
//       this.setState({
//         teamName: result.data.data[0].team_display_name,
//         streamers: result.data.data[0].users
//       })
//     }
//     fetchData()
//   }
//   render() {
//     return (
//       this.componentDidMount()
//     )
//   }
// }

// let api = axios.create({
//   headers: {
//     'Client-ID': 'ppilz80gb3rrxsei70nd1a0pgivrre',
//   }
// })

class Channel extends React.Component {
  render() {
    return (
      <div className='channel'>
        <div className="channel__details">
          <img src={this.avatar} alt="avatar" />
          <p>{this.name}</p>
        </div>
        <p>🔴 {this.followers}</p>
      </div>
    );
  }
}

class Sidebar extends React.Component {

  render () {
    return (
      <div className='sidebar' >
        <div className="sidebar__top">
          <h5>FOLLOWED CHANNELS</h5>
          <Channel avatar='avatar.jpg' name='cleverprogrammer' followers='816k' />
          <h5>RECOMMENDED CHANNELS</h5>
          <Channel avatar='avatar.jpg' name='cleverprogrammer' followers='816k' />
          <p className='sidebar__topShowMore' >Show More</p>
        </div>
      </div>
    );
  }
}

// class Body extends React.Component {
//   render () {
//     return (
//       <div className="body">
//         <div className="body__left">
//           <Stream />
//           <Profile />
//         </div>
//         <div className="body_rightPlaceHolder"></div>
//       </div>
//     )
//   }
// }

class Stream extends React.Component {
  render() {
    return (
      <div className='stream' >
        <div className="stream__container">
          <div className="stream__status">
            <div className="stream__statusContainer">
              <div className="stream__statusContainerTop">
               <div className="stream__statusIndicator">OFFLINE</div>
                 <h2>Check out the below streams from Clever Programmer</h2>
               </div>
             <div className="stream__statusInfo">
               <i className="fas fa-bell"></i>
               <p>You will be notified when cleverprogrammer is live</p>        
             </div>
        </div>
      </div>
      <div className="stream__videoEmbed">
        <iframe
         width="500"
         height="295"
         src="YOUR-YT-EMBED-LINK"
         frameborder="0"
         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
         allowfullscreen></iframe>
      </div>
     </div>
   </div>
  )}
}

class Profile extends React.Component {
  render() {
    return (
      <div className='profile' >
        <div className="profile__top">
          <div className="profile__topLeft">
            <img src="logo.jpg" />
            <div className="profile__topLeftDetails">
              <h1>cleverprogrammer</h1>
              <h3>820k followers</h3>
            </div>
          </div>
          <div className="profile__topRight">
            <i className="fas fa-heart graybg"></i>
            <i className="fas fa-bell graybg"></i>
            <i className="fas fa-ellipsis-v"></i>
          </div>
        </div>
        <div className="profile__menu">
          <h2 className='active' >Home</h2>
          <h2>About</h2>
          <h2>Schedule</h2>
          <h2>Videos</h2>
          <h2><i class="fas fa-arrow-up"></i></h2>
          <h2>Chat</h2>
       </div>
       <div className="profile__recent">
         <h2>Recent broadcasts</h2>
         <div className="profile__recentItems">
         <RecentItem url={'LINK-TO-VIDEO'} title={'YOUR VIDEO TITLE'}/>
         <RecentItem url={'LINK-TO-VIDEO'} title={'YOUR VIDEO TITLE'}/>
         <RecentItem url={'LINK-TO-VIDEO'} title={'YOUR VIDEO TITLE'}/>
         <RecentItem url={'LINK-TO-VIDEO'} title={'YOUR VIDEO TITLE'}/>
       </div>
       <div className="profile__categories">
         <h2>cleverprogrammer's recently streamed Categories</h2>
         <img src="category.jpg" />
         <h3>Science & Technology</h3>
       </div>
     </div>
   </div>
  )}
}

class RecentItem extends React.Component {
  render() {
    return (
      <div className='item' >
        <iframe
         width="400"
         height="235"
         src={this.url}
         frameborder="0"
         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
         allowFullScreen={true} />
      <div className="item__details">
        {/* <img src="https://static-cdn.jtvnw.net/ttv-boxart/Science%20&%20Technology-285x380.jpg" /> */}
        <div className="item__detailsText">
          <h4>{this.title}</h4>
          <p>cleverprogrammer</p>
          <p>Science & Technology</p>
        </div>
      </div>
    </div>
  )}
}

class Twitch extends React.Component {
  render () {
    return(
      <div className="twitch">
        <div className="Sidebar">
          <Sidebar />
        </div>
        {/* <div className="App">
          <App />
        </div> */}
      </div>
    )
  }
}

export default Twitch;