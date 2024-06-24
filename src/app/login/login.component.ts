import { Component, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidatepassService } from '../services/validatepass.service';
import { environment } from '../../environments/environment.development';
import { HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public password = new FormControl();
  private _apiService: ValidatepassService
  private token = "";
  passValid: boolean = false;
  passInvalidEmpty: boolean = true;

  

  constructor(apiService: ValidatepassService, private _snackBar: MatSnackBar) {
    this._apiService = apiService;
    
  }
  

  getData() {
    if(this.password.value != null && this.password.value != "") {
      const user = {
        'clientId': environment.clientId,
        'clientSecret': environment.clientSecret,
        'grantType': 'client_credentials',
        'scope': 'test_api_access'
        
        }

      this._apiService.getToken(user).subscribe(
        (response) => {
          try {
            this.token = JSON.parse(response).access_token;
          } catch (error) {
            console.error('Error parsing JSON:', error);
          }        
          const header = new HttpHeaders({
            'Authorization': `Bearer ${this.token}`
          })
          this._apiService.postData(environment.apiValidate, this.password.value, header)
          .subscribe(response => {
            this.passValid = Boolean(response).valueOf();
            if (this.passValid) {
              this.openSnackBar('Senha validada com sucesso!', 'Fechar');
            } else {
              this.openSnackBar('Senha inválida! Não atende aos requisitos.', 'Fechar');
            }
          })
        },
        (error) => {
          console.error('Erro ao buscar token', error);
        }
      );
    } else {
      this.openSnackBar('Senha obrigatória!', 'Fechar');
    }

  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000, // duração em milissegundos
    });
  }
  

}
