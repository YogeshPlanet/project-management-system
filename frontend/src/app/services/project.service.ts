import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private baseUrl = 'http://localhost:3000/projects/';

  constructor(private http: HttpClient, private router: Router) {}

  addProject(addObj: any) {
    return this.http.post<any>(`${this.baseUrl}create`, addObj);
  }

  getAllProject() {
    return this.http.get<any>(`${this.baseUrl}allrecord`);
  }

 

  updateItemStatus(
    id: Number,
    projectName: string,
    reasons: string,
    type:string,
    division: string,
    category: string,
    priority: string,
    department: string,
    start_date_as_per_project_plan: string,
    end_date_as_per_project_plan: string,
    location:string,
    status: string,
    newStatus: string,
  ): Observable<any> {

    const payload = {
      projectName,
      reasons,
      type,
      division,
      category,
      priority,
      department,
      start_date_as_per_project_plan,
      end_date_as_per_project_plan,
      location,
      status: newStatus,
    };

    return this.http.put<any>(`${this.baseUrl}status/${id}`, payload);
  }




  // counts including closure delay
  getAllRecord() {
    return  this.http.get<any>(`${this.baseUrl}all-counts`);
  }

  // for chart data show

  getChartData() {
    return this.http.get<any>(`${this.baseUrl}chart-data`);
  }
}
