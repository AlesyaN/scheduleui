import {Component, OnInit} from '@angular/core';
import {ScheduleService} from '../schedule.service';
import {
  AlgorithmType, GeneratorRequest,
  Schedule
} from '../model/schedule.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-generation-form',
  templateUrl: './generation-form.component.html',
  styleUrls: ['./generation-form.component.css']
})
export class GenerationFormComponent implements OnInit {

  items = [];
  scheduleName = '';
  divideOnLectureAndPracticeDays = false;
  fixAuditoriumFor = null;
  isFreeDayRequired = false;
  divideOnShifts = false;
  algorithmType = AlgorithmType.GENETIC;

  schedule = new Schedule();

  constructor(private scheduleService: ScheduleService, private router: Router) {
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  async generate() {
    const request = new GeneratorRequest(this.divideOnLectureAndPracticeDays,
      this.fixAuditoriumFor, this.isFreeDayRequired, this.divideOnShifts, this.algorithmType);
    const schedule = await this.scheduleService.generate(request).toPromise();
    console.log(schedule);
    this.router.navigate(['schedule']);
  }
}
