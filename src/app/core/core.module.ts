import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentService } from './services/document.service';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireDatabaseModule,
    AngularFireAuthGuardModule
  ],
  providers: [ DocumentService, AuthService]
})
export class CoreModule { }
