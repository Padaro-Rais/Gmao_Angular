import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AdminComponent } from './admin.component'
import { RouterModule, Routes } from '@angular/router'
import { DashbordComponent } from './home/dashbord/dashbord.component'
import { ClarityModule } from '@clr/angular'
import { HttpClientModule } from '@angular/common/http'
import { NgSelectModule } from '@ng-select/ng-select'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HeaderComponent } from './layout/header/header.component'
import { SeadbarComponent } from './layout/seadbar/seadbar.component'
import { HomeComponent } from './home/home.component'
import { AddUsersComponent } from './users/add-users.component'
import { ListUsersComponent } from './users/list-users.component'
import { UpUserComponent } from './users/up-user.component'
import { ListMaterialGroupComponent } from './materials/materialGroup/list-material-group.component'
import { ListMaterialCategorieComponent } from './materials/materialCategorie/list-material-categorie.component'
import { ListMaterialLocationComponent } from './materials/materialLocation/list-material-location.component'
import { ListMaterialProviderComponent } from './materials/materialProvider/list-material-provider.component'
import { AddMaterialComponent } from './materials/add-material.component'
import { ListMaterialComponent } from './materials/list-material.component'
import { AddContractComponent } from './Contracts/add-contract.component'
import { ListContractComponent } from './Contracts/list-contract.component'
import { UpdateContractComponent } from './Contracts/update-contract.component'
import { AddTaskComponent } from './tasks/add-task.component'
import { ListTaskComponent } from './tasks/list-task.component'
import { UpdateTaskComponent } from './tasks/update-task.component'
import { UpdateUsersComponent } from './users/update-users.component'
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompanyComponent } from './materials/materialLocation/company/company.component';
import { AgencyComponent } from './materials/materialLocation/agency/agency.component';
import { LocalComponent } from './materials/materialLocation/local/local.component';

export const AdminRoute: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'statistiques', component: HomeComponent },
      { path: 'dashbord', component: DashbordComponent },

      { path: 'add-user', component: AddUsersComponent },
      { path: 'users', component: ListUsersComponent },
      { path: 'update-user/:id', component: UpUserComponent },

      { path: 'materialGroupe', component: ListMaterialGroupComponent },
      { path: 'materialCategorie', component: ListMaterialCategorieComponent },

      { path: 'materialLocation', component: ListMaterialLocationComponent },




      { path: 'companies', component: CompanyComponent },
      { path: 'agencies', component: AgencyComponent },
      { path: 'locals', component: LocalComponent },




      { path: 'materialProvider', component: ListMaterialProviderComponent },

      { path: 'add-Material', component: AddMaterialComponent },
      { path: 'materials', component: ListMaterialComponent },

      { path: 'add-Contract', component: AddContractComponent },
      { path: 'contracts', component: ListContractComponent },
      { path: 'update-contract/:id', component: UpdateContractComponent },

      { path: 'add-Task/:id', component: AddTaskComponent },
      { path: 'tasks', component: ListTaskComponent },
    ],
  },
]

@NgModule({
  declarations: [
    AdminComponent,
    DashbordComponent,
    HeaderComponent,
    SeadbarComponent,
    ListUsersComponent,
    AddUsersComponent,
    UpdateUsersComponent,
    ListMaterialCategorieComponent,
    ListMaterialGroupComponent,
    ListMaterialLocationComponent,
    ListMaterialProviderComponent,
    ListMaterialComponent,
    AddMaterialComponent,
    ListTaskComponent,
    AddTaskComponent,
    
    UpdateTaskComponent,
    ListContractComponent,
    AddContractComponent,
    UpdateContractComponent,
    HomeComponent,
    UpUserComponent,
    CompanyComponent,
    AgencyComponent,
    LocalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AdminRoute),
    ClarityModule,
    HttpClientModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
})
export class AdminModule {}
