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
//import * as jspdf from 'jspdf';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
declare var $: any;

@Component({
  selector: 'app-prant-report',
  templateUrl: './prant-report.component.html',
  styleUrls: ['./prant-report.component.css']
})
export class PrantReportComponent implements OnInit {

  @ViewChild('loader',{static: true}) loader: ElementRef;

  districtList: Array<District>;
  district: District;
  totalVillages:number = 0;
  totalMandals:number = 0;
  totalVastis:number = 0;
  totalNagars:number = 0;
  coveredVillages:number = 0;
  coveredMandals:number = 0;
  coveredVastis:number = 0;
  coveredNagars:number = 0;
  loading : boolean = true;
  loading1: boolean = false;

  constructor(private adminService: AdminService,private renderer: Renderer2) { }

  ngOnInit() {
  
    this.findAtPrantLevel();


    setTimeout(()=>{        
        this.loading = false;
        this.findAllDistricts();
     }, 2000);


  }
 
  refresh()
  {
  	this.findAllDistricts();
  	this.findAtPrantLevel();  		
  }

  findAtPrantLevel(){
  	this.adminService.numberOfVillages().subscribe((data)=>{
  			this.totalVillages = data.response;
  	});


  	this.adminService.numberOfVastis().subscribe((data)=>{
  			this.totalVastis = data.response;
  	});

  	this.adminService.numberOfNagars().subscribe((data)=>{
  			this.totalNagars = data.response;
  	});

  	this.adminService.numberOfMandals().subscribe((data)=>{
		this.totalMandals = data.response;
    });

	this.adminService.findCoveredVillages().subscribe((data)=>{
  			this.coveredVillages = data.length;
  	});  	

	this.adminService.findCoveredMandals().subscribe((data)=>{
  			this.coveredMandals = data.length;
  	});  	

	this.adminService.findCoveredVastis().subscribe((data)=>{
  			this.coveredVastis = data.length;
  	});  	

	this.adminService.findCoveredNagars().subscribe((data)=>{
  			this.coveredNagars = data.length;
  	});  	

  }


  findAllDistricts(){
		
  	this.adminService.findAllDistricts().subscribe(data=>{
  		this.districtList=data;

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

  			this.drawBar(x,y,"bar","Villages Covered");

  		});


		this.adminService.coveredVastisPerDistrict().subscribe((data)=>{
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

  			this.drawBar(x,y,"bar1","Vastis Covered");

  		});



  	});

  }

getRandomColor() : string {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}  	


	drawBar(x:Array<Number>,y:Array<Number>,type:string,title: string)
	{

		//console.log("drawbar");
		//console.log(x);

		var barContext = document.getElementById(type);
		var barChartData = {
		  labels: x,
		  datasets: [
		    {
		      label:"Data",
		      backgroundColor: this.getRandomColor(),
		      borderColor: this.getRandomColor(),
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
		    text: title
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

public convertToPDF()
{

  let con = document.getElementById('contentToConvert');
  html2canvas(con).then(canvas => {
  // Few necessary setting options
  let imgWidth = 208;
  let pageHeight = 295;
  let imgHeight = canvas.height * imgWidth / canvas.width;
  let heightLeft = imgHeight;
   
  const contentDataURL = canvas.toDataURL('image/png')
  let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
  let position = 0;
  pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
  pdf.save('new-file.pdf'); // Generated PDF
  });

}


getPDF(){

    let HTML_Width = $("#contentToConvert").width();
    let HTML_Height = $("#contentToConvert").height();
    let top_left_margin = 15;
    let PDF_Width = HTML_Width+(top_left_margin*2);
    let PDF_Height = (PDF_Width*1.5)+(top_left_margin*2);
    let canvas_image_width = HTML_Width;
    let canvas_image_height = HTML_Height;
    
    let totalPDFPages = Math.ceil(HTML_Height/PDF_Height)-1;
    

    html2canvas($("#contentToConvert")[0],{allowTaint:true}).then(function(canvas) {
      canvas.getContext('2d');
      
      console.log(canvas.height+"  "+canvas.width);
      
      
      let imgData = canvas.toDataURL("image/jpeg", 1.0);
      let pdf = new jspdf('p', 'pt',  [PDF_Width, PDF_Height]);
        pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin,canvas_image_width,canvas_image_height);
      
      
      for (let i = 1; i <= totalPDFPages; i++) { 
        pdf.addPage([PDF_Width, PDF_Height]);
        pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
      }
      
    
      pdf.save("HTML-Document.pdf");
    
    });
  };










}
