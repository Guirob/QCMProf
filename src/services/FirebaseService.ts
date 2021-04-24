import firebase from "firebase";

export default class FirebaseService {
    private static instance: FirebaseService;

    public static getInstance(): FirebaseService {
        if (this.instance == undefined) {
            this.instance = new FirebaseService();
        }

        return this.instance;
    }

    public firebaseApp: firebase.app.App;
    constructor() {
        const firebaseConfig = {
            apiKey: "AIzaSyDAcTUgXHjXw-LS0Nsw0oWN0vVD7GPH0tQ",
            authDomain: "qcmprof-bd064.firebaseapp.com",
            databaseURL: "https://qcmprof-bd064-default-rtdb.europe-west1.firebasedatabase.app",
            projectId: "qcmprof-bd064",
            storageBucket: "qcmprof-bd064.appspot.com",
            messagingSenderId: "831729094816",
            appId: "1:831729094816:web:2c13cca35d61348e7fb9c5",
        };
        this.firebaseApp = firebase.initializeApp(firebaseConfig);
    }
}
