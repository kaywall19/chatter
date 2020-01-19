import React, {useState} from 'react'

function NamePicker(props) {
    
    const [editName, setEditName] = useState(false)
    const [name, setName] = useState('Add Username')

    if(editName == false) {
        return <div className= "id">
            {name}
            <img 
                onClick={()=> {
                    setEditName(true)
                    setName('')
                    props.onSend("")
                }}
                src="https://img.icons8.com/material-rounded/24/000000/edit-user-male.png"
                id="profile"
            />
        </div>
    } else if (editName == true) {
        return <div className= "id">
            <input size="10"
            value={name}
            className = "input"
            id="header-input"
            placeholder="Add Username"
            onChange={e=> {
                setName(e.target.value)
            }}

            onKeyPress={(e) => {
            //e.preventDefault()
            if (e.key === "Enter" && (name)) {
                props.onSend(name)
                setEditName(false)
                setName('')
            }}}/>   

            <img 
                onClick={()=> {
                if(name) {
                    props.onSend(name)
                    setName('')
                    setEditName(false)
                }}}
                src="https://img.icons8.com/material-rounded/24/000000/edit-user-male.png"
                id="profile"
            />
        </div>
    }
    


        


}



export default NamePicker