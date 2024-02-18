import { Component } from '@angular/core';
import {ApiService} from "../../services/api.service";
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {RegisterDTO} from "../../models/RegisterDTO";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  Rform:FormGroup<any>;
  RData:RegisterDTO = (new RegisterDTO("","","",""))
  constructor(private fb: FormBuilder,public service:ApiService) {
    this.Rform = this.fb.group({
      UserName: ['', [Validators.required]],
      Email: ['',[Validators.required]],
       Password: ['',[Validators.required]],
      PasswordConfirm: ['',[Validators.required]],
    }, {validators: this.registerValidator});

    this.Rform.valueChanges.subscribe(() => {
      this.RData = this.Rform.value;
    });
  }

  registerValidator(control: AbstractControl):  null {

    const UserName = control.get('UserName')?.value;
    const Email = control.get ('Email')?.value
    const Password = control.get('Password')?.value;
    const PasswordConirm = control.get ('PasswordConfirm')?.value



      if(UserName == "") {
        control.get('UserName')?.setErrors({NomInvalide:true});

      } else {
        control.get('UserName')?.setErrors(null);
    }

    if(Email == "") {
      control.get('Email')?.setErrors({EmailInvalide:true});

    } else {
      control.get('Email')?.setErrors(null);
    }

    if(Password == "") {
      control.get('Password')?.setErrors({PasswordInvalide:true});

    } else {
      control.get('Password')?.setErrors(null);
    }

    if(PasswordConirm == "") {
      control.get('PasswordConfirm')?.setErrors({PasswordConfirmInvalide:true});

    } else {
      control.get('PasswordConfirm')?.setErrors(null);
    }

    return null;
  }


}

