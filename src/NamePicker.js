import React, {useState, useRef, useEffect} from 'react'
import { MdAccountCircle } from 'react-icons/md'

function NamePicker(props) {
    
    const [editName, setEditName] = useState(false) 
    const [name, setName] = useState("")
    const inputEl = useRef(null)

    let saveData = localStorage.getItem('name')
    if(!saveData) {
       saveData = "Add User" 
    }  

    if(editName == false) {
        props.onSend(saveData)
        return <div className= "id">
            <p id="placeholder">{name}</p>
            <MdAccountCircle
                onClick={()=> {
                    setEditName(true)
                    props.onSend("")
                }}
                id="profile"
            />
        </div>
    } else if (editName == true) {
        return <div className= "id">
            <input size="12"
            value={name}
            ref={inputEl}
            className = "input"
            id="header-input"
            placeholder="Add User"
            onChange={e=> {
                setName(e.target.value)
            }}

            onKeyPress={(e) => {
            //e.preventDefault()
            if (e.key === "Enter" && (name)) {
                props.onSend(name)
                setEditName(false)
                inputEl.current.focus()
                setName('')
                localStorage.setItem('name',name)
            }}}/>   

            <MdAccountCircle 
                onClick={()=> {
                    if(name) {
                        props.onSend(name)
                        setName('')
                        setEditName(false)
                        inputEl.current.focus()
                        localStorage.setItem('name',name)
                    }}}
                id="profile"
            />
        </div>
    }
}

export default NamePicker