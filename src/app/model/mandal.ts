import {Vibhag} from './vibhag';
import {District} from './district';
import {Taluka} from './taluka';

export class Mandal {
  id: string;
  name: string;
  vibhag: Vibhag;
  district: District;
  taluka: Taluka;
  prant: string;
}

