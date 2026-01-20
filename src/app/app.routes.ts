import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { DashboardComponent } from './Pages/dashboard/dashboard-comp/dashboard.component';
import { NotesComponent } from './Pages/dashboard/notes/notes.component';
import { NotesListComponent } from './Pages/dashboard/notes-list/notes-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'Login', pathMatch: 'full' },

  { path: 'Login', component: LoginComponent },
  { path: 'Register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
     { path: 'notes', component: NotesComponent },
      { path: '', redirectTo: 'notes', pathMatch: 'full' },
    ]
  }
];
