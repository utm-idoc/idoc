import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

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
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.isUserLogged().subscribe(res => {
      if (res) {
        this.router.navigateByUrl('/setup');
      }
    }).unsubscribe()
  }

  handleLogin() {
    if (!this.checkValidity()) {
      return;
    }

    this.authService.login({
      email: this.model.email,
      password: this.model.password
    }).then(
      () => this.router.navigateByUrl('/setup')
    )
  }

}
