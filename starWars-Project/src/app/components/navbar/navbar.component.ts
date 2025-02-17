import { Component, Inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(@Inject(AuthService) private authService: AuthService, @Inject(Router) private router: Router) {}

  logOut(){
    this.authService.logOut()
    .then(()=>{
      this.router.navigate(['/welcome'])
    })
    .catch(error => console.log(error));
  }
}
