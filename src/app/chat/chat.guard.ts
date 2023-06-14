import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
  providedIn: 'root'
})
export class ChatGuard  {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private deviceService: DeviceDetectorService) { }

  canActivate(): boolean {
    if(this.deviceService.isMobile()) {
      this.router.navigate([''], {relativeTo: this.activatedRoute})
      return false;
    }
    return true;
  }
}
