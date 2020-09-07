import React , {useState, useEffect} from 'react';
import * as firebase from 'firebase';

export default function Message(props){
    // console.log(props.personSelected.displayName)
    const uid=(firebase.auth().currentUser||{}).uid;
    const [me, setMe]=useState({});
    useEffect(()=>{
        if(uid){
            firebase.firestore().collection("users").doc(uid)
            .onSnapshot(function(doc) {
                setMe(doc.data());
            });
        }
    },[uid]);
    return(
        <div>
            {props.personSelected.displayName} says Hi ! to you
        </div>
    );
}