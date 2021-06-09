import {Component, OnInit} from '@angular/core';
import {ScheduleService} from '../schedule.service';
import {AlgorithmType, GeneratorRequest, Schedule} from '../model/schedule.model';
import {Router} from '@angular/router';
import {DataService} from '../data.service';

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
  debugMode = false;

  schedule = new Schedule();

  constructor(private scheduleService: ScheduleService, private router: Router, public dataService: DataService) {
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  async processGeneration() {
    if (this.debugMode) {
      this.initGeneration();
    } else {
      this.generate();
    }
  }

  // tslint:disable-next-line:typedef
  async generate() {
    const request = new GeneratorRequest(this.divideOnLectureAndPracticeDays,
      this.fixAuditoriumFor, this.isFreeDayRequired, this.divideOnShifts, this.algorithmType);
    this.dataService.scheduleData = await this.scheduleService.generate(request).toPromise();
    this.router.navigate(['schedule']);
  }

  // tslint:disable-next-line:typedef
  async initGeneration() {
    const request = new GeneratorRequest(this.divideOnLectureAndPracticeDays,
      this.fixAuditoriumFor, this.isFreeDayRequired, this.divideOnShifts, this.algorithmType);
    this.dataService.scheduleData = await this.scheduleService.initGeneration(request).toPromise();
    this.router.navigate(['schedule-debug']);
  }
}
