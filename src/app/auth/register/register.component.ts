import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm, Validator, ValidatorFn } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild(NgForm) form: NgForm;

  checkValidity():boolean {
    console.log(this.form.valid)
    return  this.form.valid && (this.model.password === this.model.passwordConfirmation);
  }

  hidePassword: boolean = true;

  model: {
    email?: string,
    password?: string,
    passwordConfirmation?: string,
    idnp?: string
  } = {}

  constructor(
    private auth: AngularFireAuth,
    private fireDb: AngularFireDatabase,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.auth.user.subscribe(res => {
      if (res) {
        this.router.navigateByUrl('/setup');
      }
    });
  }

  handleRegister() {
    if (!this.checkValidity()) {
      return;
    }

    this.auth.createUserWithEmailAndPassword(this.model.email, this.model.password).then(
      () => {
        const update = {
          'idnp': parseInt(this.model.idnp, 10)
        }
        this.fireDb.database.ref().child('users').push(update);
      }
    )
  }
}
