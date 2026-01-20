import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Registermdl } from './Modals/Registermdl';
import { PopupService } from '../../services/shared/popup.service';
import { UserService } from '../../services/user/user.service';
import { Router, RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    RouterLink,
    RouterModule
],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {


  public registerMdl: Registermdl= new Registermdl();

  constructor(private popup:PopupService,private user:UserService,private router :Router) {
    
    
  }

 onSubmit(data:any){
 // console.log(data.form.value)
  if(this.registerMdl.Password!=this.registerMdl.ConfirmPassword){
    return this.popup.error('password and confirm password should be same', 'Failed');
  }
  else{
    console.log(this.registerMdl);
    this.user.register(this.registerMdl).subscribe({
      next:(res:any)=>{
        console.log(res);
        if(res.isSuccuss===true && res.message==='Registered Successfully'){
            this.popup.success(res.message, 'Success');
             this.router.navigate(['/Login']);
        }else{
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

}
