import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import{ AdminService} from '../../../services/admin.service';
import {Vibhag} from '../../../model/vibhag';
import {District} from '../../../model/district';
import {Nagar} from '../../../model/nagar';
import {Vasti} from '../../../model/vasti';

declare var $: any;

@Component({
  selector: 'app-vasti-list',
  templateUrl: './vasti-list.component.html',
  styleUrls: ['./vasti-list.component.css']
})
export class VastiListComponent implements OnInit {

  vibhagList: Array<Vibhag>;
  vastiList: Array<Vasti>;
  districtList: Array<District>;
  nagarList: Array<Nagar>;
  dataSource: MatTableDataSource<Vasti> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'name','nagar','district','vibhag', 'prant' ,'action'];
  selectedVasti: Vasti = new Vasti();
  errorMessage: string;
  infoMessage: string;
  editMode=false;

  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort: MatSort;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.findAllVastis();
    this.findAllVibhags();

  }

  findAllVibhags(){
    this.adminService.findAllVibhags().subscribe(data => {
      this.vibhagList = data;
    });
  }

  findDistrictByVibhag(){
  	console.log(this.selectedVasti.vibhag);
    this.adminService.findDistrictByVibhag(this.selectedVasti.vibhag).subscribe(data => {
      this.districtList = data;
      this.selectedVasti.district = null;
      this.selectedVasti.nagar = null;
	  this.nagarList= null;  
    });
//    console.log(this.districtList);
  }

  findNagarByDistrict()
  {
  	//console.log(this.selectedVasti.vibhag);
    this.adminService.findNagarByDistrict(this.selectedVasti.district).subscribe(data => {
      this.nagarList = data;
      this.selectedVasti.nagar = null;
    });
//    console.log(this.districtList);
  }



  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  findAllVastis(){
    this.adminService.findAllVastis().subscribe(data => {
      this.vastiList = data;
      this.dataSource.data = data;
    });
  }

  createNewVastiRequest(){
    this.editMode=false;
    this.selectedVasti = new Vasti();
    this.selectedVasti.vibhag =  new Vibhag();
    this.selectedVasti.district =  new District();
    this.selectedVasti.nagar = new Nagar();
    this.selectedVasti.prant="DVG";
    this.districtList = null;
    this.nagarList= null;

    $('#vastiModal').modal('show');
  }

  editVastiRequest(vasti: Vasti){
    this.selectedVasti=Object.assign({}, vasti);
    //this.selectedVasti = vasti;
    //this.selectedVasti.vibhag= vasti.vibhag;
    //console.log(this.selectedVasti.vibhag);
    this.selectedVasti.vibhag = this.vibhagList.find((vibhag)=>{
    		return vibhag.id===this.selectedVasti.vibhag.id;
    });

    this.adminService.findDistrictByVibhag(this.selectedVasti.vibhag).subscribe(data => {
      this.districtList = data;

    this.selectedVasti.district = this.districtList.find((district)=>{
    		return district.id===this.selectedVasti.district.id;
    });

    });

    this.adminService.findNagarByDistrict(this.selectedVasti.district).subscribe(data => {
      this.nagarList = data;

    this.selectedVasti.nagar = this.nagarList.find((nagar)=>{
    		return nagar.id===this.selectedVasti.nagar.id;
    });

    });


    /*this.adminService.findVastiByVibhag(this.selectedVasti.vibhag).subscribe((data)=>{
    	console.log(data);
    });
	*/

    $('#vastiModal').modal('show');
    this.editMode=true;
  }

  saveVasti(){
  	//console.log("id");
  	//console.log(this.selectedVasti.id);
    if(!this.editMode){
      this.createVasti();
    }else{
      this.updateVasti();
    }
  }

  createVasti(){

    $('#vastiModal').modal('hide');

    this.adminService.createVasti(this.selectedVasti).subscribe(data => {
      console.log("Created!!!");	
      console.log(data);
      this.vastiList.push(data);
      this.dataSource = new MatTableDataSource(this.vastiList);

      //this.adminService.findAllVastis().subscribe(data => {
      //this.vastiList = data;
      //this.dataSource.data = data;
	   
	  //});

      this.infoMessage = "Done";
    },err => {
      this.errorMessage = "Unexpected error occurred.";
    });
  }

  updateVasti(){

    $('#vastiModal').modal('hide');

    this.adminService.updateVasti(this.selectedVasti).subscribe(data => {
      
      console.log("Updated!!!");
      let itemIndex = this.vastiList.findIndex(item => item.id == this.selectedVasti.id);
      this.vastiList[itemIndex] = this.selectedVasti;
      this.dataSource = new MatTableDataSource(this.vastiList);
      this.infoMessage = "Done is completed";
      this.editMode=false;

    },err => {
      this.errorMessage = "Unexpected error occurred.";
    });
  }

  deleteVastiRequest(vasti: Vasti){
    this.selectedVasti = vasti;
    $('#deleteModal').modal('show');
  }

  deleteVasti(){
    this.adminService.deleteVasti(this.selectedVasti).subscribe(data => {
      let itemIndex = this.vastiList.findIndex(item => item.id == this.selectedVasti.id);
      if(itemIndex !== -1){
        this.vastiList.splice(itemIndex, 1);
      }
      this.dataSource = new MatTableDataSource(this.vastiList);
      this.infoMessage = "Done";
      $('#deleteModal').modal('hide');
    },err => {
      this.errorMessage = "Unexpected error occurred.";
    });
  }



}
