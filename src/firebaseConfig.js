import firebase from 'firebase/app'
import 'firebase/firestore'

// firebase init goes here
const config = {
    apiKey: "AIzaSyAkA--bkjdlCUW3rgXdbF8BtYZbj73S3ZE",
    authDomain: "my-awesome-project-id-13a4a.firebaseapp.com",
    databaseURL: "https://my-awesome-project-id-13a4a.firebaseio.com",
    projectId: "my-awesome-project-id-13a4a",
    storageBucket: "my-awesome-project-id-13a4a.appspot.com",
    messagingSenderId: "987287177047"
};
firebase.initializeApp(config);

// firebase utils
const db = firebase.firestore();
const auth = firebase.auth();
const currentUser = auth.currentUser;

const settings = {timestampsInSnapshots: true};
db.settings(settings);

// firebase collections
const productsCollection = db.collection('products');

export {
    db,
    auth,
    currentUser,
    productsCollection,
}
