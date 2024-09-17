import {Vibhag} from './vibhag';
import {District} from './district';
import {Taluka} from './taluka';
import {Mandal} from './mandal';
import {Village} from './village';
import {User} from './user';

export class Entry {
  id: number;
  user: User;
  prant: string;
  vibhag: Vibhag;
  district: District;
  taluka: Taluka;
  mandal: Mandal;
  village: Village;
  families: number;
  karyakartas : number;
  date : any;
  note : string;
}

