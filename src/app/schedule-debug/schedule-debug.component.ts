import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {NextIterationRequest, SaveScheduleRequest, Schedule} from '../model/schedule.model';
import {DataService} from '../data.service';
import {ScheduleService} from '../schedule.service';
import {MatTable} from '@angular/material/table';
import {Router} from '@angular/router';

export class Element {
  weekday: string;
  timeSlot: string;
}

let ELEMENT_DATA: Element[] = [];

@Component({
  selector: 'app-schedule-debug',
  templateUrl: './schedule-debug.component.html',
  styleUrls: ['./schedule-debug.component.css']
})
export class ScheduleDebugComponent implements OnInit {

  @ViewChild(MatTable) table: MatTable<Element>;

  schedule: Schedule;
  populationIdList: string[] = [];

  displayedColumns: string[];
  dataSource = ELEMENT_DATA;
  iterationNum = 1;

  constructor(public dataService: DataService, private scheduleService: ScheduleService, private router: Router) {
  }

  ngOnInit(): void {
    this.schedule = this.dataService.scheduleData[0];
    console.log(this.schedule);
    this.populationIdList[0] = this.schedule.populationId;
    console.log(this.populationIdList);
    this.setDisplayedColumns();
    console.log(this.displayedColumns);
    this.setRowsData();
    console.log(ELEMENT_DATA);
  }

  setDisplayedColumns(): void {
    this.displayedColumns = this.schedule.scheduleParameters.groups.map((g) => g.number).sort();
    this.displayedColumns.unshift('weekday', 'timeSlot');
  }

  setRowsData(): void {
    console.log('setRowsData');
    this.schedule.schedule.forEach((s) => {
      const groupNumber = s.group.number;
      s.classes.forEach((c) => {
        const weekday = c.scheduleCell.dayOfWeek.toString();
        const timeSlot = c.scheduleCell.timeSlot;
        const timeSlotString = timeSlot.start + '-' + timeSlot.end;
        let lessonString = c.lesson.subject.name + '\n'
          + c.lesson.classType;
        if (c.lesson.teacher) {
          lessonString += c.lesson.teacher.surname + '\n';
        }
        if (c.lesson.auditorium) {
          lessonString += c.lesson.auditorium.roomNumber;
        }
        const elemIndex = ELEMENT_DATA.findIndex((element) => element.weekday === weekday && element.timeSlot === timeSlotString);
        if (elemIndex > -1) {
          ELEMENT_DATA[elemIndex][groupNumber] = lessonString;
        } else {
          const row = new Element();
          row.weekday = weekday;
          row.timeSlot = timeSlotString;
          row[groupNumber] = lessonString;
          ELEMENT_DATA.push(row);
        }
      });
    });
    this.sortRowsData();
  }

  sortRowsData(): void {
    const weekDays = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    ELEMENT_DATA.sort((a, b) => {
      if (a.weekday === b.weekday) {
        if (Number(a.timeSlot.split(':')[0]) > Number(b.timeSlot.split(':')[0])) {
          return 1;
        } else {
          return -1;
        }
      } else {
        if (weekDays.indexOf(a.weekday) > weekDays.indexOf(b.weekday)) {
          return 1;
        } else {
          return -1;
        }
      }
    });
  }

  // tslint:disable-next-line:typedef
  async nextIteration() {
    const scheduleData = await this.scheduleService.nextIteration(new NextIterationRequest(this.populationIdList)).toPromise();
    this.schedule = scheduleData[0];
    this.populationIdList = Array.of(this.schedule.populationId);
    ELEMENT_DATA = [];
    this.setRowsData();
    this.dataSource = ELEMENT_DATA;
    this.table.renderRows();
    this.iterationNum++;
  }

  // tslint:disable-next-line:typedef
  async save() {
    console.log('click ' + this.schedule.id);
    const result = await this.scheduleService
      .save(new SaveScheduleRequest(this.schedule.id, this.populationIdList[0], this.iterationNum)).toPromise();
    this.schedule.iterationNumber = this.iterationNum;
    this.dataService.scheduleData = this.schedule;
    this.router.navigate(['result']);
  }

}
