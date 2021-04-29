import CryptoJS from 'crypto-js';
import FirebaseService from './FirebaseService';
import firebase from 'firebase';
import 'firebase/auth';

export default class LoginService {
    private static instance: LoginService;

    public static getInstance(): LoginService {
        if (this.instance == undefined) {
            this.instance = new LoginService();
        }

        return this.instance;
    }

    public login(email: string, password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const firb = FirebaseService.getInstance().firebaseApp;
            firb.auth()
                .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
                .then(() => {
                    FirebaseService.getInstance()
                        .firebaseApp.auth()
                        .signInWithEmailAndPassword(email, password)
                        .then((userCredential) => {
                            resolve(userCredential.user);
                        })
                        .catch((error) => {
                            reject(error);
                        });
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    public logout() {
        FirebaseService.getInstance().firebaseApp.auth().signOut();
    }

    public isLogged(): Promise<boolean> {
        if (FirebaseService.getInstance().firebaseApp.auth().currentUser) {
            return Promise.resolve(true);
        }

        return new Promise((resolve) => {
            FirebaseService.getInstance()
                .firebaseApp.auth()
                .onAuthStateChanged((user) => {
                    if (user) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                });
        });
    }
}
