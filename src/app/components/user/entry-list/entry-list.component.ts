import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import{ AdminService} from '../../../services/admin.service';
import {Vibhag} from '../../../model/vibhag';
import {District} from '../../../model/district';
import {Taluka} from '../../../model/taluka';
import {Mandal} from '../../../model/mandal';
import {Village} from '../../../model/village';
import {Entry} from '../../../model/entry';
import {User} from '../../../model/user';
import {Role} from '../../../model/role';

declare var $: any;

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {

  vibhagList: Array<Vibhag>;
  entryList: Array<Entry>;
  villageList: Array<Village>;
  mandalList: Array<Mandal>;
  districtList: Array<District>;
  talukaList: Array<Taluka>;
  dataSource: MatTableDataSource<Entry> = new MatTableDataSource();
  displayedColumns: string[] = ['village','mandal','taluka','families','karyakartas', 'date' ,'note','prant' ,'action'];
  selectedEntry: Entry = new Entry();
  errorMessage: string;
  infoMessage: string;
  editMode=false;
  currentUser: User = new User();

  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort: MatSort;

  constructor(private adminService: AdminService) { }

  ngOnInit() {

    this.selectedEntry.vibhag = new Vibhag();
    this.selectedEntry.district = new District();
    this.selectedEntry.taluka = new Taluka();
    
  //  this.findAllVibhags();
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));

    this.findAllEntrys();

    //console.log(this.currentUser);
  }



/*  findAllVibhags(){
    this.adminService.findAllVibhags().subscribe(data => {
      this.vibhagList = data;
    });
  }
*/
/*  findDistrictByVibhag(){
  	console.log(this.selectedEntry.vibhag);
    this.adminService.findDistrictByVibhag(this.selectedEntry.vibhag).subscribe(data => {
      this.districtList = data;
      this.selectedEntry.district = null;
      this.selectedEntry.taluka = null;
      this.selectedEntry.mandal = null;
      this.selectedEntry.village = null;      
	  this.talukaList= null;  
	  this.mandalList = null;
	  this.villageList= null;
    });
//    console.log(this.districtList);
  }
*/

  findTalukaByDistrict()
  {
  	//console.log(this.selectedEntry.vibhag);
    this.adminService.findTalukaByDistrict(this.selectedEntry.district).subscribe(data => {
      this.talukaList = data;
      this.selectedEntry.taluka = null;
      this.selectedEntry.mandal = null;
      this.selectedEntry.village = null;      
  	  this.mandalList = null;
	    this.villageList= null;
    });
//    console.log(this.districtList);
  }

  findMandalByTaluka()
  {
  	//console.log(this.selectedEntry.vibhag);
    this.adminService.findMandalByTaluka(this.selectedEntry.taluka).subscribe(data => {
      this.mandalList = data;
      this.selectedEntry.mandal = null;
      this.selectedEntry.village = null;
   	  this.villageList= null;
    });
//    console.log(this.districtList);
  }

  findVillageByMandal()
  {
    this.adminService.findVillageByMandal(this.selectedEntry.mandal).subscribe(data => {
      this.villageList = data;
      this.selectedEntry.village = null;
    });
  }


  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  findAllEntrys(){
    this.adminService.findEntryByUser(this.currentUser).subscribe(data => {
      this.entryList = data;
      this.dataSource.data = data;
    });
  }

  createNewEntryRequest(){
    this.editMode=false;
    this.selectedEntry = new Entry();
    this.selectedEntry.user = this.currentUser;

    //role USER
    if(this.currentUser.role==Role.USER){

      this.selectedEntry.vibhag =  this.currentUser.district.vibhag;
      this.selectedEntry.district =  this.currentUser.district;
      this.selectedEntry.taluka = new Taluka();
      this.selectedEntry.mandal = new Mandal();
      this.selectedEntry.village = new Village();
      this.selectedEntry.prant="DVG";
      this.districtList = null;
      this.mandalList = null;
      this.villageList = null;
      this.findTalukaByDistrict();

    }
    //role TALUKA
    else if(this.currentUser.role==Role.TALUKA){

      this.selectedEntry.vibhag =  this.currentUser.taluka.vibhag;
      this.selectedEntry.district =  this.currentUser.taluka.district;
      this.selectedEntry.taluka = this.currentUser.taluka;
      this.selectedEntry.mandal = new Mandal();
      this.selectedEntry.village = new Village();
      this.selectedEntry.prant="DVG";
      this.findMandalByTaluka();
      this.villageList = null;      
    }




    $('#entryModal').modal('show');
  }

  editEntryRequest(entry: Entry){
    this.selectedEntry=Object.assign({}, entry);
    //this.selectedEntry = entry;
    //this.selectedEntry.vibhag= entry.vibhag;
    //console.log(this.selectedEntry.vibhag);
    /*this.selectedEntry.vibhag = this.vibhagList.find((vibhag)=>{
    		return vibhag.id===this.selectedEntry.vibhag.id;
    });
    */
    /*
    this.adminService.findDistrictByVibhag(this.selectedEntry.vibhag).subscribe(data => {
      this.districtList = data;

    this.selectedEntry.district = this.districtList.find((district)=>{
    		return district.id===this.selectedEntry.district.id;
    });

    });
    */

    /*this.adminService.findTalukaByDistrict(this.selectedEntry.district).subscribe(data => {
      this.talukaList = data;

    this.selectedEntry.taluka = this.talukaList.find((taluka)=>{
    		return taluka.id===this.selectedEntry.taluka.id;
    });

    });
    */

    this.adminService.findMandalByTaluka(this.selectedEntry.taluka).subscribe(data => {
      this.mandalList = data;

    this.selectedEntry.mandal = this.mandalList.find((mandal)=>{
    		return mandal.id===this.selectedEntry.mandal.id;
    });

    });

    this.adminService.findVillageByMandal(this.selectedEntry.mandal).subscribe(data => {
      this.villageList = data;

    this.selectedEntry.village = this.villageList.find((village)=>{
    		return village.id===this.selectedEntry.village.id;
    });

    });


    /*this.adminService.findEntryByVibhag(this.selectedEntry.vibhag).subscribe((data)=>{
    	console.log(data);
    });
	*/

    $('#entryModal').modal('show');
    this.editMode=true;
  }

  saveEntry(){
  	//console.log("id");
  	//console.log(this.selectedEntry.id);
    if(!this.editMode){
      this.createEntry();
    }else{
      this.updateEntry();
    }
  }

  createEntry(){
    $('#entryModal').modal('hide');
    this.adminService.createEntry(this.selectedEntry).subscribe(data => {
      console.log(this.selectedEntry.date);
      console.log("Created!!!");	
      console.log(data);
      console.log(data.date);
      this.entryList.push(data);
      this.dataSource = new MatTableDataSource(this.entryList);
      this.dataSource.paginator= this.paginator;
      this.dataSource.sort= this.sort;
      //this.adminService.findAllEntrys().subscribe(data => {
      //this.entryList = data;
      //this.dataSource.data = data;
	   
	  //});

      this.infoMessage = "Done";
      
    },err => {
      this.errorMessage = "Unexpected error occurred.";
    });
  }

  updateEntry(){

      $('#entryModal').modal('hide');

    this.adminService.updateEntry(this.selectedEntry).subscribe(data => {
      
     // console.log("Updated!!!");
      let itemIndex = this.entryList.findIndex(item => item.id == this.selectedEntry.id);
      this.entryList[itemIndex] = this.selectedEntry;
      this.dataSource = new MatTableDataSource(this.entryList);
      this.dataSource.paginator= this.paginator;
      this.dataSource.sort= this.sort;
      this.infoMessage = "Done Edit!";
      this.editMode=false;

    },err => {
      this.errorMessage = "Unexpected error occurred.";
    });
  }

  deleteEntryRequest(entry: Entry){
    this.selectedEntry = entry;
    $('#deleteModal').modal('show');
  }

  deleteEntry(){
    this.adminService.deleteEntry(this.selectedEntry).subscribe(data => {
      let itemIndex = this.entryList.findIndex(item => item.id == this.selectedEntry.id);
      if(itemIndex !== -1){
        this.entryList.splice(itemIndex, 1);
      }
      this.dataSource = new MatTableDataSource(this.entryList);
      this.infoMessage = "Done";
      $('#deleteModal').modal('hide');
    },err => {
      this.errorMessage = "Unexpected error occurred.";
    });
  }


}
