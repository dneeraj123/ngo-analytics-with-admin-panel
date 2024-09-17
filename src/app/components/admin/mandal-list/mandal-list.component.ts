import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import{ AdminService} from '../../../services/admin.service';
import {Vibhag} from '../../../model/vibhag';
import {District} from '../../../model/district';
import {Taluka} from '../../../model/taluka';
import {Mandal} from '../../../model/mandal';

declare var $: any;

@Component({
  selector: 'app-mandal-list',
  templateUrl: './mandal-list.component.html',
  styleUrls: ['./mandal-list.component.css']
})

export class MandalListComponent implements OnInit {
  vibhagList: Array<Vibhag>;
  mandalList: Array<Mandal>;
  districtList: Array<District>;
  talukaList: Array<Taluka>;
  dataSource: MatTableDataSource<Mandal> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'name','taluka','district','vibhag', 'prant' ,'action'];
  selectedMandal: Mandal = new Mandal();
  errorMessage: string;
  infoMessage: string;
  editMode=false;

  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort: MatSort;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.findAllMandals();
    this.findAllVibhags();

  }

  findAllVibhags(){
    this.adminService.findAllVibhags().subscribe(data => {
      this.vibhagList = data;
    });
  }

  findDistrictByVibhag(){
  	console.log(this.selectedMandal.vibhag);
    this.adminService.findDistrictByVibhag(this.selectedMandal.vibhag).subscribe(data => {
      this.districtList = data;
      this.selectedMandal.district = null;
      this.selectedMandal.taluka = null;
	  this.talukaList= null;  
    });
//    console.log(this.districtList);
  }

  findTalukaByDistrict()
  {
  	//console.log(this.selectedMandal.vibhag);
    this.adminService.findTalukaByDistrict(this.selectedMandal.district).subscribe(data => {
      this.talukaList = data;
      this.selectedMandal.taluka = null;
    });
//    console.log(this.districtList);
  }



  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  findAllMandals(){
    this.adminService.findAllMandals().subscribe(data => {
      this.mandalList = data;
      this.dataSource.data = data;
    });
  }

  createNewMandalRequest(){
    this.editMode=false;
    this.selectedMandal = new Mandal();
    this.selectedMandal.vibhag =  new Vibhag();
    this.selectedMandal.district =  new District();
    this.selectedMandal.taluka = new Taluka();
    this.selectedMandal.prant="DVG";
    this.districtList = null;
    this.talukaList= null;

    $('#mandalModal').modal('show');
  }

  editMandalRequest(mandal: Mandal){
    this.selectedMandal=Object.assign({}, mandal);
    //this.selectedMandal = mandal;
    //this.selectedMandal.vibhag= mandal.vibhag;
    //console.log(this.selectedMandal.vibhag);
    this.selectedMandal.vibhag = this.vibhagList.find((vibhag)=>{
    		return vibhag.id===this.selectedMandal.vibhag.id;
    });

    this.adminService.findDistrictByVibhag(this.selectedMandal.vibhag).subscribe(data => {
      this.districtList = data;

    this.selectedMandal.district = this.districtList.find((district)=>{
    		return district.id===this.selectedMandal.district.id;
    });

    });

    this.adminService.findTalukaByDistrict(this.selectedMandal.district).subscribe(data => {
      this.talukaList = data;

    this.selectedMandal.taluka = this.talukaList.find((taluka)=>{
    		return taluka.id===this.selectedMandal.taluka.id;
    });

    });


    /*this.adminService.findMandalByVibhag(this.selectedMandal.vibhag).subscribe((data)=>{
    	console.log(data);
    });
	*/

    $('#mandalModal').modal('show');
    this.editMode=true;
  }

  saveMandal(){
  	//console.log("id");
  	//console.log(this.selectedMandal.id);
    if(!this.editMode){
      this.createMandal();
    }else{
      this.updateMandal();
    }
  }

  createMandal(){
    this.adminService.createMandal(this.selectedMandal).subscribe(data => {
      console.log("Created!!!");	
      console.log(data);
      this.mandalList.push(data);
      this.dataSource = new MatTableDataSource(this.mandalList);

      //this.adminService.findAllMandals().subscribe(data => {
      //this.mandalList = data;
      //this.dataSource.data = data;
	   
	  //});

      this.infoMessage = "Done";
      $('#mandalModal').modal('hide');
    },err => {
      this.errorMessage = "Unexpected error occurred.";
    });
  }

  updateMandal(){
    this.adminService.updateMandal(this.selectedMandal).subscribe(data => {
      
      console.log("Updated!!!");
      let itemIndex = this.mandalList.findIndex(item => item.id == this.selectedMandal.id);
      this.mandalList[itemIndex] = this.selectedMandal;
      this.dataSource = new MatTableDataSource(this.mandalList);
      this.infoMessage = "Done is completed";
      this.editMode=false;
      $('#mandalModal').modal('hide');

    },err => {
      this.errorMessage = "Unexpected error occurred.";
    });
  }

  deleteMandalRequest(mandal: Mandal){
    this.selectedMandal = mandal;
    $('#deleteModal').modal('show');
  }

  deleteMandal(){
    this.adminService.deleteMandal(this.selectedMandal).subscribe(data => {
      let itemIndex = this.mandalList.findIndex(item => item.id == this.selectedMandal.id);
      if(itemIndex !== -1){
        this.mandalList.splice(itemIndex, 1);
      }
      this.dataSource = new MatTableDataSource(this.mandalList);
      this.infoMessage = "Done";
      $('#deleteModal').modal('hide');
    },err => {
      this.errorMessage = "Unexpected error occurred.";
    });
  }



}
