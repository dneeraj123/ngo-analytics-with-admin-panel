import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import {Vibhag} from '../../../model/vibhag';
import{ AdminService} from '../../../services/admin.service';

declare var $: any;

@Component({
  selector: 'app-vibhag-list',
  templateUrl: './vibhag-list.component.html',
  styleUrls: ['./vibhag-list.component.css']
})

export class VibhagListComponent implements OnInit {

  vibhagList: Array<Vibhag>;
  dataSource: MatTableDataSource<Vibhag> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'name', 'prant', 'action'];
  selectedVibhag: Vibhag = new Vibhag();
  errorMessage: string;
  infoMessage: string;
  editMode=false;

  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort: MatSort;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.findAllVibhags();
    console.log(this.vibhagList);
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  findAllVibhags(){
    this.adminService.findAllVibhags().subscribe(data => {
      this.vibhagList = data;
      this.dataSource.data = data;
    });
  }

  createNewVibhagRequest(){
    this.editMode=false;
    this.selectedVibhag = new Vibhag();
    this.selectedVibhag.prant="DVG";
    this.adminService.numberOfVibhags().subscribe(data => {
       let x;
       x=Number(data.response)+1
       x = x > 9 ? x+"" : "0"+x;
       this.selectedVibhag.id= "DVG"+ x;

    });

    $('#vibhagModal').modal('show');
  }

  editVibhagRequest(vibhag: Vibhag){
    this.selectedVibhag = vibhag;
    $('#vibhagModal').modal('show');
    this.editMode=true;
  }

  saveVibhag(){
  	//console.log("id");
  	//console.log(this.selectedVibhag.id);
    if(!this.editMode){
      this.createVibhag();
    }else{
      this.updateVibhag();
    }
  }

  createVibhag(){
    this.adminService.createVibhag(this.selectedVibhag).subscribe(data => {
      console.log("Created!!!");	
      console.log(data);
      this.vibhagList.push(data);
      this.dataSource = new MatTableDataSource(this.vibhagList);

      //this.adminService.findAllVibhags().subscribe(data => {
      //this.vibhagList = data;
      //this.dataSource.data = data;
	   
	  //});

      this.infoMessage = "Done";
      $('#vibhagModal').modal('hide');
    },err => {
      this.errorMessage = "Unexpected error occurred.";
    });
  }

  updateVibhag(){
    this.adminService.updateVibhag(this.selectedVibhag).subscribe(data => {
      
      console.log("Updated!!!");
      let itemIndex = this.vibhagList.findIndex(item => item.id == this.selectedVibhag.id);
      this.vibhagList[itemIndex] = this.selectedVibhag;
      this.dataSource = new MatTableDataSource(this.vibhagList);
      this.infoMessage = "Done is completed";
      this.editMode=false;
      $('#vibhagModal').modal('hide');

    },err => {
      this.errorMessage = "Unexpected error occurred.";
    });
  }

  deleteVibhagRequest(vibhag: Vibhag){
    this.selectedVibhag = vibhag;
    $('#deleteModal').modal('show');
  }

  deleteVibhag(){
    this.adminService.deleteVibhag(this.selectedVibhag).subscribe(data => {
      let itemIndex = this.vibhagList.findIndex(item => item.id == this.selectedVibhag.id);
      if(itemIndex !== -1){
        this.vibhagList.splice(itemIndex, 1);
      }
      this.dataSource = new MatTableDataSource(this.vibhagList);
      this.infoMessage = "Done";
      $('#deleteModal').modal('hide');
    },err => {
      this.errorMessage = "Unexpected error occurred.";
    });
  }

}
