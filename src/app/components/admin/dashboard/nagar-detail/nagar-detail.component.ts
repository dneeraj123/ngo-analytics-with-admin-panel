import { Component, OnInit,Input,ViewChild,ElementRef,Renderer2 } from '@angular/core';
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
  selector: 'app-nagar-detail',
  templateUrl: './nagar-detail.component.html',
  styleUrls: ['./nagar-detail.component.css']
})
export class NagarDetailComponent implements OnInit {

  @Input() currNagar : Nagar;		
  coveredVastis: number;
  totalVastis : number;
  @ViewChild('nagarDiv',{static: true}) nagarDiv: ElementRef;

  constructor(private adminService: AdminService,private renderer : Renderer2) { }

  ngOnInit() {
  	this.findVastisCovered();
  }

  findVastisCovered(){
	

	this.adminService.findVastiByNagar(this.currNagar).subscribe(data=>{
		this.totalVastis=data.length;

		this.adminService.findVastisCoveredPerNagar(this.currNagar.id)
		.subscribe(data=>{
			this.coveredVastis=data.length;

			//this.renderer.setStyle(this.nagarDiv.nativeElement, 
			//	'background', this.getColor());

		});

	});

  }

getColor()
  {
//  	console.log(this.totalVastis);
//  	console.log(this.coveredVastis);
  	let c=this.coveredVastis;
  	let t=this.totalVastis;
  	let v;
  	if(t==0 || c==0){
  		v=0;
  	}
  	else{
  	v= (c/t)*100;
  	}
  	var redVal = Math.round(Math.min((255.0*2.0)*(v/(100-1)), 255));
    var greenVal = Math.round(Math.min((255.0*2.0)*((100-v)/(100-1))));
//    let color="rgb(" + greenVal + "," + redVal + ",0)";
//    console.log(color);
    return "" + greenVal + "," + redVal + ",0";
  }





}
