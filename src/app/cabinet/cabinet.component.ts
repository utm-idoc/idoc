import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';

import { DocumentService, IDocument, IDocumentCollection } from '../core/services/document.service';
import { KeyService } from '../core/services/key.service';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss']
})
export class CabinetComponent implements OnInit {
  _documents: IDocument[];

  constructor(
    private documentService: DocumentService,
    private authService: AuthService,
    private keyService: KeyService
  ) { }

  public get documents() {
    if ( this._documents) {
    }
    return Object.keys(this._documents || {}).map(documentId => ({
      id: documentId,
      type: this._documents[documentId].type || ''
    }));
  }

  ngOnInit(): void {
    this.authService.getUser().then(user => user.uid)
    .then(
      uid => this.documentService.getDocuments(uid).subscribe(
        documents => {
          this._documents = []
          const objs = this.keyService.getKeys(uid)
          .then(keys => {
            const res = Object.keys(documents).map(id => documents[id])
              .map(async item => await this.keyService.decrypt(JSON.stringify(item), keys.privateKey)
              .then(res => JSON.parse(res.content))
              .then(res => this._documents.push(res))
              .then(res => {
                console.log(this._documents);
                return res;
              })
            )
          })
        }
      )
    )
  }

  handleClick() {
    this.authService.getUser()
    .then(user => user.uid)
    .then(uid => this.documentService.createDocument(uid))
  }

  getDocument(documentIndex: number) {
    return this._documents[documentIndex];
  }
}
