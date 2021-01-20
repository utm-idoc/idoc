import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { KeyService } from './key.service';
import { map, mergeMap } from 'rxjs/operators';

export interface IDocument {
  [key: string]: string
}

export interface IDocumentCollection {
  [key: string]: IDocument;
}

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private keys;

  constructor(
    private fireDb: AngularFireDatabase,
    private keyService: KeyService
  ) {
  }

  getDocuments(userId: string): Observable<IDocumentCollection> {
    return <Observable<IDocumentCollection>> this.fireDb.object(`users/${userId}/documents`).valueChanges()
  }

  createDocument(userId:string) {
    const updates = {}
    const key = this.fireDb.database.ref().child('users').child('documents').push().key;

    const date = new Date();
    const year = date.getFullYear()
    const month = date.getMonth();
    const day = date.getDay()

    const content = {
      'type': 'passport',
      'fist-name': 'Samuel',
      'last-name': 'Jackson',
      'birth-date': '1948-12-21',
      'nationality': 'USA',
      'date-created': `${year}-${month}-${day}`,
      'expiration-date': `${year + 10}-${month}-${day}`
    }

    this.keyService.getKeys(userId)
    .then(
      res => this.keyService.encrypt(JSON.stringify(content), res.publicKey)
    )
    .then(
      res => {
        updates[`/users/${userId}/documents/${key}`] = res.content;
        return this.fireDb.database.ref().update(updates);
      }
    )
  }
}