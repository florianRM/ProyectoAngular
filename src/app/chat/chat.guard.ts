import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChatGuard  {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  canActivate(): boolean {
    if(window.screen.width < 480) {
      this.router.navigate([''], {relativeTo: this.activatedRoute})
      return false;
    }
    return true;
  }
}
