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

@Component({
  selector: 'app-prant-dashboard',
  templateUrl: './prant-dashboard.component.html',
  styleUrls: ['./prant-dashboard.component.css']
})
export class PrantDashboardComponent implements OnInit {

  districtDataCumulative : {name: string,
          district : string,
          prant: string,
          families : number,
          karyakartas: number,
          village: number,
      	  mandal: number,
		 } [] = [];

  dataSource: MatTableDataSource<{name: string,
                            district : string,
                            prant: string,
                            families : number,
                            karyakartas: number,
                            village: number
                            mandal: number}> = new MatTableDataSource();

  districtDataCumulative1 : {name: string,
          district : string,
          prant: string,
          families : number,
          karyakartas: number,
          village: number,
      	  mandal: number,
		 } [] = [];

  dataSource1: MatTableDataSource<{name: string,
                            district : string,
                            prant: string,
                            families : number,
                            karyakartas: number,
                            village: number
                            mandal: number}> = new MatTableDataSource();


  displayedColumns: string[] = ['name','district','prant','families','karyakartas','village','mandal'];
  districtList: Array<District>;
  district: District;
  district1: District;

  constructor(private adminService:AdminService) { }

  ngOnInit() {

  	console.log("prant dashboard component!!!");

  	this.findDistricts();
  }

  findDistricts()
  {
      this.adminService.findAllDistricts()
      .subscribe(data=>{
          
          this.districtList=data;                              
	      this.getDistrictDataVillage();
	      this.getDistrictDataVasti();

      });


  }


  getDistrictDataVillage()
  {
  		this.adminService.districtWiseVillage().
  		subscribe(data=>{

  			console.log(data);

  			for(let i=0;i<data.length;i++){
				
  				this.district= this.districtList.find((district)=>{
  					return district.id==data[i][0];
  				});

  				this.districtDataCumulative.push({
  					name: this.district.name,
  					district: data[i][0],
  					prant: data[i][1],
  					families: data[i][2],
  					karyakartas : data[i][3],
  					village: data[i][4],
  					mandal: data[i][5]
  				});
 
  			}

  			this.dataSource.data = this.districtDataCumulative;
  		});
  }

  getDistrictDataVasti()
  {
  		this.adminService.districtWiseVasti().
  		subscribe(data=>{

  			console.log(data);

  			for(let i=0;i<data.length;i++){
				
  				this.district1= this.districtList.find((district)=>{
  					return district.id==data[i][0];
  				});

  				this.districtDataCumulative1.push({
  					name: this.district1.name,
  					district: data[i][0],
  					prant: data[i][1],
  					families: data[i][2],
  					karyakartas : data[i][3],
  					village: data[i][4],
  					mandal: data[i][5]
  				});
 
  			}

  			this.dataSource1.data = this.districtDataCumulative1;
  		});
  }



}
