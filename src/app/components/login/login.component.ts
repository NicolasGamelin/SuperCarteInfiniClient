import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {LoginDTO} from "../../models/LoginDTO";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  Rform:FormGroup<any>;
  RData:LoginDTO = (new LoginDTO("","",))
  constructor(private fb: FormBuilder,public service:ApiService) {
    this.Rform = this.fb.group({
      UserName: ['', [Validators.required]],
      Password: ['',[Validators.required]],
    }, {validators: this.registerValidator});

    this.Rform.valueChanges.subscribe(() => {
      this.RData = this.Rform.value;
    });
  }

  registerValidator(control: AbstractControl): ValidationErrors | null {

    const UserName = control.get('UserName')?.value;
    const Password = control.get('Password')?.value;

    let atLeastOneMistake:boolean = false;

    if(UserName == "") {
      control.get('UserName')?.setErrors({NomInvalide:true});
      atLeastOneMistake = true;
    } else {
      control.get('UserName')?.setErrors(null);
    }

    if(Password == "") {
      control.get('Password')?.setErrors({PasswordInvalide:true});
      atLeastOneMistake = true;
    } else {
      control.get('Password')?.setErrors(null);
    }

    return atLeastOneMistake?{atLeastOneMistake:true}:null;
  }


}



