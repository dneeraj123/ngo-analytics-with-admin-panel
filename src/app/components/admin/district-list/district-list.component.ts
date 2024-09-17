import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import {Vibhag} from '../../../model/vibhag';
import{ AdminService} from '../../../services/admin.service';
import {District} from '../../../model/district';

declare var $: any;

@Component({
  selector: 'app-district-list',
  templateUrl: './district-list.component.html',
  styleUrls: ['./district-list.component.css']
})

export class DistrictListComponent implements OnInit {

  vibhagList: Array<Vibhag>;
  districtList: Array<District>;
  dataSource: MatTableDataSource<District> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'name','vibhag', 'prant' ,'action'];
  selectedDistrict: District = new District();
  errorMessage: string;
  infoMessage: string;
  editMode=false;

  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort: MatSort;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.findAllDistricts();
    this.findAllVibhags();

  }

  findAllVibhags(){
    this.adminService.findAllVibhags().subscribe(data => {
      this.vibhagList = data;
    });
  }

  onVibhagChange(){
      this.adminService.numberOfDistricts().subscribe(data => {
       let x;
       x=Number(data.response)+1
       x = x > 9 ? x+"" : "0"+x;
       this.selectedDistrict.id= this.selectedDistrict.vibhag.id + x;
       console.log(this.selectedDistrict.vibhag.id);
    });
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  findAllDistricts(){
    this.adminService.findAllDistricts().subscribe(data => {
      this.districtList = data;
      this.dataSource.data = data;
    });
  }

  createNewDistrictRequest(){
    this.editMode=false;
    this.selectedDistrict = new District();
    this.selectedDistrict.vibhag =  new Vibhag();
    this.selectedDistrict.prant="DVG";
/*    this.adminService.numberOfVibhags().subscribe(data => {
       let x;
       x=Number(data.response)+1
       x = x > 9 ? x+"" : "0"+x;
       this.selectedDistrict.id= "DVG"+ x;
    });
*/


    $('#districtModal').modal('show');
  }

  editDistrictRequest(district: District){
    //this.selectedDistrict=Object.assign({}, district);
    this.selectedDistrict = district;
    this.selectedDistrict.vibhag = this.vibhagList.find((vibhag)=>{
    		return vibhag.id===this.selectedDistrict.vibhag.id;
    });
    //this.selectedDistrict.vibhag= district.vibhag;
    console.log(this.selectedDistrict.vibhag);

    /*this.adminService.findDistrictByVibhag(this.selectedDistrict.vibhag).subscribe((data)=>{
    	console.log(data);
    });
	*/

    $('#districtModal').modal('show');
    this.editMode=true;
  }

  saveDistrict(){
  	//console.log("id");
  	//console.log(this.selectedDistrict.id);
    if(!this.editMode){
      this.createDistrict();
    }else{
      this.updateDistrict();
    }
  }

  createDistrict(){

    $('#districtModal').modal('hide');

    this.adminService.createDistrict(this.selectedDistrict).subscribe(data => {
      console.log("Created!!!");	
      console.log(data);
      this.districtList.push(data);
      this.dataSource = new MatTableDataSource(this.districtList);

      //this.adminService.findAllDistricts().subscribe(data => {
      //this.districtList = data;
      //this.dataSource.data = data;
	   
	  //});

      this.infoMessage = "Done";
    },err => {
      this.errorMessage = "Unexpected error occurred.";
    });
  }

  updateDistrict(){

    $('#districtModal').modal('hide');

    this.adminService.updateDistrict(this.selectedDistrict).subscribe(data => {
      
      console.log("Updated!!!");
      let itemIndex = this.districtList.findIndex(item => item.id == this.selectedDistrict.id);
      this.districtList[itemIndex] = this.selectedDistrict;
      this.dataSource = new MatTableDataSource(this.districtList);
      this.infoMessage = "Done is completed";
      this.editMode=false;

    },err => {
      this.errorMessage = "Unexpected error occurred.";
    });
  }

  deleteDistrictRequest(district: District){
    this.selectedDistrict = district;
    $('#deleteModal').modal('show');
  }

  deleteDistrict(){
    this.adminService.deleteDistrict(this.selectedDistrict).subscribe(data => {
      let itemIndex = this.districtList.findIndex(item => item.id == this.selectedDistrict.id);
      if(itemIndex !== -1){
        this.districtList.splice(itemIndex, 1);
      }
      this.dataSource = new MatTableDataSource(this.districtList);
      this.infoMessage = "Done";
      $('#deleteModal').modal('hide');
    },err => {
      this.errorMessage = "Unexpected error occurred.";
    });
  }

}
