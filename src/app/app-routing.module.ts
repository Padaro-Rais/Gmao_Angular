import { ListUsersComponent } from './Admin/users/list-users.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUsersComponent } from './Admin/users/add-users.component';
import { DetailsUsersComponent } from './Admin/users/details-users.component';

import { ListMaterialGroupComponent } from './Admin/materials/materialGroup/list-material-group.component';
import { ListMaterialCategorieComponent } from './Admin/materials/materialCategorie/list-material-categorie.component';
import { ListMaterialLocationComponent } from './Admin/materials/materialLocation/list-material-location.component';
import { ListMaterialProviderComponent } from './Admin/materials/materialProvider/list-material-provider.component';
import { ListMaterialComponent } from './Admin/materials/list-material.component';
import { ListContractComponent } from './Admin/Contracts/list-contract.component';
import { ListTaskComponent } from './Admin/tasks/list-task.component';

import { AddContractComponent } from './Admin/Contracts/add-contract.component';
import { AddMaterialCategorieComponent } from './Admin/materials/materialCategorie/add-material-categorie.component';
import { AddMaterialGroupComponent } from './Admin/materials/materialGroup/add-material-group.component';
import { AddMaterialLocationComponent } from './Admin/materials/materialLocation/add-material-location.component';
import { AddMaterialProviderComponent } from './Admin/materials/materialProvider/add-material-provider.component';
import { AddMaterialComponent } from './Admin/materials/add-material.component';
import { AddTaskComponent } from './Admin/tasks/add-task.component';

import { HomeComponent } from './Admin/home/home.component';
import { DetailsTaskComponent } from './Admin/tasks/details-task.component';
import { DashbordComponent } from './Admin/home/dashbord/dashbord.component';
import { AuthGuard } from './auth/auth.guard';
import { UpdateUsersComponent } from './Admin/users/update-users.component';
import { UpUserComponent } from './Admin/users/up-user.component';
import { ConsultationComponent } from './Admin/materials/consultation/consultation.component';
import { UpdateMaterialLocationComponent } from './Admin/materials/materialLocation/update-material-location.component';
import { UpdateContractComponent } from './Admin/Contracts/update-contract.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },

  {
    path: 'auth',
    loadChildren: () =>
      import('src/app/auth/auth.module').then((m) => m.LoginModule),
  },

  {
    path: 'app',
    loadChildren: () =>
      import('src/app/Admin/admin.module').then((m) => m.AdminModule),
      canActivate: [AuthGuard],
  },

  // { path: 'login', component: LoginComponent },
  // { path: 'statistiques', component: HomeComponent },
  // { path: 'dashbord', component: DashbordComponent },

  // { path: 'add-user', component: AddUsersComponent },
  // { path: 'users', component: ListUsersComponent },
  // { path: 'update-user/:id', component: UpUserComponent },

  // { path: 'materialGroupe', component: ListMaterialGroupComponent },
  // { path: 'materialCategorie', component: ListMaterialCategorieComponent },

  // { path: 'add-Location', component: AddMaterialLocationComponent },
  // { path: 'materialLocation', component: ListMaterialLocationComponent },
  // { path: 'update-location/:id', component: UpdateMaterialLocationComponent },

  // { path: 'materialProvider', component: ListMaterialProviderComponent },

  // { path: 'add-Material', component: AddMaterialComponent },
  // { path: 'materials', component: ListMaterialComponent },
  // { path: 'consultation', component: ConsultationComponent },

  // { path: 'add-Contract', component: AddContractComponent },
  // { path: 'contracts', component: ListContractComponent },
  // { path: 'update-contract/:id', component: UpdateContractComponent },

  // { path: 'add-Task', component: AddTaskComponent },
  // { path: 'tasks', component: ListTaskComponent },
  // { path: 'details-task/:id', component: DetailsTaskComponent },

  // route    [routerLink]="['Lien', parametre]"

  // routerLinkActivate=active

  /* private route: activateroute {
   // info des navigation this.route.snapshot
   this.router.navigate(['lien',*id*])
   ('/patient/${id}')

}
*/

  // { path: 'home', component: HomeComponent },
  // { path: 'Dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  // routermodule.forchild()
  exports: [RouterModule],
})
export class AppRoutingModule {}
