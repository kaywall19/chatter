import React, {useState, useEffect, useRef} from 'react'
import './App.css'
import NamePicker from './NamePicker.js'
import { FiSend, FiSave } from 'react-icons/fi'
import { MdPhone } from 'react-icons/md'
import { MdSearch } from 'react-icons/md'
import { MdInsertEmoticon } from 'react-icons/md'
import { MdPhotoCamera } from 'react-icons/md'
import { db, useDB } from './db'
import { BrowserRouter, Route } from "react-router-dom"
import Camera from 'react-snap-pic'
import * as firebase from "firebase/app"
import "firebase/storage"

function App() {

  useEffect(()=> {
    const {pathname} = window.location
    if (pathname.length<2) window.location.pathname="home"
  }, [])

  return <BrowserRouter>
    <Route path="/:room" component={Room}/>
  </BrowserRouter>
}

function Room(props) {

  const [showCamera, setShowCamera] = useState(false)
  const{room} = props.match.params
  const [name, setName] = useState("")
  const conversation = useDB(room)

  async function takePicture(img) {
    setShowCamera(false)
    const imgID = Math.random().toString(36).substring(7)
    var storageRef = firebase.storage().ref()
    var ref = storageRef.child(imgID + '.jpg')
    await ref.putString(img, 'data_url')
    db.send({ img: imgID, name, ts: new Date(), room })
  }
  
  return <main>
    <header className= "header">
      <div className="brand">
        <img src="https://img.icons8.com/dotty/80/000000/filled-topic.png" id="logo"/>      
        <p id="title">Chatter</p>
      </div>
      <div className="icons">
        <p id="user">{name}</p>
        <NamePicker onSend={name => {
          setName(name)
         }}/>
        <MdPhone id="call"/>
        <MdSearch id="search"/>
      </div>
    </header> 

    <div className="messages">
      {conversation.map((m,i)=> <Message key={i} m={m} name={name} />)}
    </div>

    <TextInput onSend={(text)=> {
      db.send({
        text, name, ts: new Date(), room,
      })
    }}
      showCamera={()=>setShowCamera(true)
    }/>

    {showCamera && <Camera takePicture={takePicture}/>}

  </main>
}

const bucket = 'https://firebasestorage.googleapis.com/v0/b/chatter-2cdab.appspot.com/o/'
const suffix = '.jpg?alt=media'

function Message({m, name}) {
  return <div className= "with-name"
  from={m.name===name?"me":"you"}>
  <p id="message-from">{m.name}</p>
  <div className="message-wrap">
    <div className="arrow"></div>
    <div className="message">
      {m.text}
      {m.img && <img src={bucket+m.img+suffix} alt="pic"/>}
      </div>
  </div>

</div>
}


function TextInput(props) {
  
  const [text, setText] = useState("")
  const inputEl = useRef(null)

  return <div className="bottom-header">
    <div className= "text-input">
      <div className= "message-icons">
        <MdPhotoCamera
          onClick={props.showCamera}
          className="extras">
        </MdPhotoCamera>
        <MdInsertEmoticon className="extras"/>
      </div>
      <input value={text}
        ref={inputEl}
        className = "input"
        placeholder="Type your message here"
        onChange={e=> setText(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter" && (text)) {
            props.onSend(text)
            inputEl.current.focus()
            setText('')
        }}}/>

      <button onClick={()=> {
      if(text) {
        props.onSend(text)
        inputEl.current.focus()
        setText('')
      }}}
      className="send-button"
      disabled={!text}>
      <FiSend id="send"/>
    </button>
    </div>
  </div>
}

export default App;
