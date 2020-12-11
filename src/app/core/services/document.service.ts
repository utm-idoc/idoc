import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  constructor(
    private fireDb: AngularFireDatabase
  ) { }

  getDocuments(userId: string) {
    return this.fireDb.object(`users/${userId}/documents`).valueChanges()
  }

  createDocument(userId:string) {
    const updates = {}
    const key = this.fireDb.database.ref().child('users').child('documents').push().key;

    updates[`/users/${userId}/documents/${key}`] = {
      'type': 'asdfwef',
      'content': 'asdfwef'
    }

    return this.fireDb.database.ref().update(updates);
  }
}