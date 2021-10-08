import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ControlClassService } from '@clr/angular/forms/common/providers/control-class.service';
import { Users } from 'src/app/Models/users';
import { UsersService } from './users.service';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-users',
  template: `
    <h6 id="titre1">Configuration</h6>
    <h2 id="titre"><b>UTILISATEURS SYSTEME</b></h2>
    <div class="clr-row" id="baniere">
      <div class="clr-col-3">
        <h3><b>Nouvelle entrée</b></h3>
      </div>
      <div class="clr-col-9"></div>
    </div>
    <br />


    <form (ngSubmit)="CreateUser()" #registerForm="ngForm" >
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
            required min="8"
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
            required
            [ngClass]="{'is-invalid': email.touched && !email.valid}"
          />
          <div class="invalid-feedback"><span *ngIf="email.errors">ce champs est requis</span></div>
        </div>

        <div class="col">
          <label for="exampleFormControlInput1" class="form-label"
            >Mot de passe<span class="requi">(*)</span></label
          >
          <input
            type="text"
            class="form-control form-control-sm"
            name="password"
            id="password"
            #password="ngModel"
            [(ngModel)]="users.password"
            required minlength="8"
            [ngClass]="{'is-invalid': password.touched && !password.valid}"
          />
          <div class="invalid-feedback"><span *ngIf="password.errors">8 caractères requis</span></div>
        </div>
      </div> <br>


      <div class="row">
        <div class="col">
          <label class="form-label">Profile <span class="requi"></span></label>
          <input
            type="file"
            class="form-control form-control-sm"
            id="image"
            name="image"
            (change)="onFileSelected($event)"
            #profile="ngModel"
            [(ngModel)]="users.image"
            required
            [ngClass]="{ 'is-invalid': profile.touched && !profile.valid }"
          />
          <div class="invalid-feedback">
            <span *ngIf="profile.errors">ce champs est requis</span>
          </div>
        </div>

        <div class="col">
          <label class="form-label">Role <span class="requi">(*)</span></label>
          <select
            class="form-select form-select-sm"
            aria-label="Default select example"
            name="pays"
            id="pays"
            #role="ngModel"
            required
            [(ngModel)]="users.role_id"
            [ngClass]="{ 'is-invalid': role.touched && !role.valid }"
          >
            <option selected>Selectionner le Role</option>
            <option *ngFor="let role of roles" value="{{ role.id }}">
                {{ role.name }}
              </option>
          </select>
          <div class="invalid-feedback">
            <span *ngIf="role.errors">ce champs est requis</span>
          </div>
        </div>
        </div>
        <br />

        <div class="col-12" >
          <button class="btn btn-primary" type="submit" [disabled]="!registerForm.valid">SAUVEGARDER</button>
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
export class AddUsersComponent implements OnInit {
  formGroup: any;
  selectedFile : any ;
  data: any;
  roles: any;
  users = new Users();
  showbt: boolean = true;

  constructor(private service: UsersService, private router: Router , private fb: FormBuilder, private toastr: ToastrService ) {}


  ngOnInit(): void {
    this.getRole();
  }



  onFileSelected(event: any) {
    this.selectedFile=<File>event.target.files[0]
    console.log(event)
  }

  CreateUser() {
    this.showbt = false;

    const formData = new FormData();
    formData.append( 'username', this.users.username );
    formData.append( 'email', this.users.email );
    formData.append( 'password', this.users.password );
    formData.append( 'firstname', this.users.firstname );
    formData.append( 'lastname', this.users.lastname );
    formData.append( 'address', this.users.address );
    formData.append( 'phone_number', this.users.phone_number );
    formData.append( 'birthday', this.users.birthday);
    formData.append( 'image', this.selectedFile);
    formData.append( 'role_id', this.users.role_id );

    this.service.createUser(formData).subscribe(
      (_res) => {
        this.toastr.success('sauvegarde reuissi !');
      },
      (_err) => {
        this.toastr.error('une erreur produite !','veuillez réessayer');
      }
    );
  }

  getRole() {
    this.service.getRole().subscribe((res) => {
      this.data = res;
      this.roles = this.data;
      console.log(this.roles);
    });
  }

  cansel(){
    this.router.navigateByUrl('/app/users');
  }
}
