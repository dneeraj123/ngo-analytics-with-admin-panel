import { Component, OnInit, ViewChild,Input } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import{ AdminService} from '../../../../services/admin.service';
import {Vibhag} from '../../../../model/vibhag';
import {District} from '../../../../model/district';
import {Taluka} from '../../../../model/taluka';
import {Mandal} from '../../../../model/mandal';
import {Village} from '../../../../model/village';
import {Entry} from '../../../../model/entry';
import {User} from '../../../../model/user';
import {Nagar} from '../../../../model/nagar';

declare var $: any;

@Component({
  selector: 'app-taluka-detail',
  templateUrl: './taluka-detail.component.html',
  styleUrls: ['./taluka-detail.component.css']
})
export class TalukaDetailComponent implements OnInit {


  @Input() currTaluka : Taluka;		
  coveredVillages: number;
  totalVillages : number;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
  	this.findVillagesCovered();
  }

  findVillagesCovered(){
	
	this.adminService.findVillagesCoveredPerTaluka(this.currTaluka.id)
	.subscribe(data=>{
		this.coveredVillages=data.length;

	});

	this.adminService.findVillageByTaluka(this.currTaluka).subscribe(data=>{
		this.totalVillages=data.length;
	});

  }

	getColor()
	  {
	  	let c=this.coveredVillages;
	  	let t=this.totalVillages;
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
