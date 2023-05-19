import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginformComponent } from './loginform/loginform.component';
import { HomeComponent } from './home/home.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login-page', component:LoginformComponent },
  { path: 'home', component:HomeComponent, canActivate: [AuthGuard] }, //
  { path: 'add-project', component: CreateProjectComponent },
  { path: 'project-list', component: ProjectListComponent },
  { path: '', redirectTo: 'login-page', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
