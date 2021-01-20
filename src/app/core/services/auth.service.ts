import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { IUserLogin, IUserRegistration } from '../models/user.model';
import firebase from 'firebase/app';
import { KeyService } from './key.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    private fireDb: AngularFireDatabase,
    private keyService: KeyService
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
        const uid = firebaseUser.uid;
        let keys;


        return this.keyService.getKeys()
        .then(res => {
          keys = res;
          return res.publicKey;
        })
        .then( publicKey =>
          this.keyService.encrypt(user.idnp, publicKey)
        )
        .then(res => {
          const updates = {}
          updates[`/users/${uid}`] = {
            'idnp': res.content,
            'publicKey': keys.publicKey,
            'privateKey': keys.privateKey
          }

          return this.fireDb.database.ref().update(updates);
        });
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