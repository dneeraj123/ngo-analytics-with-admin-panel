import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import {Vibhag} from '../../../model/vibhag';
import{ AdminService} from '../../../services/admin.service';
import {District} from '../../../model/district';
import {Taluka} from '../../../model/taluka';

declare var $: any;



@Component({
  selector: 'app-taluka-list',
  templateUrl: './taluka-list.component.html',
  styleUrls: ['./taluka-list.component.css']
})
export class TalukaListComponent implements OnInit {

  vibhagList: Array<Vibhag>;
  talukaList: Array<Taluka>;
  districtList: Array<District>;
  dataSource: MatTableDataSource<Taluka> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'name','district','vibhag', 'prant' ,'action'];
  selectedTaluka: Taluka = new Taluka();
  errorMessage: string;
  infoMessage: string;
  editMode=false;

  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort: MatSort;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.findAllTalukas();
    this.findAllVibhags();

  }

  findAllVibhags(){
    this.adminService.findAllVibhags().subscribe(data => {
      this.vibhagList = data;
    });
  }

  findDistrictByVibhag(){
  	console.log(this.selectedTaluka.vibhag);
    this.adminService.findDistrictByVibhag(this.selectedTaluka.vibhag).subscribe(data => {
      this.districtList = data;
      this.selectedTaluka.district = null;
    });
//    console.log(this.districtList);
  }


  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  findAllTalukas(){
    this.adminService.findAllTalukas().subscribe(data => {
      this.talukaList = data;
      this.dataSource.data = data;
    });
  }

  createNewTalukaRequest(){
    this.editMode=false;
    this.selectedTaluka = new Taluka();
    this.selectedTaluka.vibhag =  new Vibhag();
    this.selectedTaluka.district =  new District();
    this.selectedTaluka.prant="DVG";
    this.districtList = null;

    $('#talukaModal').modal('show');
  }

  editTalukaRequest(taluka: Taluka){
    this.selectedTaluka=Object.assign({}, taluka);
    //this.selectedTaluka = taluka;
    //this.selectedTaluka.vibhag= taluka.vibhag;
    //console.log(this.selectedTaluka.vibhag);
    this.selectedTaluka.vibhag = this.vibhagList.find((vibhag)=>{
    		return vibhag.id===this.selectedTaluka.vibhag.id;
    });

    this.adminService.findDistrictByVibhag(this.selectedTaluka.vibhag).subscribe(data => {
      this.districtList = data;

    this.selectedTaluka.district = this.districtList.find((district)=>{
    		return district.id===this.selectedTaluka.district.id;
    });

    });



    /*this.adminService.findTalukaByVibhag(this.selectedTaluka.vibhag).subscribe((data)=>{
    	console.log(data);
    });
	*/

    $('#talukaModal').modal('show');
    this.editMode=true;
  }

  saveTaluka(){
  	//console.log("id");
  	//console.log(this.selectedTaluka.id);
    if(!this.editMode){
      this.createTaluka();
    }else{
      this.updateTaluka();
    }
  }

  createTaluka(){
    this.adminService.createTaluka(this.selectedTaluka).subscribe(data => {
      console.log("Created!!!");	
      console.log(data);
      this.talukaList.push(data);
      this.dataSource = new MatTableDataSource(this.talukaList);

      //this.adminService.findAllTalukas().subscribe(data => {
      //this.talukaList = data;
      //this.dataSource.data = data;
	   
	  //});

      this.infoMessage = "Done";
      $('#talukaModal').modal('hide');
    },err => {
      this.errorMessage = "Unexpected error occurred.";
    });
  }

  updateTaluka(){
    this.adminService.updateTaluka(this.selectedTaluka).subscribe(data => {
      
      console.log("Updated!!!");
      let itemIndex = this.talukaList.findIndex(item => item.id == this.selectedTaluka.id);
      this.talukaList[itemIndex] = this.selectedTaluka;
      this.dataSource = new MatTableDataSource(this.talukaList);
      this.infoMessage = "Done is completed";
      this.editMode=false;
      $('#talukaModal').modal('hide');

    },err => {
      this.errorMessage = "Unexpected error occurred.";
    });
  }

  deleteTalukaRequest(taluka: Taluka){
    this.selectedTaluka = taluka;
    $('#deleteModal').modal('show');
  }

  deleteTaluka(){
    this.adminService.deleteTaluka(this.selectedTaluka).subscribe(data => {
      let itemIndex = this.talukaList.findIndex(item => item.id == this.selectedTaluka.id);
      if(itemIndex !== -1){
        this.talukaList.splice(itemIndex, 1);
      }
      this.dataSource = new MatTableDataSource(this.talukaList);
      this.infoMessage = "Done";
      $('#deleteModal').modal('hide');
    },err => {
      this.errorMessage = "Unexpected error occurred.";
    });
  }




}
