import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterModule, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  user: User = { email: '', password: '' }

  form = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required)
  });


  constructor(private authService: AuthService, private router: Router) {}

    onSubmit(){
      if(this.form.valid){
        this.authService.logIn(this.form.value as User)
        .then(() =>{
          this.router.navigate(['/home'])
        })
        .catch(error => console.error('Error during login:', error))
      }
    }


    login() {
      if (this.form.valid) {
        this.authService.logIn(this.form.value as User)
          .then(() => {
            this.router.navigate(['/home']);
          })
          .catch(error => console.error('Error during login:', error));
      }
    }

    onClickGoogle(){
      this.authService.logInGoogle()
      .then(() =>{
        this.router.navigate(['/home']);
      })
      .catch(error => console.error('Error during Google login:', error));
    }
}
