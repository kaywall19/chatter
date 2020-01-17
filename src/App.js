import React, {useState} from 'react';
import './App.css';

function App() {
  return <main>
    <header className= "main-title">
      <img src="https://img.icons8.com/dotty/80/000000/filled-topic.png" id="logo"/>      
      Chatter
      <img src="https://img.icons8.com/android/24/000000/phone.png" id="call"/>
      <img src="https://img.icons8.com/android/24/000000/search.png" id="search"/>
      <img src="https://img.icons8.com/ios-glyphs/30/000000/menu-2.png" id="more"/>
    </header> 

    <TextInput onSend={t=>console.log(t)}/> 
    <img src="https://img.icons8.com/dotty/80/000000/filled-topic.png" id="background"/>
    <div class="arrow" id="oneA"></div>
    <p class="message" id="one">Helloooo</p>
    <div class="arrow" id="twoA"></div>
    <p class="message" id="two">Is anyone there?</p>
    <div class="arrow" id="threeA"></div>
    <p class="message" id="three">Pls answer</p>

  </main>
}

function TextInput(props) {
  const [text, setText] = useState("   ")

  return <div className= "text-input">
    <img src= "https://img.icons8.com/material-outlined/24/000000/camera--v1.png"/>
    <img src= "https://img.icons8.com/ios-glyphs/30/000000/shocker-emoji.png"/>
    <input value={text}
      placeholder=""
      onChange={e=> setText(e.target.value)}
    />
    <img onClick={()=> {
      props.onSend(text)
      setText("")
    }}
      src="https://img.icons8.com/windows/32/000000/long-arrow-right.png"
      id = "send-arrow"
    />
  </div>
}

export default App;
