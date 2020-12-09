import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { IUserLogin, IUserRegistration } from '../core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth,
    private fireDb: AngularFireDatabase,
  ) { }

  isUserLogged() {
    return this.auth.user;
  }

  login(user: IUserLogin) {
    return this.auth.signInWithEmailAndPassword(user.email, user.password)
  }

  register (user: IUserRegistration) {
    return this.auth.createUserWithEmailAndPassword(user.email, user.password)
    .then(
      () => {
        const update = {
          'idnp': user.idnp
        }
        this.fireDb.database.ref().child('users').push(update);
      }
    )
  }
}
