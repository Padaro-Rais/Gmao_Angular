import { ListUsersComponent } from './Admin/users/list-users.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';

import { NotfoundComponent } from './notfound/notfound.component';

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

  {
    path: '**',
    component: NotfoundComponent,
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
