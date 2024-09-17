import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import{ AdminService} from '../../../services/admin.service';
import {Vibhag} from '../../../model/vibhag';
import {District} from '../../../model/district';
import {Taluka} from '../../../model/taluka';
import {Nagar} from '../../../model/nagar';
import {Vasti} from '../../../model/vasti';
import {EntryVasti} from '../../../model/entry-vasti';
import {User} from '../../../model/user';
import {Role} from '../../../model/role';

declare var $: any;

@Component({
  selector: 'app-entry-vasti',
  templateUrl: './entry-vasti.component.html',
  styleUrls: ['./entry-vasti.component.css']
})
export class EntryVastiComponent implements OnInit {

  vibhagList: Array<Vibhag>;
  entryList: Array<EntryVasti>;
  vastiList: Array<Vasti>;
  nagarList: Array<Nagar>;
  districtList: Array<District>;
//  talukaList: Array<Taluka>;
  dataSource: MatTableDataSource<EntryVasti> = new MatTableDataSource();
  displayedColumns: string[] = ['vasti','nagar','families','karyakartas', 'date' ,'note','prant' ,'action'];
  selectedEntryVasti: EntryVasti = new EntryVasti();
  errorMessage: string;
  infoMessage: string;
  editMode=false;
  currentUser: User = new User();

  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort: MatSort;

  constructor(private adminService: AdminService) { }

  ngOnInit() {

    this.selectedEntryVasti.vibhag = new Vibhag();
    this.selectedEntryVasti.district = new District();
    this.selectedEntryVasti.nagar = new Nagar();
    
  //  this.findAllVibhags();
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));

    this.findAllEntryVastis();

   // console.log(this.currentUser);
  }



/*  findAllVibhags(){
    this.adminService.findAllVibhags().subscribe(data => {
      this.vibhagList = data;
    });
  }
*/
/*  findDistrictByVibhag(){
  	console.log(this.selectedEntryVasti.vibhag);
    this.adminService.findDistrictByVibhag(this.selectedEntryVasti.vibhag).subscribe(data => {
      this.districtList = data;
      this.selectedEntryVasti.district = null;
      this.selectedEntryVasti.taluka = null;
      this.selectedEntryVasti.mandal = null;
      this.selectedEntryVasti.village = null;      
	  this.talukaList= null;  
	  this.mandalList = null;
	  this.villageList= null;
    });
//    console.log(this.districtList);
  }
*/

  findNagarByDistrict()
  {
  	//console.log(this.selectedEntryVasti.vibhag);
    this.adminService.findNagarByDistrict(this.selectedEntryVasti.district).subscribe(data => {
      this.nagarList = data;
      this.selectedEntryVasti.nagar = null;
      this.selectedEntryVasti.vasti = null;      
  	  this.vastiList = null;
    });
//    console.log(this.districtList);
  }

  findVastiByNagar()
  {
  	//console.log(this.selectedEntryVasti.vibhag);
    this.adminService.findVastiByNagar(this.selectedEntryVasti.nagar).subscribe(data => {
      this.vastiList = data;
      this.selectedEntryVasti.vasti = null;
    });
//    console.log(this.districtList);
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  findAllEntryVastis(){
    this.adminService.findEntryVastiByUser(this.currentUser).subscribe(data => {
      this.entryList = data;
      this.dataSource.data = data;
    });
  }

  createNewEntryVastiRequest(){
    this.editMode=false;
    this.selectedEntryVasti = new EntryVasti();
    this.selectedEntryVasti.user = this.currentUser;

    if(this.currentUser.role==Role.USER){
      this.selectedEntryVasti.vibhag =  this.currentUser.district.vibhag;
      this.selectedEntryVasti.district =  this.currentUser.district;
      this.selectedEntryVasti.nagar = new Nagar();
      this.selectedEntryVasti.vasti = new Vasti();    
      this.selectedEntryVasti.prant="DVG";
      this.districtList = null;
      this.nagarList = null;
      this.vastiList = null;
      this.findNagarByDistrict();
    }
    else if(this.currentUser.role==Role.NAGAR){
      this.selectedEntryVasti.vibhag =  this.currentUser.district.vibhag;
      this.selectedEntryVasti.district =  this.currentUser.district;
      this.selectedEntryVasti.nagar = this.currentUser.nagar;
      this.selectedEntryVasti.vasti = new Vasti();    
      this.selectedEntryVasti.prant="DVG";
      this.vastiList = null;
      this.findVastiByNagar();
    }


    $('#entryVastiModal').modal('show');
  }

  editEntryVastiRequest(entry: EntryVasti){
    this.selectedEntryVasti=Object.assign({}, entry);

    /*this.adminService.findNagarByDistrict(this.selectedEntryVasti.district).subscribe(data => {
      this.nagarList = data;

    this.selectedEntryVasti.nagar = this.nagarList.find((nagar)=>{
    		return nagar.id===this.selectedEntryVasti.nagar.id;
    });

    });
    */

    this.adminService.findVastiByNagar(this.selectedEntryVasti.nagar).subscribe(data => {
      this.vastiList = data;

    this.selectedEntryVasti.vasti = this.vastiList.find((vasti)=>{
    		return vasti.id===this.selectedEntryVasti.vasti.id;
    });

    });

    $('#entryVastiModal').modal('show');
    this.editMode=true;
  }

  saveEntryVasti(){
  	//console.log("id");
  	//console.log(this.selectedEntryVasti.id);
    if(!this.editMode){
      this.createEntryVasti();
    }else{
      this.updateEntryVasti();
    }
  }

  createEntryVasti(){
    $('#entryVastiModal').modal('hide');
    this.adminService.createEntryVasti(this.selectedEntryVasti).subscribe(data => {
      //console.log("Created!!!");	
      //console.log(data);
      this.entryList.push(data);
      this.dataSource = new MatTableDataSource(this.entryList);
      this.dataSource.paginator= this.paginator;
      this.dataSource.sort= this.sort;

      //this.adminService.findAllEntryVastis().subscribe(data => {
      //this.entryList = data;
      //this.dataSource.data = data;
	   
	  //});

      this.infoMessage = "Done";
      
    },err => {
      this.errorMessage = "Unexpected error occurred.";
    });
  }

  updateEntryVasti(){

      $('#entryVastiModal').modal('hide');

    this.adminService.updateEntryVasti(this.selectedEntryVasti).subscribe(data => {
      
      //console.log("Updated!!!");
      let itemIndex = this.entryList.findIndex(item => item.id == this.selectedEntryVasti.id);
      this.entryList[itemIndex] = this.selectedEntryVasti;
      this.dataSource = new MatTableDataSource(this.entryList);
      this.dataSource.paginator= this.paginator;
      this.dataSource.sort= this.sort;
      this.infoMessage = "Done Edit!";
      this.editMode=false;

    },err => {
      this.errorMessage = "Unexpected error occurred.";
    });
  }

  deleteEntryVastiRequest(entry: EntryVasti){
    this.selectedEntryVasti = entry;
    $('#deleteModal').modal('show');
  }

  deleteEntryVasti(){
    this.adminService.deleteEntryVasti(this.selectedEntryVasti).subscribe(data => {
      let itemIndex = this.entryList.findIndex(item => item.id == this.selectedEntryVasti.id);
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
