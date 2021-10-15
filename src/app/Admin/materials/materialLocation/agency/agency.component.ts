import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Agencies } from 'src/app/Models/Agencies';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.css']
})
export class AgencyComponent implements OnInit {
  formValue!: FormGroup
  agencie: Agencies = new Agencies()
  data: any
  agencies: any

  showAdd: boolean = true
  showUp: boolean = false
  cansel: boolean = false
  alert: boolean = false
  code: boolean = false
  local: boolean = true


  constructor(
    private service: LocationService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) {}

  CreateAgency() {
    this.agencie.company_code = 'LGMAO'
    this.agencie.nom = this.formValue.value.nom
    this.agencie.ville = this.formValue.value.ville
    this.agencie.pays = this.formValue.value.pays

    this.service.CreateAgencies(this.agencie).subscribe(
      (res) => {
        this.toastr.success('sauvegarde reuissi !')
        this.formValue.reset()
        this.getData()
      },
      (err) => {
        this.toastr.error('une erreur produite !', 'veuillez réessayer')
      },
    )
  }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      code:[''],
      nom: [''],
      ville: [''],
      pays:[''],
    })

    this.getData()
  }

  getData() {
    this.service.getAgencies().subscribe((res) => {
      this.data = res
      this.agencies = this.data.items
      console.log(this.agencies)
    })

  }

  deleteData(_id: any) {
    var res = confirm('Êtes-vous sûr de vouloir supprimer?')
    if (res) {
      this.service.deleteData(_id).subscribe(
        (res) => {
          this.toastr.success('suppression reuissi !')
          this.getData()
        },
        (err) => {
          this.toastr.error('une erreur produite !', 'veuillez réessayer')
        },
      )
    }
  }



  Edite(row: any) {
    this.showAdd = false
    this.showUp = true
    this.cansel = true
    this.code = true
    this.local = false

    this.agencie.code= row.code
    this.formValue.controls['nom'].setValue(row.nom)
    this.formValue.controls['ville'].setValue(row.ville)
    this.formValue.controls['pays'].setValue(row.pays)
  }

  UpdateData() {
    this.alert = false
    this.agencie.nom = this.formValue.value.nom
    this.agencie.ville = this.formValue.value.ville
    this.agencie.pays = this.formValue.value.pays
    this.service.updateAgencie(this.agencie.code, this.agencie).subscribe(
      (res) => {
        this.showAdd = true
        this.showUp = false
        this.cansel = false
        this.toastr.success('modification reussi !')
        this.getData()
        this.formValue.reset()
        this.formValue.reset()
      },
      (err) => {
        this.toastr.error('une erreur produite !', 'veuillez réessayer')
      },
    )
  }


  Cansel() {
    this.showUp = false
    this.cansel = false
    this.showAdd = true
    this.code = false
    this.local = true,
    this.formValue.reset()
  }
}
