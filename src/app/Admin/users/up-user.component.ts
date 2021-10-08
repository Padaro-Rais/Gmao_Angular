import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from 'src/app/Models/users';
import { UsersService } from './users.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-up-user',
  template: `
    <h6 id="titre1">Configuration</h6>
    <h2 id="titre"><b>UTILISATEURS SYSTEME</b></h2>
    <div class="clr-row" id="baniere">
      <div class="clr-col-3">
        <h3><b>Modification de données</b></h3>
      </div>
      <div class="clr-col-9"></div>
    </div>
    <br/>




    <form (ngSubmit)="updateData()" #registerForm="ngForm" >
      <div class="row">
        <div class="col">
          <label class="form-label"
            >Nom <span class="requi"></span></label
          >
          <input
            type="text"
            class="form-control form-control-sm"
            name="Nom"
            id="Nom"
            #nom="ngModel"
            placeholder=""
            minlength="2"
            [(ngModel)]="users.lastname"
            [ngClass]="{'is-invalid': nom.touched && !nom.valid}"
          />
          <div class="invalid-feedback"><span *ngIf="nom.errors">2 caractères minimum</span></div>

        </div>

        <div class="col">
          <label for="exampleFormControlInput1" class="form-label"
            >Prénoms <span class="requi"></span></label
          >
          <input
            type="text"
            class="form-control form-control-sm"
            name="firstname"
            id="firstname"
            #firstname="ngModel"
            [(ngModel)]="users.firstname"
            minlength="2"
            [ngClass]="{'is-invalid': firstname.touched && !firstname.valid}"
          />
          <div class="invalid-feedback"><span *ngIf="firstname.errors">2 caractères minimum</span></div>
        </div>
      </div>
      <br />

      <div class="row">
        <div class="col">
          <label for="exampleFormControlInput1" class="form-label"
            >Addresse<span class="requi"></span></label
          >
          <input
            type="text"
            class="form-control form-control-sm"
            name="addresse"
            id="addresse"
            placeholder=""
            #addresse="ngModel"
            [(ngModel)]="users.address"
            minlength="2"
            [ngClass]="{'is-invalid': addresse.touched && !addresse.valid}"
          />
          <div class="invalid-feedback"><span *ngIf="addresse.errors">ce champs est requis</span></div>
        </div>

        <div class="col">
          <label for="exampleFormControlInput1" class="form-label"
            >Téléphone<span class="requi">(*)</span></label
          >
          <input
            type="number"
            class="form-control form-control-sm"
            name="phone"
            id="phone"
            #phone="ngModel"
            [(ngModel)]="users.phone_number"
            required
            [ngClass]="{'is-invalid': phone.touched && !phone.valid}"
          />
          <div class="invalid-feedback"><span *ngIf="phone.errors">numero incorrect</span></div>
        </div>
      </div> <br>

      <div class="row">
        <div class="col">
          <label for="exampleFormControlInput1" class="form-label"
            >Date de naissance<span class="requi"></span></label
          >
          <input
            type="date"
            class="form-control form-control-sm"
            name="birthday"
            id="birthday"
            placeholder=""
            #birthday="ngModel"
            [(ngModel)]="users.birthday"
            [ngClass]="{'is-invalid': birthday.touched && !birthday.valid}"
          />
          <div class="invalid-feedback"><span *ngIf="birthday.errors">ce champs est requis</span></div>
        </div>

        <div class="col">
          <label for="exampleFormControlInput1" class="form-label"
            >Nom d'utilisateur<span class="requi">(*)</span></label
          >
          <input
            type="text"
            class="form-control form-control-sm"
            name="username"
            id="username"
            #username="ngModel"
            [(ngModel)]="users.username"
            required maxlength="20" minlength="3"
            [ngClass]="{'is-invalid': username.touched && !username.valid}"
          />
          <div class="invalid-feedback"><span *ngIf="username.errors">3 caaractères minimum</span></div>
        </div>
      </div> <br>

      <div class="row">
        <div class="col">
          <label for="exampleFormControlInput1" class="form-label"
            >Email<span class="requi">(*)</span></label
          >
          <input
            type="email"
            class="form-control form-control-sm"
            name="email"
            id="email"
            placeholder=""
            #email="ngModel"
            [(ngModel)]="users.email"
            required maxlength="20"
            [ngClass]="{'is-invalid': email.touched && !email.valid}"
          />
          <div class="invalid-feedback"><span *ngIf="email.errors">ce champs est requis</span></div>
        </div>

      </div> <br>

        <div class="col-12" >
          <button class="btn btn-primary" type="submit" [disabled]="!registerForm.valid">modifier</button>

          <button
            class="btn btn-primary"
            (click)="cansel()"
          >
            RETOUR
          </button>
        </div>
    </form>
  `,
  styles: [],
})
export class UpUserComponent implements OnInit {
  formValue!: FormGroup;
  id: any;
  data: any;

  users: Users = new Users();

  constructor(
    private service: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getUserById();
  }

  getUserById() {
    this.id = this.route.snapshot.params.id;
    this.service.getUserById(this.id).subscribe((res) => {
      this.data = res;
      this.users = this.data.item;
      console.log(this.users);
    });
  }

  updateData() {
    this.service.updateData(this.id, this.users).subscribe(
      (res) => {
        this.toastr.success('modification reuissi !');
      },
      (err) => {
        this.toastr.error('une erreur produite !','veuillez réessayer');
      }
    );
  }

  cansel(){
    this.router.navigateByUrl('/app/users');
  }

}
