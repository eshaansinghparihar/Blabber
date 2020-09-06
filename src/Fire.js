import firebaseConfig from './config';
import * as firebase from 'firebase';
class Fire{
    constructor(props){
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
          }
    }
    get firestore(){
        return firebase.firestore();
    }
    get uid(){
        return (firebase.auth().currentUser|| {}).uid;
    }
    get timestamp(){
        return Date.now();
    }
    get displayName(){
        return (firebase.auth().currentUser|| {}).displayName;
    }
    createUser = async user => {
        try 
        {
            await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
            let db = this.firestore.collection('users').doc(this.uid);
            db.set({
                displayName: user.displayName,
                email: user.email,
                uid:this.uid,
                displayImage:'',
            });
        }
         catch (error) 
        {
            alert ( error );
        }
    };
    //     createUser = async user => {
    //     try 
    //     {
    //         await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
    //         var user = firebase.auth().currentUser;
    //         user.updateProfile({
    //             displayName:user.displayName
    //           }).then(function() {
    //             alert('Update Succesful')
    //           }).catch(function(error) {
    //             alert(error)
    //           });
    //     }
    //      catch (error) 
    //      {
    //         alert( error );
    //     }
    // };
    
    signOut = () => {
        firebase.auth().signOut();
    };
}
Fire.shared=new Fire();
export default Fire;