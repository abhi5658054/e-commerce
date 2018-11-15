import firebase from 'firebase/app'
import 'firebase/firestore'
import settings from '../firebase'

firebase.initializeApp(settings.config);

// firebase utils
const db = firebase.firestore();
const auth = firebase.auth();
const currentUser = auth.currentUser;

const defaultSettings = {timestampsInSnapshots: true};
db.settings(defaultSettings);

// firebase collections
const productsCollection = db.collection('products');

export {
    db,
    auth,
    currentUser,
    productsCollection,
}
