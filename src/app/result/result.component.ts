import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../data.service';
import {Schedule} from '../model/schedule.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  @ViewChild('progress') progress: ElementRef;
  schedule: Schedule;

  constructor(public dataService: DataService,  private router: Router) {
  }

  ngOnInit(): void {
    this.schedule = this.dataService.scheduleData;
    this.progress.nativeElement.percent = this.schedule.fitness;
    console.log(this.progress);
  }

  // tslint:disable-next-line:typedef
  next() {
    this.router.navigate(['list']);
  }

}
