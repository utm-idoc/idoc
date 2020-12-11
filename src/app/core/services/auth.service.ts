import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { IUserLogin, IUserRegistration } from '../models/user.model';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    private fireDb: AngularFireDatabase,
  ) {}

  isUserLogged() {
    return this.auth.user;
  }

  getUser(): Promise<firebase.User> {
    return this.auth.currentUser;
  }

  login(user: IUserLogin) {
    return this.auth.signInWithEmailAndPassword(user.email, user.password)
  }

  register (user: IUserRegistration) {
    return this.auth.createUserWithEmailAndPassword(user.email, user.password)
    .then(
      () => this.auth.currentUser
    ).then(
      firebaseUser => {
        const uid = firebaseUser.uid

        const updates = {}
        updates[`/users/${uid}`] = {
          'idnp': user.idnp
        }

        return this.fireDb.database.ref().update(updates);
      }
    )
  }
}


// () => {
      //   const update = {
      //     'idnp': user.idnp
      //   }
      //   this.fireDb.database.ref().child('users').push(update);
      // }