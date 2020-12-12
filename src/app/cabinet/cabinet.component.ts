import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';

import { DocumentService } from '../core/services/document.service';
import { KeyService } from '../core/services/key.service';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss']
})
export class CabinetComponent implements OnInit {
  documents

  constructor(
    private documentService: DocumentService,
    private authService: AuthService,
    private keysService: KeyService
  ) { }

  ngOnInit(): void {
    this.authService.getUser().then(user => user.uid)
    .then(
      uid => this.documentService.getDocuments(uid).subscribe(
        documents => this.documents = documents
      )
    )
  }

  handleClick() {
    this.authService.getUser()
    .then(user => user.uid)
    .then(uid => this.documentService.createDocument(uid))
  }

}
