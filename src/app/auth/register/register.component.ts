import { Component, OnInit, ViewChild } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  destroy$: Subject<Boolean> = new Subject<boolean>();
  @ViewChild(NgForm) form: NgForm;

  checkValidity():boolean {
    console.log(this.form.valid)
    return  this.form.valid && (this.model.password === this.model.passwordConfirmation);
  }

  hidePassword: boolean = true;

  model = {
    email: '',
    password: '',
    passwordConfirmation: '',
    idnp: ''
  }

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.isUserLogged()
    .subscribe(res => {
      if (res) {
        this.router.navigateByUrl('/setup');
      }
    }).unsubscribe();
  }

  handleRegister() {
    if (!this.checkValidity()) {
      return;
    }

    this.authService.register({
      email: this.model.email,
      password: this.model.password,
      idnp: this.model.idnp
    })
  }
}
