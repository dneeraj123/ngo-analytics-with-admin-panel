import {Vibhag} from './vibhag';
import {District} from './district';
import {Nagar} from './nagar';
import {Vasti} from './vasti';
import {User} from './user';

export class EntryVasti {
  id: number;
  user: User;
  prant: string;
  vibhag: Vibhag;
  district: District;
  nagar: Nagar;
  vasti: Vasti;
  families: number;
  karyakartas : number;
  date : any;
  note : string;
}

