import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  isLoading: boolean = false;

  constructor(
    private loadingService: LoadingService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadingService.isLoading.subscribe(isLoading => {
      this.isLoading = isLoading;
      this.changeDetectorRef.detectChanges();
    });
  }

}
