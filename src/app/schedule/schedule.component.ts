import {Component, OnInit} from '@angular/core';
import {DataService} from '../data.service';
import {Schedule} from '../model/schedule.model';
import {WeekDay} from '@angular/common';

export class Element {
  weekday: string;
  timeSlot: string;
}

const ELEMENT_DATA: Element[] = [];

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  schedule: Schedule;

  displayedColumns: string[];
  dataSource = ELEMENT_DATA;
  //
  // scheduleItems = [
  //   { timeSlot: '08:30 - 10:10', group1: 'Информатика', group2: 'Алгебра'}
  // ];

  // columnsToDisplay = ['timeSlots', '11-001', '11-002'];


  constructor(public dataService: DataService) {
  }

  ngOnInit(): void {
    this.schedule = this.dataService.scheduleData[0];
    console.log(this.schedule);
    this.setDisplayedColumns();
    this.setRowsData();
    console.log(this.displayedColumns);
  }

  setDisplayedColumns(): void {
    this.displayedColumns = this.schedule.scheduleParameters.groups.map((g) => g.number).sort();
    this.displayedColumns.unshift('weekday', 'timeSlot');
  }

  setRowsData(): void {
    this.schedule.schedule.forEach((s) => {
      const groupNumber = s.group.number;
      s.classes.forEach((c) => {
        const weekday = c.scheduleCell.dayOfWeek.toString();
        const timeSlot = c.scheduleCell.timeSlot;
        const timeSlotString = timeSlot.start + '-' + timeSlot.end;
        const lessonString = c.lesson.subject.name + '\n'
          + c.lesson.classType + '\n'
          + c.lesson.teacher.surname + '\n'
          + c.lesson.auditorium.roomNumber;
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


}
