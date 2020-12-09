import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {
  @ViewChild(NgForm) form: NgForm;

  model: {
    idnp: string
  }

  constructor(
    private auth: AngularFireAuth,
  ) { }

  ngOnInit(): void {
    this.auth.user.subscribe(res => {
      console.log(res);
    });
  }
}
