import {Role} from './role';
import {District} from './district';
import {Taluka} from './taluka';
import {Nagar} from './nagar';

export class User {
  id: number;
  name: string;
  username: string="";
  password: string="";
  role: Role;
  district: District;
  taluka : Taluka;
  nagar: Nagar;
  //token: string="";
}
