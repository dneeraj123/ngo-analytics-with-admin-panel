import { Component, OnInit, ViewChild,ElementRef,Renderer2 } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import{ AdminService} from '../../../services/admin.service';
import {Vibhag} from '../../../model/vibhag';
import {District} from '../../../model/district';
import {Taluka} from '../../../model/taluka';
import {Mandal} from '../../../model/mandal';
import {Village} from '../../../model/village';
import {Entry} from '../../../model/entry';
import {User} from '../../../model/user';
import Chart from 'chart.js';

declare var $: any;

@Component({
  selector: 'app-dashboard-prant',
  templateUrl: './dashboard-prant.component.html',
  styleUrls: ['./dashboard-prant.component.css']
})

export class DashboardPrantComponent implements OnInit {

  @ViewChild('progressBar',{static: true}) progressBar: ElementRef;
  @ViewChild('progressBar1',{static: true}) progressBar1: ElementRef;
	
  currUser : User;  
  districtList : Array<District>;
  district: District;

  villageCount : number;
  coveredVillageCount : number;
  familyReached: number;
  karyakartasParticipated: number;

  vastiCount : number;
  coveredVastiCount : number;
  familyReachedVasti: number;
  karyakartasParticipatedVasti: number;


  currDistrict: District;
  complete: number;
  completeVasti: number;
  
  public canvas : any;

  constructor(private adminService : AdminService, private renderer : Renderer2) { }

  ngOnInit() {

  	this.currUser = JSON.parse(localStorage.getItem("currentUser"));

  	this.complete=0;
  	this.findAllDistrict();
  	this.forBar();
  }

	findAllDistrict(){
		 
		this.adminService.findAllDistricts().subscribe((data)=>{
			 this.districtList= data;
			 if(this.currUser.district){
			 	this.currDistrict = this.currUser.district;	
			 }
			 else{
				 this.currDistrict = this.districtList[0];	
			 }
			 this.onDistrictChange();
			 this.forVasti();
			 this.familiesPerDay();

	  	});
	}

	onDistrictChange()
	{
		//console.log(this.currDistrict);

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

		  this.renderer.setAttribute(this.progressBar.nativeElement, 'aria-valuenow', x+"");
		  this.renderer.setStyle(this.progressBar.nativeElement, 'width', x+"%");
		  this.complete=x;

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

		 this.forVasti();
		 this.familiesPerDay();
	}

	familiesPerDay()
	{
		this.adminService.findFamiliesPerDayVillage(this.currDistrict.id)
		.subscribe((data)=>{

			let x=[];
			let y=[];

			for(let i=0;i<data.length;i++){
				x.push(data[i][0]);
				y.push(data[i][1]);
			}

			this.drawTimeLineGraph("line",x,y);
		});

	}

	forVasti()
	{
		this.adminService.findVastiByDistrict(this.currDistrict).
		  subscribe((data)=>{

		      // console.log("Vasti count"); 
		      // console.log(data.length);          
		       this.vastiCount = data.length;

		 this.adminService.findCoveredVastisPerDistrict(this.currDistrict.id).
		  subscribe(data=>{
		     // console.log(data);
		      this.coveredVastiCount = data.length;

		  let x;
		  if(this.coveredVastiCount ==0 || this.vastiCount ==0){
		  	x=0;
		  }
		  else{
		  x=(this.coveredVastiCount/this.vastiCount)*100;
		  }

		  this.renderer.setAttribute(this.progressBar1.nativeElement, 'aria-valuenow', x+"");
		  this.renderer.setStyle(this.progressBar1.nativeElement, 'width', x+"%");
		  this.completeVasti=x;

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
	  	this.complete = v;
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
	  	this.completeVasti = v;
	  	var redVal = Math.round(Math.min((255.0*2.0)*(v/(100-1)), 255));
	    var greenVal = Math.round(Math.min((255.0*2.0)*((100-v)/(100-1))));
	    return "" + greenVal + "," + redVal + ",0";
	  }


  forBar()
  {
  	this.adminService.findAllDistricts().subscribe((data)=>{
  		this.districtList= data;

		this.adminService.coveredVillagesPerDistrict().subscribe((data)=>{
  			//console.log(data);
			let x=[];
			let y=[];

  			for(let i=0;i<data.length;i++){

  				this.district=this.districtList.find((district)=>{
					return district.id==data[i][0];  					
  				});

  				x.push(this.district.name);
  				y.push(data[i][1]);
  			}

//  			this.drawBar(x,y,"bar");
  		});
  	});
  }


	drawBar(x:Array<Number>,y:Array<Number>,type:string)
	{

		//console.log("drawbar");
		//console.log(x);

		var barContext = document.getElementById(type);
		var barChartData = {
		  labels: x,
		  datasets: [
		    {
		      label:"Data",
		      backgroundColor: "#f17e5d",
		      borderColor: "#f17e5d",
		      borderWidth: 1,
		      data: y    
		    }
		  ]
		};

		var barChartOptions = {
		  responsive: true,
		  legend: {
		    display: true,
		    position: "top"
		  },
		  title: {
		    display: true,
		    text: "Villages Covered"
		  },
		  tooltips: {
		    enabled: true
		  },
		  scales: {
		    yAxes: [{
		      ticks: {
		        beginAtZero: true
		      }
		    }]
		  }
		}

		  var barChart = new Chart(barContext, {
		    type: "bar",
		    data: barChartData,
		    options: barChartOptions
		  });

	}


	drawTimeLineGraph(type:string,x:Array<Number>,y:Array<Number>)
	{
      var speedCanvas = document.getElementById(type);

      var dataFirst = {
        data: y,
        borderColor: 'blue',
        pointBorderColor: 'blue',
        pointRadius: 2,
        pointHoverRadius: 2,
        pointBorderWidth: 3,
      };

      var speedData = {
        labels: x,
        datasets: [dataFirst]
      };

      var chartOptions = {
        legend: {
          display: false,
          position: 'top'
        },
        scales: {
          yAxes: [{
            ticks: {
                beginAtZero: true
            },
              scaleLabel: {
              display: true,
              labelString: 'Number of families'
            }
          }],
          xAxes: [{
              type:'time',
              time: {
                   unit: 'day',
                   displayFormats:{
                       'month': 'DD MMM YYYY'
                       }
              },
              scaleLabel: {
              display: true,
              labelString: 'Date'
            }
          }]
        }     
      };

      var lineChart = new Chart(speedCanvas, {
        type: 'line',
        hover: false,
        data: speedData,
        options: chartOptions
      });
}




}



