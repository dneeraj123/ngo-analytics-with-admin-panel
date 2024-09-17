import { Component, OnInit, ViewChild,ElementRef,Renderer2 } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import{ AdminService} from '../../../services/admin.service';
import {Vibhag} from '../../../model/vibhag';
import {District} from '../../../model/district';
import {Taluka} from '../../../model/taluka';
import {Nagar} from '../../../model/nagar';
import {Mandal} from '../../../model/mandal';
import {Village} from '../../../model/village';
import {Entry} from '../../../model/entry';
import {User} from '../../../model/user';
import Chart from 'chart.js';

declare var $: any;

@Component({
  selector: 'app-datewise-report',
  templateUrl: './datewise-report.component.html',
  styleUrls: ['./datewise-report.component.css']
})
export class DatewiseReportComponent implements OnInit {

  currentUser : User;
  talukaData : {name: string,
  				district : string,
  				prant: string,
  				families : number,
  				karyakartas: number,
          date: string} [] = [];

  talukaDataCumulative : {name: string,
          district : string,
          prant: string,
          families : number,
          karyakartas: number,
          village: number} [] = [];

  nagarData : {name: string,
          district : string,
          prant: string,
          families : number,
          karyakartas: number,
          date: string} [] = []; 

  nagarDataCumulative : {name: string,
          district : string,
          prant: string,
          families : number,
          karyakartas: number,
          village: number} [] = []; 
  
  nagarList: Array<Nagar>;      
  talukaList : Array<Taluka>;

  dataSource: MatTableDataSource<{name: string,
				    			          district : string,
                    			  prant: string,
  				                  families : number,
  				                  karyakartas: number,
                            date: string}> = new MatTableDataSource();

  dataSource1: MatTableDataSource<{name: string,
                            district : string,
                            prant: string,
                            families : number,
                            karyakartas: number,
                            date: string}> = new MatTableDataSource();

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


  displayedColumns: string[] = ['name','district','prant','families','karyakartas','date'];
  displayedColumns1: string[] = ['name','district','prant','families','karyakartas','village'];

  taluka: Taluka;
  nagar: Nagar;
  talukaCum: Taluka;
  nagarCum: Nagar;

  selectedDate: string;

  constructor(private adminService: AdminService) { }

  ngOnInit() {

    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));

    this.adminService.findTalukaByDistrict(this.currentUser.district).
    subscribe((data)=>{
         this.talukaList=data;
    });

    this.adminService.findNagarByDistrict(this.currentUser.district).
    subscribe((data)=>{
         this.nagarList=data;
    });


    //this.talukaCumulative();
    //this.nagarCumulative();
    
  }

  onDateChange()
  {
      //console.log("date");
      //console.log(this.selectedDate);
    
      this.getTalukaData();
      this.getNagarData();
      //this.talukaCumulative();
      //this.nagarCumulative();

  }

  getNagarData()
  {
      this.adminService.
      dateWiseNagar(this.selectedDate,this.currentUser.district.id).
      subscribe(data=>{

        //console.log("Nagar data grouped");
        //console.log(data);
        this.nagarData = [];

        for(let i=0;i<data.length;i++){
          
          this.nagar=this.nagarList.find((nagar)=>{
                return data[i][0]==nagar.id;
          });

          this.nagarData.push({
            name: this.nagar.name,
            district: data[i][1],
            prant: data[i][2],
            families: data[i][3],
            karyakartas: data[i][4],
            date: data[i][5]
          });

        }

        this.dataSource1.data = this.nagarData;
      });  


  }

  getTalukaData()
  {  

    	this.adminService.
  		dateWiseTaluka(this.selectedDate,this.currentUser.district.id).
  		subscribe(data=>{

  			//console.log("Taluka data grouped");
  			//console.log(data);
        this.talukaData = [];

  			for(let i=0;i<data.length;i++){
	  		  
          this.taluka=this.talukaList.find((taluka)=>{
                return data[i][0]==taluka.id;
          });

	  			this.talukaData.push({
  					name: this.taluka.name,
  					district: data[i][1],
  					prant: data[i][2],
  					families: data[i][3],
  					karyakartas: data[i][4],
            date: data[i][5]
  				});

  			}

  			this.dataSource.data = this.talukaData;
  		});	

  }

/*  talukaCumulative(){

      this.adminService.
      talukaWise(this.currentUser.district.id).
      subscribe(data=>{

        console.log("Taluka data grouped");
        console.log(data);
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

        console.log("Taluka data grouped");
        console.log(data);
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
*/

}




