import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Chart, registerables } from 'chart.js';
import { ProjectService } from '../services/project.service';
Chart.register(...registerables);

//or
// import Chart from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // for chart use show
  public chart: any;
  data: any[] = [];
  labels: string[] = [];
  // *******

  
  
  totalRecod: any;
  allRecord: any;
  closureDelayarray:any;
  constructor(private router: Router, private auth:AuthService, private projectService:ProjectService) {

    this.getallRecord();
  }







  getallRecord() {
    return this.projectService.getAllRecord().subscribe((data => {
      this.allRecord = data;
      console.log(data);
    }))
  }


 



  



  
  gotoList(): void {
    this.router.navigate(['project-list'])
  }

  
  gotoHome():void {
    this.router.navigate(['home']);
  }

  gotoCreateProject(): void {
    this.router.navigate(['add-project'])
  }


// signout method

signOut() {
  this.auth.logOut();
  this.router.navigate(['login-page']);
}

ngOnInit(): void {

  // getting chart data by api
  this.projectService.getChartData().subscribe((data: any) => {
    const chartData = {
      closedProjectsCount: data.closedProjectsCount
    };
    this.createChart(chartData);
  });
}


// chartData
createChart(data: { closedProjectsCount: any[] }): void{
  const departmentLabels: string[] = data.closedProjectsCount.map((item: any) => item.department);
  const closedProjectCounts: number[] = data.closedProjectsCount.map((item: any) => item.closedCount);
  const totalDepartmentCounts: number[] = data.closedProjectsCount.map((item: any) => item.totalCount);
  
  this.chart = new Chart("MyChart", {
    type: 'bar',
    data: {
      labels: departmentLabels,
      datasets: [
        {
          barThickness: 8,
          label: "Total", 
          data: totalDepartmentCounts,
          backgroundColor: ['#025aab']
        },
        {
          barThickness: 8,
          label: "Closed", 
          data: closedProjectCounts,
          backgroundColor: ['#5aa647']
        },
          
      ],  
    },
    options: {
      responsive: true,
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          grid: {
            display: false
          }
        },
      },
      plugins: {
        legend: {
            position: 'bottom',
            display: true,
            labels: {
              usePointStyle: true,
              boxWidth: 1,
              padding: 20
            }
        }
      }   

      
    }  
  });
}



}
