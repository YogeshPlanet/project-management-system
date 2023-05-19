import { APP_INITIALIZER, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { DatePipe } from '@angular/common';
import { SearchFilterPipe } from '../search-filter.pipe';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
  
})
export class ProjectListComponent {
  // for search pipe use
  searchData: any[] = [];
  filteredProjects: any[] = [];
  searchKey: string = "";
  // ************

  // for pagination data use
  totalRecord!: number;
  page: number = 1;
  // **************

  // for sort data use
  selectedSortOption: string = " 'projectName', 'reasons','type','division','category','priority','department','location','status'";
  tableData : any[] = [];
  // ***********

  projectList : any;

  // for update use INITIALIZED
  items: any;
  
  
  constructor(private router: Router, private projectService:ProjectService, public datePipe: DatePipe, private searchFilter: SearchFilterPipe, private auth: AuthService  ) {


    this.projectService.getAllProject().subscribe((data =>{
      // console.log('project list', data);

      this.projectList = data;

      this.totalRecord = data.length

      console.log(data);
    }));
  }

   



 ngOnInit(): void {
  
  // default call for searchfilter pipe
  this.filteredProjects = this.projectList;
 }

 updateStatus(id: number,
  projectName: string,
  reasons: string,
  type:string,
  division: string,
  category: string,
  priority: string,
  department: string,
  start_date_as_per_project_plan: string,
  end_date_as_per_project_plan: string,
  location: string,
  status: string,
  newStatus: string,
  ): void {
  this.projectService.updateItemStatus(id, projectName,reasons,type,division,category,priority,department,start_date_as_per_project_plan, end_date_as_per_project_plan,location, status,newStatus,).subscribe(
    (response) => {
      debugger
      console.log('Success:', response);
      // update the table data with the new status value
      if (this.items && this.items.length > 0) {
        const updatedItemIndex = this.items.findIndex((item:any) => item.id === id);
      
        if (updatedItemIndex !== -1) {
          const updatedItem = {...this.items[updatedItemIndex], status: newStatus};
          const updatedItems = [...this.items];
          updatedItems[updatedItemIndex] = updatedItem;
          this.items = updatedItems;
        }
      }

    },
    (error) => {
      console.error('Error:', error);
    }
  );
}

// logout method

signOut() {
  this.auth.logOut();
  this.router.navigate(['login-page']);
}


// search pipe method make search
//   projectName String
//   reasons String
//   type String
//   division String
//   category String
//   priority String
//   department String
//   start_date_as_per_project_plan DateTime
//   end_date_as_per_project_plan DateTime
//   location String
//   status  String
onSearch() {
  this.filteredProjects = this.projectList.filter((searchData:any) => {
    debugger
    const projectName = searchData.projectName.toLowerCase()
    const reasons = searchData.reasons.toLowerCase()
    const type  = searchData.type.toLowerCase()
    const division  = searchData.division.toLowerCase()
    const category  = searchData.category.toLowerCase()
    const priority  = searchData.priority.toLowerCase()
    const department  = searchData.department.toLowerCase()
    // const start_date_as_per_project_plan = new Date(this.addProjectForm.value.start_date_as_per_project_plan)

    const start_date_as_per_project_plan  = new Date( searchData.start_date_as_per_project_plan.toLowerCase())
    const end_date_as_per_project_plan  = searchData.end_date_as_per_project_plan.toLowerCase()
    const location  = searchData.location.toLowerCase()
    const status  = searchData.status.toLowerCase()

    return(
      projectName.includes(this.searchKey.toLowerCase()) ||
      reasons.includes(this.searchKey.toLowerCase()) ||
      type.includes(this.searchKey.toLowerCase()) ||
      division.includes(this.searchKey.toLowerCase()) ||
      category.includes(this.searchKey.toLowerCase()) ||
      priority.includes(this.searchKey.toLowerCase()) ||
      department.includes(this.searchKey.toLowerCase()) ||
      start_date_as_per_project_plan.getTime() === new Date(this.searchKey).getTime() ||
      end_date_as_per_project_plan.includes(this.searchKey.toLowerCase()) ||
      location.includes(this.searchKey.toLowerCase()) ||
      status.includes(this.searchKey.toLowerCase()) 
    );
      
  });

  }

  
  // for sort
  sortTable(): void {

    this.tableData = this.projectList
    this.tableData.sort((a, b) => {
      const sortOption = this.selectedSortOption;
      if (a[sortOption] < b[sortOption]) {
        return -1;
      } else if (a[sortOption] > b[sortOption]) {
        return 1;
      } else {
        return 0;
      }
    });
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

}
