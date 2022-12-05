import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  User,
} from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public _uid: BehaviorSubject<any> = new BehaviorSubject(null);
  currentUser: any;

  constructor(private afAuth: Auth, private apiService: ApiService) {}

  async register(
    email: string,
    password: string,
    username: string
  ): Promise<User> {
    try {
      const { user } = await createUserWithEmailAndPassword(
        this.afAuth,
        email,
        password
      );
      console.log('Registered user -->', user);
      const data = {
        email: email,
        name: username,
        uid: user.uid,
        photo: 'https://i.pravatar.cc/' + this.randomIntFromInterval(200, 400),
      };
      // await this.apiService.setDocument(`users/${user.uid}`, data);
      // const userData = {
      //   id: user.uid,
      // };
      // await this.login(email, password);
      await signInWithEmailAndPassword(this.afAuth, email, password);

      console.log(user);
      return user;
      // return userData;
    } catch (error) {
      throw error;
    }
  }

  async login(email: string, password: string): Promise<User> {
    try {
      const { user } = await signInWithEmailAndPassword(
        this.afAuth,
        email,
        password
      );
      // this.updateUserData(user)
      if (user) {
        this.setUserData(user.uid);
      }
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async logout() {
    try {
      await signOut(this.afAuth);
      this._uid.next(null);
    } catch (error) {
      console.log('Error -->', error);
    }
  }

  getId() {
    const auth = getAuth();
    this.currentUser = auth.currentUser;
    console.log(this.currentUser);
    return this.currentUser?.uid;
  }

  setUserData(uid) {
    this._uid.next(uid);
  }

  randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  async resetPassword(email: string): Promise<any> {
    try {
      return sendPasswordResetEmail(this.afAuth, email);
    } catch (error) {
      console.log('Error -->', error);
    }
  }

  checkAuth(): Promise<any> {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this.afAuth, (user) => {
        console.log('auth user: ', user);
        resolve(user);
      });
    });
  }

  async getUserData(id) {
    const docSnap: any = await this.apiService.getDocById(`users/${id}`);
    if (docSnap?.exists()) {
      return docSnap.data();
    } else {
      throw 'No such document exists';
    }
  }

  async sendEmailVerification(user: User): Promise<void> {
    try {
      return await sendEmailVerification(user);
    } catch (error) {
      console.log('Error -->', error);
    }
  }

  isEmailVerified(user: User) {
    return user.emailVerified === true ? true : false;
  }

  // private updateUserData(user: UserAuth) {
  //   const userRef: AngularFirestoreDocument<UserAuth> = this.afs
  //     .collection('users')
  //     .doc(user.uid);
  //   // console.log('userRef -->', userRef)
  //   const data: UserAuth = {
  //     uid: user.uid,
  //     email: user.email,
  //     emailVerified: user.emailVerified,
  //     displayName: user.displayName,
  //   };
  //   return userRef.set(data, { merge: true });
  // }
}
