import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidatepassService } from '../services/validatepass.service';
import { environment } from '../../environments/environment.development';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public password = new FormControl();
  private _apiService: ValidatepassService
  private token = "";
  passInvalid: boolean = true;

  constructor(apiService: ValidatepassService) {
    this._apiService = apiService;
  }

  getData() {
    if(this.password.value != null) {
      this._apiService.getData(environment.apiToken)
      .subscribe(response => {
        this.token = response.toString();
        const header = new HttpHeaders({
          'Authorization': `Bearer ${this.token}`
        })
  
        this._apiService.postData(environment.apiValidate, this.password.value, header)
        .subscribe(response => {
          this.passInvalid = Boolean(response).valueOf();
          console.log(this.passInvalid)
        })
      });
    }

  }


}
