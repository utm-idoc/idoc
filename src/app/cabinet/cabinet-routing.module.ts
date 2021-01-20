import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CabinetComponent } from './cabinet.component';
import { NewDocumentComponent } from './new-document/new-document.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirecetUnauthorizedToLogin = () => redirectUnauthorizedTo(['login'])

const routes: Routes = [
  {
    path: 'cabinet',
    component: CabinetComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirecetUnauthorizedToLogin
    }
  },
  {
    path: 'new-document',
    component: NewDocumentComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirecetUnauthorizedToLogin
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CabinetRoutingModule { }
