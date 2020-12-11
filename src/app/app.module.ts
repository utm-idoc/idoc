import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module'
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { SharedModule } from './shared/shared.module'
import { CabinetModule } from './cabinet/cabinet.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    AuthModule,
    CabinetModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
