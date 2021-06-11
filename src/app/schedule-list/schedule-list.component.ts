import {Component, OnInit} from '@angular/core';
import {ScheduleService} from '../schedule.service';
import {Schedule} from '../model/schedule.model';
import {Router} from '@angular/router';
import {DataService} from '../data.service';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css']
})
export class ScheduleListComponent implements OnInit {

  schedules: Schedule[] = [];

  constructor(private scheduleService: ScheduleService, private router: Router, public dataService: DataService) {
  }

  async ngOnInit(): Promise<void> {
    this.schedules = await this.getListOfSchedules();
    console.log(this.schedules);
  }

  async getListOfSchedules(): Promise<Schedule[]> {
    return this.scheduleService.getListOfSchedules().toPromise();
  }

  // tslint:disable-next-line:typedef
  async openSchedule(scheduleId: string) {
    const schedule = await this.scheduleService.getSchedule(scheduleId).toPromise();
    this.dataService.scheduleData = schedule;
    this.router.navigate(['schedule']);
  }

}
