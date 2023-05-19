import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent {
  type:string = "password";
  isText:boolean = false;
  eyeImg:string = "..assets/images/hide-password.png";
  loginErrorMessage = ""
  loginForm!: FormGroup;

  loading: boolean = false;

  constructor(private formguard: FormBuilder,   private auth: AuthService, private router:Router) {}



  ngOnInit() {
    this.loginForm = this.formguard.group({
      email: ['', [Validators.required, 
        Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    if(this.loginForm.valid) {

      console.log(this.loginForm.value);

      setTimeout(() => {

        this.loading = true;
     


      // on the way to database side
      this.auth.login(this.loginForm.value).subscribe({
        next:(res)=>{
          // alert(res.message)
          this.auth.storeToken(res.token);
          this.loginForm.reset();
          this.router.navigate(['home']);
          
        },

        error:(err) => {
          // alert(err?.error.message)
          // this.loginErrorMessage = err;
          // console.log(this.loginErrorMessage);

          this.loginErrorMessage = err.error.message;
          this.loading = false;

        }
      });
    },700);

    }
    else {
      // thrown error
      this.validateAllFormFields(this.loginForm);
      // alert("form is not valid");
    }
  }



  private validateAllFormFields(formGroup:FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if(control instanceof FormControl) {
        control.markAsDirty({onlySelf:true})
      }
      else if(control instanceof FormGroup) {
        this.validateAllFormFields(control)
      }
    })
  }



  hideShowPass() {
    this.isText = !this.isText; 
    this.isText ? this.eyeImg = "..assets/images/calendar.png" : this.eyeImg = "..assets/images/hide-password.png"
    this.isText ? this.type = "text" : this.type = "password";
  }



}
