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
    }, {});

    this.Rform.valueChanges.subscribe(() => {
      this.RData = this.Rform.value;
    });
  }


}



