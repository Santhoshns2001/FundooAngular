import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserService } from '../../services/user/user.service';
import { PopupService } from '../../services/shared/popup.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatButtonModule, MatFormFieldModule, ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private user: UserService, private popup: PopupService,private router:Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.user.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        if (res.message === 'Login Success') {
          localStorage.setItem('token', res.data);
          console.log(localStorage.getItem('token'));
          this.router.navigate(['/dashboard/notes']);
           this.popup.success(res.message, 'Success');
        } else {
          this.popup.error(res.message, 'Failed');
        }
      },
      error: (err) => {
        const message = err?.error?.Message || err?.error?.message || 'Server error. Please try again';
        this.popup.error(message, 'Error');
      }
    });
  }


}
