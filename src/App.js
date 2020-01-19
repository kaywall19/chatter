import React, {useState} from 'react'
import './App.css'
import NamePicker from './NamePicker.js'

function App() {

  const [messages, setMessages] = useState([])
  const [username, setName] = useState("")

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
        <img src="https://img.icons8.com/android/24/000000/phone.png" id="call"/>
        <img src="https://img.icons8.com/android/24/000000/search.png" id="search"/>
      </div>
    </header> 

    <div className="messages">
      {messages.map((message,i)=> {
          return <div className= "with-name">
            <p id="message-from">{username}</p>
            <div key={i} className="message-wrap">
              <div className="arrow"></div>
              <div className="message">{message}</div>
            </div>
          </div>
        })}
    </div>

    <TextInput onSend={text=> {
      setMessages([text, ...messages])
    }}/> 

  </main>
}

function TextInput(props) {
  
  const [text, setText] = useState("")

  return <div className="bottom-header">
    <div className= "text-input">
      <div className= "message-icons">
        <img src= "https://img.icons8.com/material-outlined/24/000000/camera--v1.png"/>
        <img src= "https://img.icons8.com/ios-glyphs/30/000000/shocker-emoji.png"/>
      </div>
      <input value={text}
        className = "input"
        placeholder="Type your message here"
        onChange={e=> setText(e.target.value)}
        onKeyPress={(e) => {
          //e.preventDefault()
          if (e.key === "Enter" && (text)) {
            props.onSend(text)
            setText('')
        }}}/>

      <button onClick={()=> {
      if(text) {
        props.onSend(text)
        setText('')
      }}}
      className="button"
      disabled={!text}>
      <b>&#8595;</b>
    </button>
    </div>
  </div>
}

export default App;
