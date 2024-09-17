import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import {Vibhag} from '../../../model/vibhag';
import{ AdminService} from '../../../services/admin.service';
import {District} from '../../../model/district';
import {Nagar} from '../../../model/nagar';

declare var $: any;


@Component({
  selector: 'app-nagar-list',
  templateUrl: './nagar-list.component.html',
  styleUrls: ['./nagar-list.component.css']
})
export class NagarListComponent implements OnInit {

  vibhagList: Array<Vibhag>;
  nagarList: Array<Nagar>;
  districtList: Array<District>;
  dataSource: MatTableDataSource<Nagar> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'name','district','vibhag', 'prant' ,'action'];
  selectedNagar: Nagar = new Nagar();
  errorMessage: string;
  infoMessage: string;
  editMode=false;

  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort: MatSort;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.findAllNagars();
    this.findAllVibhags();

  }

  findAllVibhags(){
    this.adminService.findAllVibhags().subscribe(data => {
      this.vibhagList = data;
    });
  }

  findDistrictByVibhag(){
  	console.log(this.selectedNagar.vibhag);
    this.adminService.findDistrictByVibhag(this.selectedNagar.vibhag).subscribe(data => {
      this.districtList = data;
      this.selectedNagar.district = null;
    });
//    console.log(this.districtList);
  }


  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  findAllNagars(){
    this.adminService.findAllNagars().subscribe(data => {
      this.nagarList = data;
      this.dataSource.data = data;
    });
  }

  createNewNagarRequest(){
    this.editMode=false;
    this.selectedNagar = new Nagar();
    this.selectedNagar.vibhag =  new Vibhag();
    this.selectedNagar.district =  new District();
    this.selectedNagar.prant="DVG";
    this.districtList = null;

    $('#nagarModal').modal('show');
  }

  editNagarRequest(nagar: Nagar){
    this.selectedNagar=Object.assign({}, nagar);
    //this.selectedNagar = nagar;
    //this.selectedNagar.vibhag= nagar.vibhag;
    //console.log(this.selectedNagar.vibhag);
    this.selectedNagar.vibhag = this.vibhagList.find((vibhag)=>{
    		return vibhag.id===this.selectedNagar.vibhag.id;
    });

    this.adminService.findDistrictByVibhag(this.selectedNagar.vibhag).subscribe(data => {
      this.districtList = data;

    this.selectedNagar.district = this.districtList.find((district)=>{
    		return district.id===this.selectedNagar.district.id;
    });

    });



    /*this.adminService.findNagarByVibhag(this.selectedNagar.vibhag).subscribe((data)=>{
    	console.log(data);
    });
	*/

    $('#nagarModal').modal('show');
    this.editMode=true;
  }

  saveNagar(){
  	//console.log("id");
  	//console.log(this.selectedNagar.id);
    if(!this.editMode){
      this.createNagar();
    }else{
      this.updateNagar();
    }
  }

  createNagar(){
    this.adminService.createNagar(this.selectedNagar).subscribe(data => {
      console.log("Created!!!");	
      console.log(data);
      this.nagarList.push(data);
      this.dataSource = new MatTableDataSource(this.nagarList);

      //this.adminService.findAllNagars().subscribe(data => {
      //this.nagarList = data;
      //this.dataSource.data = data;
	   
	  //});

      this.infoMessage = "Done";
      $('#nagarModal').modal('hide');
    },err => {
      this.errorMessage = "Unexpected error occurred.";
    });
  }

  updateNagar(){
    this.adminService.updateNagar(this.selectedNagar).subscribe(data => {
      
      console.log("Updated!!!");
      let itemIndex = this.nagarList.findIndex(item => item.id == this.selectedNagar.id);
      this.nagarList[itemIndex] = this.selectedNagar;
      this.dataSource = new MatTableDataSource(this.nagarList);
      this.infoMessage = "Done is completed";
      this.editMode=false;
      $('#nagarModal').modal('hide');

    },err => {
      this.errorMessage = "Unexpected error occurred.";
    });
  }

  deleteNagarRequest(nagar: Nagar){
    this.selectedNagar = nagar;
    $('#deleteModal').modal('show');
  }

  deleteNagar(){
    this.adminService.deleteNagar(this.selectedNagar).subscribe(data => {
      let itemIndex = this.nagarList.findIndex(item => item.id == this.selectedNagar.id);
      if(itemIndex !== -1){
        this.nagarList.splice(itemIndex, 1);
      }
      this.dataSource = new MatTableDataSource(this.nagarList);
      this.infoMessage = "Done";
      $('#deleteModal').modal('hide');
    },err => {
      this.errorMessage = "Unexpected error occurred.";
    });
  }


}
