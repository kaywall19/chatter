import React, {useState, useRef, useEffect} from 'react'
import { MdAccountCircle } from 'react-icons/md'

function NamePicker(props) {
    
    const [editName, setEditName] = useState(false)
    const [name, setName] = useState('Add User')
    const inputEl = useRef(null)

    if(editName == false) {
        return <div className= "id">
            <p id="placeholder">{name}</p>
            <MdAccountCircle
                onClick={()=> {
                    setEditName(true)
                    setName('')
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
            }}}/>   

            <MdAccountCircle 
                onClick={()=> {
                if(name) {
                    props.onSend(name)
                    setName('')
                    setEditName(false)
                    inputEl.current.focus()
                }}}
                id="profile"
            />
        </div>
    }
}

export default NamePicker