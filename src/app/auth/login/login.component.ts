import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth, PERSISTENCE } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild(NgForm) form: NgForm;

  hidePassword: boolean = true;

  checkValidity(): boolean {
    return this.form.valid;
  }

  model: {
    email?: string;
    password?: string;
  } = {}

  constructor(
    private auth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.auth.user.subscribe(res => {
      if (res) {
        this.router.navigateByUrl('/setup');
      }
    });
  }

  handleLogin() {
    if (!this.checkValidity()) {
      return;
    }

    this.auth.signInWithEmailAndPassword(this.model.email, this.model.password).then(
      () => this.router.navigateByUrl('/setup')
    )
  }

}
