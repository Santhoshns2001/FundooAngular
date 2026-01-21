import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { DashboardComponent } from './Pages/dashboard/dashboard-comp/dashboard.component';
import { NotesComponent } from './Pages/dashboard/notes/notes.component';
import { ResetPasswordComponent } from './Pages/reset-password/reset-password.component';
import { ForgotpasswordComponent } from './Pages/forgot-password/forgot-password.component';

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
  },
  {path:'forgot-password',component:ForgotpasswordComponent},
  {path:'reset-password',component:ResetPasswordComponent}
];
