import {useState, useEffect} from 'react'
import * as firebase from "firebase/app"
import "firebase/firestore"
import "firebase/storage"

let store
const coll = 'messages'

function useDB(room) {
    const [messages, setMessages] = useState([])

    function add(m) {
        setMessages(current => {
            const msgs = [m, ...current]
            msgs.sort((a,b)=> b.ts.seconds - a.ts.seconds)
            return msgs
        })
    }

    function remove(id) {
        setMessages(current=> current.filter(m=> m.id!==id))
    }

    useEffect(() => {
        store.collection(coll)
        .where('room','==',room)
        .onSnapshot(snap=> snap.docChanges().forEach(c=> {
            const {doc, type} = c
            if (type==='added') add({...doc.data(),id:doc.id})
            if (type==='removed') remove(doc.id)
        }))
    }, [])

    return messages
}

const db = {}
db.send = function(msg) {
    return store.collection(coll).add(msg)
}
db.delete = function(id) {
    return store.collection(coll).doc(id).delete()
}

export { db, useDB }

const firebaseConfig = {
  apiKey: "AIzaSyCKk80m0MQmmwa76eWMrKPaoi-uu0LIw5w",
  authDomain: "chatter-2cdab.firebaseapp.com",
  databaseURL: "https://chatter-2cdab.firebaseio.com",
  projectId: "chatter-2cdab",
  storageBucket: "chatter-2cdab.appspot.com",
  messagingSenderId: "885314056325",
  appId: "1:885314056325:web:d1a50a10fdb5e0c4bdf9ec"
};

firebase.initializeApp(firebaseConfig)
store = firebase.firestore()