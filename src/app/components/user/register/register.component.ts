import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {AdminService} from "../../../services/admin.service";
import {User} from "../../../model/user";
import {Role} from "../../../model/role";
import {District} from "../../../model/district";
import {Router} from "@angular/router";
import {Taluka} from "../../../model/taluka";
import {Nagar} from "../../../model/nagar";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  errorMessage: string;
  districtList: Array<District>;
  roleList = [Role.USER,Role.ADMIN,Role.PRANT,Role.TALUKA,Role.NAGAR];
  selectedDistrict : District;
  talukaList : Array<Taluka>;
  nagarList : Array<Nagar>;

  constructor(private userService: UserService,private adminService: AdminService ,private router: Router) { }

  ngOnInit() {
    this.findAllDistricts();
  }

  register(){
    this.userService.register(this.user).subscribe(data => {
      this.router.navigate(['/login']);
    },err => {
      this.errorMessage = "Username is already exist";
    });
  }


 findAllDistricts(){
    this.adminService.findAllDistricts().subscribe(data => {
      this.districtList = data;
    });
  }

 findTalukaByDistrict(){
    this.adminService.findTalukaByDistrict(this.selectedDistrict).subscribe(data => {
      this.talukaList = data;
    });
  }

 findNagarByDistrict(){
    this.adminService.findNagarByDistrict(this.selectedDistrict).subscribe(data => {
      this.nagarList = data;
    });
  }

  onDistrictChange(){
    this.selectedDistrict=this.user.district;
    this.findTalukaByDistrict();
    this.findNagarByDistrict();
  }

  onRoleChange(){

      this.user.district = null;
      this.user.taluka = null;
      this.user.nagar = null;
      this.talukaList= null;
      this.nagarList = null;  
  }

}
