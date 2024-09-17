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
import {Nagar} from '../../../model/nagar';

declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  userCount:any = "";
  currentUser : User;
  villageCount: number;
  coveredVillagesPerDistrict : number;
  talukaList : Array<Taluka>;
  nagarList : Array<Nagar>;

  talukaDataCumulative : {name: string,
          district : string,
          prant: string,
          families : number,
          karyakartas: number,
          village: number} [] = [];

  nagarDataCumulative : {name: string,
          district : string,
          prant: string,
          families : number,
          karyakartas: number,
          village: number} [] = []; 

  dataSource2: MatTableDataSource<{name: string,
                            district : string,
                            prant: string,
                            families : number,
                            karyakartas: number,
                            village: number}> = new MatTableDataSource();

  dataSource3: MatTableDataSource<{name: string,
                            district : string,
                            prant: string,
                            families : number,
                            karyakartas: number,
                            village: number}> = new MatTableDataSource();

  displayedColumns1: string[] = ['name','district','prant','families','karyakartas','village'];
  talukaCum: Taluka;
  nagarCum: Nagar;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));

    this.findVillageByDistrict();  
    this.findTalukaByDistrict();
    this.findNagarByDistrict();
  }


  findVillageByDistrict()
  {
      this.adminService.findVillageByDistrict(this.currentUser.district).
      subscribe((data)=>{

          // console.log("Village count"); 
          // console.log(data.length);          
           this.villageCount = data.length;
      });

      //console.log(this.currentUser.district.id);

      this.adminService.findCoveredVillagesPerDistrict(this.currentUser.district.id).
      subscribe(data=>{
         // console.log(data);
          this.coveredVillagesPerDistrict = data.length;
      });      

  }

  findTalukaByDistrict()
  {
      this.adminService.findTalukaByDistrict(this.currentUser.district)
      .subscribe(data=>{
          
          this.talukaList=data;                              
      
          this.talukaCumulative();

      });
  }

  

  findNagarByDistrict()
  {
      this.adminService.findNagarByDistrict(this.currentUser.district)
      .subscribe(data=>{
          
          this.nagarList=data;                              

          this.nagarCumulative();

      });
  }


  talukaCumulative(){

      this.adminService.
      talukaWise(this.currentUser.district.id).
      subscribe(data=>{

        //console.log("Taluka data grouped");
        //console.log(data);
        this.talukaDataCumulative = [];

        for(let i=0;i<data.length;i++){
          
          this.talukaCum=this.talukaList.find((taluka)=>{
                return data[i][0]==taluka.id;
          });

          this.talukaDataCumulative.push({
            name: this.talukaCum.name,
            district: data[i][1],
            prant: data[i][2],
            families: data[i][3],
            karyakartas: data[i][4],
            village: data[i][5],
          });

        }

        this.dataSource2.data = this.talukaDataCumulative;
      });  

  }

  nagarCumulative(){

      this.adminService.
      nagarWise(this.currentUser.district.id).
      subscribe(data=>{

        //console.log("Taluka data grouped");
        //console.log(data);
        this.nagarDataCumulative = [];

        for(let i=0;i<data.length;i++){
          
          this.nagarCum=this.nagarList.find((nagar)=>{
                return data[i][0]==nagar.id;
          });

          this.nagarDataCumulative.push({
            name: this.nagarCum.name,
            district: data[i][1],
            prant: data[i][2],
            families: data[i][3],
            karyakartas: data[i][4],
            village: data[i][5],
          });

        }

        this.dataSource3.data = this.nagarDataCumulative;
      });  

  }



}
