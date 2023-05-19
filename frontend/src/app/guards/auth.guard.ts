import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthGuard {

  constructor( private auth : AuthService, private router : Router ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log("Is logged in:", this.auth.isLoggedIn()); 
    if (this.auth.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(["login-page"]);
      return false;
    }
  }
}