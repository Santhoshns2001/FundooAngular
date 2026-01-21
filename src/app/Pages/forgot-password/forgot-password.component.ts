import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatFormField } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
  imports:[FormsModule,MatFormFieldModule,MatFormField,ReactiveFormsModule,MatCardModule]
})
export class ForgotpasswordComponent implements OnInit {
  forgotForm!:FormGroup;
  constructor(private user:UserService,private formbuilder:FormBuilder){}
  ngOnInit(): void {
    this.forgotForm=this.formbuilder.group({
      Email:['']
    })
    
  }

  OnForgot(){
let reqData={
  Email:this.forgotForm.value.Email
}

  }

}