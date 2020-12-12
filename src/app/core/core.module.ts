import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentService } from './services/document.service';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { AuthService } from './services/auth.service';
import { KeyService } from './services/key.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireDatabaseModule,
    AngularFireAuthGuardModule,
    HttpClientModule,
  ],
  providers: [ DocumentService, AuthService, KeyService ]
})
export class CoreModule { }
