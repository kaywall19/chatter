import React, {useState, useEffect, useRef} from 'react'
import './App.css'
import NamePicker from './NamePicker.js'
import { FiSend, FiSave } from 'react-icons/fi'
import { MdPhone } from 'react-icons/md'
import { MdSearch } from 'react-icons/md'
import { MdInsertEmoticon } from 'react-icons/md'
import { MdPhotoCamera } from 'react-icons/md'
import {db} from './db'

function App() {

  const [messages, setMessages] = useState([])
  const [username, setName] = useState("")

  useEffect(()=> {
    db.listen({
      receive: m=> setMessages(current=> [m, ...current])
    })
  }, [])
  
  return <main>
    <header className= "header">
      <div className="brand">
        <img src="https://img.icons8.com/dotty/80/000000/filled-topic.png" id="logo"/>      
        <p id="title">Chatter</p>
      </div>
      <div className="icons">
        <p id="user">{username}</p>
        <NamePicker onSend={name => {
          setName(name)
         }}/>
        <MdPhone id="call"/>
        <MdSearch id="search"/>
      </div>
    </header> 

    <div className="messages">
      {messages.map((message,i)=> {
          return <div className= "with-name">
            <p id="message-from">{message.name}</p>
            <div key={i} className="message-wrap">
              <div className="arrow"></div>
              <div className="message">{message.text}</div>
            </div>
          </div>
        })}
    </div>

    <TextInput onSend={(text)=> {
      db.send({
        text, name:username, ts: new Date(),
      })
    }}/> 

  </main>
}

function TextInput(props) {
  
  const [text, setText] = useState("")
  const inputEl = useRef(null)

  return <div className="bottom-header">
    <div className= "text-input">
      <div className= "message-icons">
        <MdPhotoCamera className="extras"/>
        <MdInsertEmoticon className="extras"/>
      </div>
      <input value={text}
        ref={inputEl}
        className = "input"
        placeholder="Type your message here"
        onChange={e=> setText(e.target.value)}
        onKeyPress={(e) => {
          //e.preventDefault()
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
      className="button"
      disabled={!text}>
      <FiSend id="send"/>
    </button>
    </div>
  </div>
}

export default App;
