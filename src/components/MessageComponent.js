import React , {useState, useEffect} from 'react';
import * as firebase from 'firebase';

export default function Message(props){
    // console.log(props.personSelected.displayName)
    return(
        <div>
            {props.personSelected.displayName} says Hi ! to you
        </div>
    );
}