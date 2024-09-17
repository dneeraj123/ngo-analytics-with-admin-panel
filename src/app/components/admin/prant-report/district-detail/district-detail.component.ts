import { Component, OnInit, ViewChild,ElementRef,Renderer2,Input } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import{ AdminService} from '../../../../services/admin.service';
import {Vibhag} from '../../../../model/vibhag';
import {District} from '../../../../model/district';
import {Taluka} from '../../../../model/taluka';
import {Mandal} from '../../../../model/mandal';
import {Village} from '../../../../model/village';
import {Entry} from '../../../../model/entry';
import {User} from '../../../../model/user';
import Chart from 'chart.js';

declare var $: any;

@Component({
  selector: 'app-district-detail',
  templateUrl: './district-detail.component.html',
  styleUrls: ['./district-detail.component.css']
})
export class DistrictDetailComponent implements OnInit {

  @Input() currDistrict : District;
  villageCount : number;
  coveredVillageCount : number;
  familyReached: number;
  karyakartasParticipated: number;

  vastiCount : number;
  coveredVastiCount : number;
  familyReachedVasti: number;
  karyakartasParticipatedVasti: number;

  mandalCount : number;
  coveredMandalCount : number;

  nagarCount : number;
  coveredNagarCount : number;


  constructor(private adminService: AdminService) { }

  ngOnInit() {
  	this.fetchDistrictData();
  	this.fetchVastiData();
  }

  fetchDistrictData()
  {

		this.adminService.findVillageByDistrict(this.currDistrict).
		  subscribe((data)=>{

		       //console.log("Village count"); 
		       //console.log(data.length);          
		       this.villageCount = data.length;

		 this.adminService.findCoveredVillagesPerDistrict(this.currDistrict.id).
		  subscribe(data=>{
		      //console.log(data);
		      this.coveredVillageCount = data.length;

		  let x;
		  if(this.coveredVillageCount ==0 || this.villageCount ==0){
		  	x=0;
		  }
		  else{
		  x=(this.coveredVillageCount/this.villageCount)*100;
		  }
	});

   });


	this.adminService.findMandalByDistrict(this.currDistrict).
		  subscribe((data)=>{

		       //console.log("Mandal count"); 
		       //console.log(data.length);          
		       this.mandalCount = data.length;

		 this.adminService.findCoveredMandalsPerDistrict(this.currDistrict.id).
		  subscribe(data=>{
		      //console.log(data);
		      this.coveredMandalCount = data.length;

		  let x;
		  if(this.coveredMandalCount ==0 || this.mandalCount ==0){
		  	x=0;
		  }
		  else{
		  x=(this.coveredMandalCount/this.mandalCount)*100;
		  }
		});

	   });


	this.adminService.findNagarByDistrict(this.currDistrict).
		  subscribe((data)=>{

		       //console.log("Nagar count"); 
		       //console.log(data.length);          
		       this.nagarCount = data.length;

		 this.adminService.findCoveredNagarsPerDistrict(this.currDistrict.id).
		  subscribe(data=>{
		      //console.log(data);
		      this.coveredNagarCount = data.length;

		  let x;
		  if(this.coveredNagarCount ==0 || this.nagarCount ==0){
		  	x=0;
		  }
		  else{
		  x=(this.coveredNagarCount/this.nagarCount)*100;
		  }
		});

	   });


	  this.adminService.findFamiliesReachedPerDistrict(this.currDistrict.id).
	  subscribe((data)=>{
	  		if(data[0]){
	  			this.familyReached=data;	
	  			
	  		}
	  		else{
	  			this.familyReached=0;
	  		}
	  });

	  this.adminService.findKaryakartasParticipatedPerDistrict(this.currDistrict.id).
	  subscribe((data)=>{
	  		this.karyakartasParticipated=data[0] ? data : 0;
	  });

  }

	fetchVastiData()
	{
		this.adminService.findVastiByDistrict(this.currDistrict).
		  subscribe((data)=>{

		       //console.log("Vasti count"); 
		       //console.log(data.length);          
		       this.vastiCount = data.length;

		 this.adminService.findCoveredVastisPerDistrict(this.currDistrict.id).
		  subscribe(data=>{
		      //console.log(data);
		      this.coveredVastiCount = data.length;

		  let x;
		  if(this.coveredVastiCount ==0 || this.vastiCount ==0){
		  	x=0;
		  }
		  else{
		  x=(this.coveredVastiCount/this.vastiCount)*100;
		  }

		  });      


		  });

		  this.adminService.findFamiliesReachedVastiPerDistrict(this.currDistrict.id).
		  subscribe((data)=>{
		  		if(data[0]){
		  			this.familyReachedVasti=data;	
		  			
		  		}
		  		else{
		  			this.familyReachedVasti=0;
		  		}
		  });

		  this.adminService.findKaryakartasParticipatedVastiPerDistrict(this.currDistrict.id).
		  subscribe((data)=>{
		  		this.karyakartasParticipatedVasti=data[0] ? data : 0;
		  });
	}


	getColor()
	  {
	  	let c=this.coveredVillageCount;
	  	let t=this.villageCount;
	  	let v;
	  	if(t==0 || c==0){
	  		v=0;
	  	}
	  	else{
	  	v= (c/t)*100;
	  	}
	  	var redVal = Math.round(Math.min((255.0*2.0)*(v/(100-1)), 255));
	    var greenVal = Math.round(Math.min((255.0*2.0)*((100-v)/(100-1))));
	    return "" + greenVal + "," + redVal + ",0";
	  }

	getColorVasti()
	  {
	  	let c=this.coveredVastiCount;
	  	let t=this.vastiCount;
	  	let v;
	  	if(t==0 || c==0){
	  		v=0;
	  	}
	  	else{
	  	v= (c/t)*100;
	  	}
	  	var redVal = Math.round(Math.min((255.0*2.0)*(v/(100-1)), 255));
	    var greenVal = Math.round(Math.min((255.0*2.0)*((100-v)/(100-1))));
	    return "" + greenVal + "," + redVal + ",0";
	  }
}
