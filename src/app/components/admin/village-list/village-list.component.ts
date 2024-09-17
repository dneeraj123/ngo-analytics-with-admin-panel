import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import{ AdminService} from '../../../services/admin.service';
import {Vibhag} from '../../../model/vibhag';
import {District} from '../../../model/district';
import {Taluka} from '../../../model/taluka';
import {Mandal} from '../../../model/mandal';
import {Village} from '../../../model/village';

declare var $: any;

@Component({
  selector: 'app-village-list',
  templateUrl: './village-list.component.html',
  styleUrls: ['./village-list.component.css']
})
export class VillageListComponent implements OnInit {

  vibhagList: Array<Vibhag>;
  villageList: Array<Village>;
  mandalList: Array<Mandal>;
  districtList: Array<District>;
  talukaList: Array<Taluka>;
  dataSource: MatTableDataSource<Village> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'name','mandal','taluka','district','vibhag', 'prant' ,'action'];
  selectedVillage: Village = new Village();
  errorMessage: string;
  infoMessage: string;
  editMode=false;

  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort: MatSort;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.findAllVillages();
    this.findAllVibhags();

  }



  findAllVibhags(){
    this.adminService.findAllVibhags().subscribe(data => {
      this.vibhagList = data;
    });
  }

  findDistrictByVibhag(){
  	console.log(this.selectedVillage.vibhag);
    this.adminService.findDistrictByVibhag(this.selectedVillage.vibhag).subscribe(data => {
      this.districtList = data;
      this.selectedVillage.district = null;
      this.selectedVillage.taluka = null;
      this.selectedVillage.mandal = null;      
	  this.talukaList= null;  
	  this.mandalList = null;
    });
//    console.log(this.districtList);
  }

  findTalukaByDistrict()
  {
  	//console.log(this.selectedVillage.vibhag);
    this.adminService.findTalukaByDistrict(this.selectedVillage.district).subscribe(data => {
      this.talukaList = data;
      this.selectedVillage.taluka = null;
      this.selectedVillage.mandal = null;
      this.mandalList = null;
    });
//    console.log(this.districtList);
  }

  findMandalByTaluka()
  {
  	//console.log(this.selectedVillage.vibhag);
    this.adminService.findMandalByTaluka(this.selectedVillage.taluka).subscribe(data => {
      this.mandalList = data;
      this.selectedVillage.mandal = null;
    });
//    console.log(this.districtList);
  }


  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  findAllVillages(){
    this.adminService.findAllVillages().subscribe(data => {
      this.villageList = data;
      this.dataSource.data = data;
    });
  }

  createNewVillageRequest(){
    this.editMode=false;
    this.selectedVillage = new Village();
    this.selectedVillage.vibhag =  new Vibhag();
    this.selectedVillage.district =  new District();
    this.selectedVillage.taluka = new Taluka();
    this.selectedVillage.mandal = new Mandal();
    this.selectedVillage.prant="DVG";
    this.districtList = null;
    this.talukaList= null;
    this.mandalList = null;

    $('#villageModal').modal('show');
  }

  editVillageRequest(village: Village){
    this.selectedVillage=Object.assign({}, village);
    //this.selectedVillage = village;
    //this.selectedVillage.vibhag= village.vibhag;
    //console.log(this.selectedVillage.vibhag);
    this.selectedVillage.vibhag = this.vibhagList.find((vibhag)=>{
    		return vibhag.id===this.selectedVillage.vibhag.id;
    });

    this.adminService.findDistrictByVibhag(this.selectedVillage.vibhag).subscribe(data => {
      this.districtList = data;

    this.selectedVillage.district = this.districtList.find((district)=>{
    		return district.id===this.selectedVillage.district.id;
    });

    });

    this.adminService.findTalukaByDistrict(this.selectedVillage.district).subscribe(data => {
      this.talukaList = data;

    this.selectedVillage.taluka = this.talukaList.find((taluka)=>{
    		return taluka.id===this.selectedVillage.taluka.id;
    });

    });

    this.adminService.findMandalByTaluka(this.selectedVillage.taluka).subscribe(data => {
      this.mandalList = data;

    this.selectedVillage.mandal = this.mandalList.find((mandal)=>{
    		return mandal.id===this.selectedVillage.mandal.id;
    });

    });




    /*this.adminService.findVillageByVibhag(this.selectedVillage.vibhag).subscribe((data)=>{
    	console.log(data);
    });
	*/

    $('#villageModal').modal('show');
    this.editMode=true;
  }

  saveVillage(){
  	//console.log("id");
  	//console.log(this.selectedVillage.id);
    if(!this.editMode){
      this.createVillage();
    }else{
      this.updateVillage();
    }
  }

  createVillage(){

    $('#villageModal').modal('hide');

    this.adminService.createVillage(this.selectedVillage).subscribe(data => {
      console.log("Created!!!");	
      console.log(data);
      this.villageList.push(data);
      this.dataSource = new MatTableDataSource(this.villageList);

      //this.adminService.findAllVillages().subscribe(data => {
      //this.villageList = data;
      //this.dataSource.data = data;
	   
	  //});

      this.infoMessage = "Done";
    },err => {
      this.errorMessage = "Unexpected error occurred.";
      console.log(this.errorMessage);
    });
  }

  updateVillage(){
    
    $('#villageModal').modal('hide');

    this.adminService.updateVillage(this.selectedVillage).subscribe(data => {
      
      console.log("Updated!!!");
      let itemIndex = this.villageList.findIndex(item => item.id == this.selectedVillage.id);
      this.villageList[itemIndex] = this.selectedVillage;
      this.dataSource = new MatTableDataSource(this.villageList);
      this.infoMessage = "Done is completed";
      this.editMode=false;
    
    },err => {
      this.errorMessage = "Unexpected error occurred.";
    });
  }

  deleteVillageRequest(village: Village){
    this.selectedVillage = village;
    $('#deleteModal').modal('show');
  }

  deleteVillage(){
    this.adminService.deleteVillage(this.selectedVillage).subscribe(data => {
      let itemIndex = this.villageList.findIndex(item => item.id == this.selectedVillage.id);
      if(itemIndex !== -1){
        this.villageList.splice(itemIndex, 1);
      }
      this.dataSource = new MatTableDataSource(this.villageList);
      this.infoMessage = "Done";
      $('#deleteModal').modal('hide');
    },err => {
      this.errorMessage = "Unexpected error occurred.";
    });
  }


}
