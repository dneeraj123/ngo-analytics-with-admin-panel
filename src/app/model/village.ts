import {Vibhag} from './vibhag';
import {District} from './district';
import {Taluka} from './taluka';
import {Mandal} from './mandal';

export class Village {
  id: string;
  name: string;
  vibhag: Vibhag;
  district: District;
  taluka: Taluka;
  mandal: Mandal;
  prant: string;
}

