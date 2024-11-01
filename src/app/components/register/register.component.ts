import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {RegisterDTO} from "../../models/RegisterDTO";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{


  ngOnInit(): void {
    this.service.GetAllUserName();

  }
  Rform:FormGroup<any>;
  RData:RegisterDTO = (new RegisterDTO("","","",""))
  constructor(private fb: FormBuilder,public service:ApiService) {
    this.Rform = this.fb.group({
      UserName: ['', [Validators.required]],
      Email: ['',[Validators.required,Validators.email]],
       Password: ['',[Validators.required,Validators.minLength(12)]],
      PasswordConfirm: ['',[Validators.required]],
    }, { validators: this.PasswordValidator });

    this.Rform.valueChanges.subscribe(() => {
      this.RData = this.Rform.value;
    });
  }

  PasswordValidator(control: AbstractControl): ValidationErrors | null  {

    const Password = control.get('Password')?.value;
    const PasswordConirm = control.get ('PasswordConfirm')?.value


     if(PasswordConirm != Password  ) {
      control.get('PasswordConfirm')?.setErrors({PasswordConfirmInvalide:true});
    }

     if (Password == "")
     {
       control.get('Password')?.setErrors({required:true});
     }
     else
if (Password.length < 12)

{
  control.get('Password')?.setErrors({minLength:true});
}



    return null
  }






}

