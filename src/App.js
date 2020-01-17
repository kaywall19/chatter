import React, {useState} from 'react'
import './App.css'

function App() {

  const [messages, setMessages] = useState([])

  return <main>
    <header className= "header">
      <div className="brand">
        <img src="https://img.icons8.com/dotty/80/000000/filled-topic.png" id="logo"/>      
        <p>Chatter</p>
      </div>
      <div className="icons">
        <img src="https://img.icons8.com/android/24/000000/phone.png" id="call"/>
        <img src="https://img.icons8.com/android/24/000000/search.png" id="search"/>
        <img src="https://img.icons8.com/ios-glyphs/30/000000/menu-2.png" id="more"/>
      </div>
    </header> 

    <div className="messages">
      {messages.map((message,i)=> {
          return <div key={i} className="message-wrap">
            <div className="message">{message}</div>
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
        placeholder="Type your message here"
        onChange={e=> setText(e.target.value)}
      />
    </div>
    <button onClick={()=> {
      if(text) {
        props.onSend(text)
        setText('')
      }
    }} onKeyPress={(e)=> {
      if (e.key === "Enter" && (text)) {
        props.onSend(text)
        setText('')
      }
    }}
      className="button"
      disabled={!text}>
      <b>&#8595;</b>
    </button>
  </div>
}

export default App;
