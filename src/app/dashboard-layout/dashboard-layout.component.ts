import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit {
  loggedIn = false;
  constructor(private cookieService: CookieService, private _router: Router) { }

  ngOnInit(): void {
    const token = this.cookieService.get('login');
    if (!token) {
      this._router.navigate(['auth/login'])
    } else {
      // fetch sidebar data
    }
  }



}
