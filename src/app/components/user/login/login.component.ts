import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service';
import {User} from '../../../model/user';
import {Router} from '@angular/router';
import {Role} from '../../../model/role';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  errorMessage:string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  login(){
    this.userService.login(this.user).subscribe(data => {

      console.log("ROLE");
      console.log(data.role);

      if(data.role==Role.PRANT)
         this.router.navigate(['/prant-dashboard']);
      else if(data.role==Role.USER)
         this.router.navigate(['/district-dashboard']); 
      else if(data.role==Role.TALUKA)
         this.router.navigate(['/entry-list']);        
      else if(data.role==Role.NAGAR)
         this.router.navigate(['/entry-vasti']);        
      else if(data.role==Role.ADMIN)
         this.router.navigate(['/vibhag-list']);

      //this.router.navigate(['/profile']);
    },err => {
      this.errorMessage = "Username or password is incorrect.";
      console.log(err);
    });
  }

}
