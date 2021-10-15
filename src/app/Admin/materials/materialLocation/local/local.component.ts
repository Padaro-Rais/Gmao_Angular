import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Locals } from 'src/app/Models/Locacls';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.css']
})
export class LocalComponent implements OnInit {
  formValue!: FormGroup
  local: Locals = new Locals()
  data: any
  locals: any

  agencies :any

  showAdd: boolean = true
  showUp: boolean = false
  cansel: boolean = false
  alert: boolean = false
  code: boolean = false


  constructor(
    private service: LocationService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) {}

  CreateLocals() {
    this.local.agency_code = this.formValue.value.agency_code
    this.local.nom = this.formValue.value.nom
    this.service.Createlocals(this.local).subscribe(
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
      agency_code:['']
    })

    this.service.getAgencies().subscribe((res) => {
      this.data = res
      this.agencies = this.data.items
    })

    this.getData()
  }

  getData() {
    this.service.getlocal().subscribe((res) => {
      this.data = res
      this.locals = this.data.items
      console.log(this.locals)
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

    this.local.code= row.code
    this.formValue.controls['agency_code'].setValue(row.agency_code)
    this.formValue.controls['nom'].setValue(row.nom)
  }

  UpdateData() {
    this.alert = false
    this.local.agency_code = this.formValue.value.agency_code
    this.local.nom = this.formValue.value.nom

    this.service.updatelocal(this.local.code, this.local).subscribe(
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
    this.formValue.reset()
  }

}
