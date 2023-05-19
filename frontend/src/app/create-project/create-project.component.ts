import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css'],
})
export class CreateProjectComponent {


 
  // date = new FormControl(new Date());
  // serializedDate = new FormControl((new Date()).toISOString());
  // start_date_as_per_project_plan: number = Date.now();

  addProjectForm!: FormGroup;

  
  
  constructor(
    private formguard: FormBuilder,
     private router: Router, 
     private projectService:ProjectService,
     private auth: AuthService,
     ) {

      
    
  }


// toster service method for use



  ngOnInit() {

    this.addProjectForm = this.formguard.group({
      projectName: ['', Validators.required],
      reasons: ['', Validators.required],
      type: ['', Validators.required],
      division: ['', [Validators.required]],
      category: ['', [Validators.required]],
      priority: ['', Validators.required],
      department: ['', Validators.required],
      start_date_as_per_project_plan:  ['',Validators.required],
      end_date_as_per_project_plan: ['', Validators.required],
      location: ['',Validators.required],
      status: ['Registered', Validators.required]
  });
  }

  // convenience getter for easy access to form fields
  get f() { return this.addProjectForm.controls; }

 


  onSubmit() {


    if(this.addProjectForm.valid) {
    const start_date_as_per_project_plan = new Date(this.addProjectForm.value.start_date_as_per_project_plan);
    const end_date_as_per_project_plan = new Date(this.addProjectForm.value.end_date_as_per_project_plan);
    this.addProjectForm.value.start_date_as_per_project_plan = start_date_as_per_project_plan.toISOString();
    this.addProjectForm.value.end_date_as_per_project_plan = end_date_as_per_project_plan.toISOString();

      console.log(this.addProjectForm.value);
      // storing to the database
      this.projectService.addProject(this.addProjectForm.value).subscribe({
        next:(res)=>{
          // alert('project creation success');
          this.addProjectForm.reset();
          this.router.navigate(['project-list']);
        },

        error:(err) => {
          // alert(err?.error.message)
          console.log(err);
        }
      })
    }
    else {
      this.validateforFields(this.addProjectForm);
      // alert("Please Fill All The Record");
    }

}

// logout method


signOut() {
  this.auth.logOut();
  this.router.navigate(['login-page']);
}



// for validation

private validateforFields(formGroup:FormGroup) {
  Object.keys(formGroup.controls).forEach(field => {
    const control = formGroup.get(field);
    if(control instanceof FormControl) {
      control.markAsDirty({onlySelf:true})
    }
    else if(control instanceof FormGroup) {
      this.validateforFields(control)
    }
  })
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
