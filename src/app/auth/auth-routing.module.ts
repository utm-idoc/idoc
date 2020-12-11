import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AngularFireAuthGuard, redirectLoggedInTo } from '@angular/fire/auth-guard';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const redirectLoggedInToCabinet = () => redirectLoggedInTo(['cabinet']);

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [AngularFireAuthGuard],
        data: {
            authGuardPipe: redirectLoggedInToCabinet
        }
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [AngularFireAuthGuard],
        data: {
            authGuardPipe: redirectLoggedInToCabinet
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule { }
