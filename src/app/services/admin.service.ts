import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../model/user';
import {Product} from '../model/product';
import {Vibhag} from '../model/vibhag';
import {District} from '../model/district';
import {Taluka} from '../model/taluka';
import {Mandal} from '../model/mandal';
import {Village} from '../model/village';
import {Entry} from '../model/entry';
import {Nagar} from '../model/nagar';
import {Vasti} from '../model/vasti';
import {EntryVasti} from '../model/entry-vasti';


import {Transaction} from '../model/transaction';

let API_URL = "http://localhost:5000/api/admin/";


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  currentUser: User;
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.headers = new HttpHeaders({
      //authorization:'Bearer ' + this.currentUser.token,
      "Content-Type":"application/json; charset=UTF-8"
    });
  }

  updateUser(user: User): Observable<any> {
    return this.http.put(API_URL + "user-update", JSON.stringify(user),
  {headers: this.headers});
  }

  deleteUser(user: User): Observable<any> {
    return this.http.post(API_URL + "user-delete", JSON.stringify(user),
  {headers: this.headers});
  }

  findAllUsers(): Observable<any> {
    return this.http.get(API_URL + "user-all",
  {headers: this.headers});
  }

  numberOfUsers(): Observable<any> {
    return this.http.get(API_URL + "user-number",
  {headers: this.headers});
  }

  //products
  createProduct(product: Product): Observable<any> {
    return this.http.post(API_URL + "product-create", JSON.stringify(product),
  {headers: this.headers});
  }

  updateProduct(product: Product): Observable<any> {
    return this.http.put(API_URL + "product-update", JSON.stringify(product),
  {headers: this.headers});
  }

  deleteProduct(product: Product): Observable<any> {
    return this.http.post(API_URL + "product-delete", JSON.stringify(product),
  {headers: this.headers});
  }

  findAllProducts(): Observable<any> {
    return this.http.get(API_URL + "product-all",
  {headers: this.headers});
  }

  numberOfProducts(): Observable<any> {
    return this.http.get(API_URL + "product-number",
  {headers: this.headers});
  }


  //transactions
  findAllTransactions(): Observable<any> {
    return this.http.get(API_URL + "transaction-all",
   {headers: this.headers});
  }

  numberOfTransactions(): Observable<any> {
    return this.http.get(API_URL + "transaction-number",
  {headers: this.headers});
  }

  //vibhags

  createVibhag(vibhag: Vibhag): Observable<any> {
    return this.http.post(API_URL + "vibhag-create", JSON.stringify(vibhag),
  {headers: this.headers});
  }

  updateVibhag(vibhag: Vibhag): Observable<any> {
    return this.http.put(API_URL + "vibhag-update", JSON.stringify(vibhag),
  {headers: this.headers});
  }

  deleteVibhag(vibhag: Vibhag): Observable<any> {
    return this.http.post(API_URL + "vibhag-delete", JSON.stringify(vibhag),
  {headers: this.headers});
  }

  findAllVibhags(): Observable<any> {
    return this.http.get(API_URL + "vibhag-all",
  {headers: this.headers});
  }

  numberOfVibhags(): Observable<any> {
    return this.http.get(API_URL + "vibhag-number",
  {headers: this.headers});
  }

  //districts

  createDistrict(district: District): Observable<any> {
    return this.http.post(API_URL + "district-create", JSON.stringify(district),
  {headers: this.headers});
  }

  updateDistrict(district: District): Observable<any> {
    return this.http.put(API_URL + "district-update", JSON.stringify(district),
  {headers: this.headers});
  }

  deleteDistrict(district: District): Observable<any> {
    return this.http.post(API_URL + "district-delete", JSON.stringify(district),
  {headers: this.headers});
  }

  findAllDistricts(): Observable<any> {
    return this.http.get(API_URL + "district-all",
  {headers: this.headers});
  }

  findDistrictByVibhag(vibhag : Vibhag): Observable<any> {
    return this.http.post(API_URL + "district-vibhag", JSON.stringify(vibhag),  
  {headers: this.headers });
  
  }


  numberOfDistricts(): Observable<any> {
    return this.http.get(API_URL + "district-number",
  {headers: this.headers});
  }

  //talukas

  createTaluka(taluka: Taluka): Observable<any> {
    return this.http.post(API_URL + "taluka-create", JSON.stringify(taluka),
  {headers: this.headers});
  }

  updateTaluka(taluka: Taluka): Observable<any> {
    return this.http.put(API_URL + "taluka-update", JSON.stringify(taluka),
  {headers: this.headers});
  }

  deleteTaluka(taluka: Taluka): Observable<any> {
    return this.http.post(API_URL + "taluka-delete", JSON.stringify(taluka),
  {headers: this.headers});
  }

  findAllTalukas(): Observable<any> {
    return this.http.get(API_URL + "taluka-all",
  {headers: this.headers});
  }

  findTalukaByVibhag(vibhag : Vibhag): Observable<any> {
    return this.http.post(API_URL + "taluka-vibhag", JSON.stringify(vibhag),  
  {headers: this.headers });
  
  }

  findTalukaByDistrict(district : District): Observable<any> {
    return this.http.post(API_URL + "taluka-district", JSON.stringify(district),  
  {headers: this.headers });
  
  }


  numberOfTalukas(): Observable<any> {
    return this.http.get(API_URL + "taluka-number",
  {headers: this.headers});
  }


  //nagars

  createNagar(nagar: Nagar): Observable<any> {
    return this.http.post(API_URL + "nagar-create", JSON.stringify(nagar),
  {headers: this.headers});
  }

  updateNagar(nagar: Nagar): Observable<any> {
    return this.http.put(API_URL + "nagar-update", JSON.stringify(nagar),
  {headers: this.headers});
  }

  deleteNagar(nagar: Nagar): Observable<any> {
    return this.http.post(API_URL + "nagar-delete", JSON.stringify(nagar),
  {headers: this.headers});
  }

  findAllNagars(): Observable<any> {
    return this.http.get(API_URL + "nagar-all",
  {headers: this.headers});
  }

  findNagarByVibhag(vibhag : Vibhag): Observable<any> {
    return this.http.post(API_URL + "nagar-vibhag", JSON.stringify(vibhag),  
  {headers: this.headers });
  
  }

  findNagarByDistrict(district : District): Observable<any> {
    return this.http.post(API_URL + "nagar-district", JSON.stringify(district),  
  {headers: this.headers });
  
  }


  numberOfNagars(): Observable<any> {
    return this.http.get(API_URL + "nagar-number",
  {headers: this.headers});
  }





  //mandals

  createMandal(mandal: Mandal): Observable<any> {
    return this.http.post(API_URL + "mandal-create", JSON.stringify(mandal),
  {headers: this.headers});
  }

  updateMandal(mandal: Mandal): Observable<any> {
    return this.http.put(API_URL + "mandal-update", JSON.stringify(mandal),
  {headers: this.headers});
  }

  deleteMandal(mandal: Mandal): Observable<any> {
    return this.http.post(API_URL + "mandal-delete", JSON.stringify(mandal),
  {headers: this.headers});
  }

  findAllMandals(): Observable<any> {
    return this.http.get(API_URL + "mandal-all",
  {headers: this.headers});
  }

  findMandalByVibhag(vibhag : Vibhag): Observable<any> {
    return this.http.post(API_URL + "mandal-vibhag", JSON.stringify(vibhag),  
  {headers: this.headers });
  
  }

  findMandalByDistrict(district : District): Observable<any> {
    return this.http.post(API_URL + "mandal-district", JSON.stringify(district),  
  {headers: this.headers });
  
  }

  findMandalByTaluka(taluka : Taluka): Observable<any> {
    return this.http.post(API_URL + "mandal-taluka", JSON.stringify(taluka),  
  {headers: this.headers });
  
  }

  numberOfMandals(): Observable<any> {
    return this.http.get(API_URL + "mandal-number",
  {headers: this.headers});
  }


  //vastis

  createVasti(vasti: Vasti): Observable<any> {
    return this.http.post(API_URL + "vasti-create", JSON.stringify(vasti),
  {headers: this.headers});
  }

  updateVasti(vasti: Vasti): Observable<any> {
    return this.http.put(API_URL + "vasti-update", JSON.stringify(vasti),
  {headers: this.headers});
  }

  deleteVasti(vasti: Vasti): Observable<any> {
    return this.http.post(API_URL + "vasti-delete", JSON.stringify(vasti),
  {headers: this.headers});
  }

  findAllVastis(): Observable<any> {
    return this.http.get(API_URL + "vasti-all",
  {headers: this.headers});
  }

  findVastiByVibhag(vibhag : Vibhag): Observable<any> {
    return this.http.post(API_URL + "vasti-vibhag", JSON.stringify(vibhag),  
  {headers: this.headers });
  
  }

  findVastiByDistrict(district : District): Observable<any> {
    return this.http.post(API_URL + "vasti-district", JSON.stringify(district),  
  {headers: this.headers });
  
  }

  findVastiByNagar(nagar : Nagar): Observable<any> {
    return this.http.post(API_URL + "vasti-nagar", JSON.stringify(nagar),  
  {headers: this.headers });
  
  }

  numberOfVastis(): Observable<any> {
    return this.http.get(API_URL + "vasti-number",
  {headers: this.headers});
  }



  //villages

  createVillage(village: Village): Observable<any> {
    return this.http.post(API_URL + "village-create", JSON.stringify(village),
  {headers: this.headers});
  }

  updateVillage(village: Village): Observable<any> {
    return this.http.put(API_URL + "village-update", JSON.stringify(village),
  {headers: this.headers});
  }

  deleteVillage(village: Village): Observable<any> {
    return this.http.post(API_URL + "village-delete", JSON.stringify(village),
  {headers: this.headers});
  }

  findAllVillages(): Observable<any> {
    return this.http.get(API_URL + "village-all",
  {headers: this.headers});
  }

  findVillageByVibhag(vibhag : Vibhag): Observable<any> {
    return this.http.post(API_URL + "village-vibhag", JSON.stringify(vibhag),  
  {headers: this.headers });
  
  }

  findVillageByDistrict(district : District): Observable<any> {
    return this.http.post(API_URL + "village-district", JSON.stringify(district),  
  {headers: this.headers });
  
  }

  findVillageByTaluka(taluka : Taluka): Observable<any> {
    return this.http.post(API_URL + "village-taluka", JSON.stringify(taluka),  
  {headers: this.headers });
  
  }

  findVillageByMandal(mandal: Mandal): Observable<any> {
    return this.http.post(API_URL + "village-mandal", JSON.stringify(mandal),  
  {headers: this.headers });
  
  }


  numberOfVillages(): Observable<any> {
    return this.http.get(API_URL + "village-number",
  {headers: this.headers});
  }


  //entrys

  createEntry(entry: Entry): Observable<any> {
    return this.http.post(API_URL + "entry-create", JSON.stringify(entry),
  {headers: this.headers});
  }

  updateEntry(entry: Entry): Observable<any> {
    return this.http.put(API_URL + "entry-update", JSON.stringify(entry),
  {headers: this.headers});
  }

  deleteEntry(entry: Entry): Observable<any> {
    return this.http.post(API_URL + "entry-delete", JSON.stringify(entry),
  {headers: this.headers});
  }

  findAllEntrys(): Observable<any> {
    return this.http.get(API_URL + "entry-all",
  {headers: this.headers});
  }

  findEntryByVibhag(vibhag : Vibhag): Observable<any> {
    return this.http.post(API_URL + "entry-vibhag", JSON.stringify(vibhag),  
  {headers: this.headers });
  
  }

  findEntryByDistrict(district : District): Observable<any> {
    return this.http.post(API_URL + "entry-district", JSON.stringify(district),  
  {headers: this.headers });
  
  }

  findEntryByTaluka(taluka : Taluka): Observable<any> {
    return this.http.post(API_URL + "entry-taluka", JSON.stringify(taluka),  
  {headers: this.headers });
  
  }

  findEntryByMandal(mandal: Mandal): Observable<any> {
    return this.http.post(API_URL + "entry-mandal", JSON.stringify(mandal),  
  {headers: this.headers });
  
  }

  findEntryByUser(user: User): Observable<any> {
    return this.http.post(API_URL + "entry-user", JSON.stringify(user),  
  {headers: this.headers });
  
  }

  numberOfEntrys(): Observable<any> {
    return this.http.get(API_URL + "entry-number",
  {headers: this.headers});
  }


  findCoveredVillages(): Observable<any> {
    return this.http.get(API_URL + "entry-covered-villages",
  {headers: this.headers});
  }

  findCoveredVillagesPerDistrict(districtId : string): Observable<any> {
    return this.http.get(API_URL + "covered-villages-per-each-district",
  {headers: this.headers,params:{districtId:districtId}});
  }

  coveredVillagesPerDistrict(): Observable<any> {
    return this.http.get(API_URL + "covered-villages-per-district",
  {headers: this.headers});
  }  


  findCoveredMandals(): Observable<any> {
    return this.http.get(API_URL + "entry-covered-mandals",
  {headers: this.headers});
  }

  findCoveredMandalsPerDistrict(districtId : string): Observable<any> {
    return this.http.get(API_URL + "covered-mandals-per-each-district",
  {headers: this.headers,params:{districtId:districtId}});
  }

  coveredMandalsPerDistrict(): Observable<any> {
    return this.http.get(API_URL + "covered-mandals-per-district",
  {headers: this.headers});
  }  




  villagesPerDistrict(): Observable<any> {
    return this.http.get(API_URL + "villages-per-district",
  {headers: this.headers});
  }


  findFamiliesReachedPerDistrict(districtId : string): Observable<any> {
    return this.http.get(API_URL + "families-reached-per-each-district",
  {headers: this.headers,params:{districtId:districtId}});
  }

  findKaryakartasParticipatedPerDistrict(districtId : string): Observable<any> {
    return this.http.get(API_URL + "karya-karta-per-each-district",
  {headers: this.headers,params:{districtId:districtId}});
  }


  //entryvasti
  createEntryVasti(entryvasti: EntryVasti): Observable<any> {
    return this.http.post(API_URL + "entryvasti-create", JSON.stringify(entryvasti),
  {headers: this.headers});
  }

  updateEntryVasti(entryvasti: EntryVasti): Observable<any> {
    return this.http.put(API_URL + "entryvasti-update", JSON.stringify(entryvasti),
  {headers: this.headers});
  }

  deleteEntryVasti(entryvasti: EntryVasti): Observable<any> {
    return this.http.post(API_URL + "entryvasti-delete", JSON.stringify(entryvasti),
  {headers: this.headers});
  }

  findAllEntryVastis(): Observable<any> {
    return this.http.get(API_URL + "entryvasti-all",
  {headers: this.headers});
  }

  findEntryVastiByVibhag(vibhag : Vibhag): Observable<any> {
    return this.http.post(API_URL + "entryvasti-vibhag", JSON.stringify(vibhag),  
  {headers: this.headers });
  
  }

  findEntryVastiByDistrict(district : District): Observable<any> {
    return this.http.post(API_URL + "entryvasti-district", JSON.stringify(district),  
  {headers: this.headers });
  
  }

  findEntryVastiByNagar(nagar : Nagar): Observable<any> {
    return this.http.post(API_URL + "entryvasti-nagar", JSON.stringify(nagar),  
  {headers: this.headers });
  
  }

/*  findEntryVastiByVasti(vasti: Vasti): Observable<any> {
    return this.http.post(API_URL + "entryvasti-vasti", JSON.stringify(vasti),  
  {headers: this.headers });
  
  }
*/

  findEntryVastiByUser(user: User): Observable<any> {
    return this.http.post(API_URL + "entryvasti-user", JSON.stringify(user),  
  {headers: this.headers });
  
  }

  numberOfEntryVastis(): Observable<any> {
    return this.http.get(API_URL + "entryvasti-number",
  {headers: this.headers});
  }

  vastisPerDistrict(): Observable<any> {
    return this.http.get(API_URL + "vastis-per-district",
  {headers: this.headers});
  }

  //covered vastis
  findCoveredVastis(): Observable<any> {
    return this.http.get(API_URL + "entry-covered-vastis",
  {headers: this.headers});
  }

  findCoveredVastisPerDistrict(districtId : string): Observable<any> {
    return this.http.get(API_URL + "covered-vastis-per-each-district",
  {headers: this.headers,params:{districtId:districtId}});
  }

  coveredVastisPerDistrict(): Observable<any> {
    return this.http.get(API_URL + "covered-vastis-per-district",
  {headers: this.headers});
  }  

  findFamiliesReachedVastiPerDistrict(districtId : string): Observable<any> {
    return this.http.get(API_URL + "families-reached-vasti-per-each-district",
  {headers: this.headers,params:{districtId:districtId}});
  }

  findKaryakartasParticipatedVastiPerDistrict(districtId : string): Observable<any> {
    return this.http.get(API_URL + "karya-karta-vasti-per-each-district",
  {headers: this.headers,params:{districtId:districtId}});
  }


  //covered nagars
  findCoveredNagars(): Observable<any> {
    return this.http.get(API_URL + "entry-covered-nagars",
  {headers: this.headers});
  }

  findCoveredNagarsPerDistrict(districtId : string): Observable<any> {
    return this.http.get(API_URL + "covered-nagars-per-each-district",
  {headers: this.headers,params:{districtId:districtId}});
  }

  coveredNagarsPerDistrict(): Observable<any> {
    return this.http.get(API_URL + "covered-nagars-per-district",
  {headers: this.headers});
  }  

  //for timeline chart
  findFamiliesPerDayVillage(districtId : string): Observable<any> {
    return this.http.get(API_URL + "families-per-day-village",
  {headers: this.headers,params:{districtId:districtId}});
  }

  findFamiliesPerDayVasti(districtId : string): Observable<any> {
    return this.http.get(API_URL + "families-per-day-vasti",
  {headers: this.headers,params:{districtId:districtId}});
  }


  findVillagesCoveredPerTaluka(talukaId : string): Observable<any> {
    return this.http.get(API_URL + "covered-villages-per-each-taluka",
  {headers: this.headers,params:{talukaId:talukaId}});
  }


  dateWiseTaluka(date:string,districtId : string): Observable<any> {
    return this.http.get(API_URL + "date-taluka",
  {headers: this.headers,params:{date:date,districtId:districtId}});
  }


  findVastisCoveredPerNagar(nagarId : string): Observable<any> {
    return this.http.get(API_URL + "covered-vastis-per-each-nagar",
  {headers: this.headers,params:{nagarId:nagarId}});
  }


  dateWiseNagar(date:string,districtId : string): Observable<any> {
    return this.http.get(API_URL + "date-nagar",
  {headers: this.headers,params:{date:date,districtId:districtId}});
  }

  talukaWise(districtId : string): Observable<any> {
    return this.http.get(API_URL + "taluka-wise",
  {headers: this.headers,params:{districtId:districtId}});
  }

  nagarWise(districtId : string): Observable<any> {
    return this.http.get(API_URL + "nagar-wise",
  {headers: this.headers,params:{districtId:districtId}});
  }


  districtWiseVillage() : Observable<any> {
    return this.http.get(API_URL + "district-wise-village",
  {headers: this.headers});
  }

  districtWiseVasti() : Observable<any> {
    return this.http.get(API_URL + "district-wise-vasti",
  {headers: this.headers});
  }


}
