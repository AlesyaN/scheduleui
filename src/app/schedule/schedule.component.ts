import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  scheduleItems = [
    { timeSlot: '08:30 - 10:10',
      classes: [
        { subject: 'Информатика',
          teacher: 'Aбрамский'},
        { subject: 'Линейная алгебра',
          teacher: 'Арсланов'}
      ]
    }
  ];

  displayedColumns: string[] = ['timeSlots', '11-001', '11-002', '11-003', '11-004', '11-005',
    '11-006', '11-007', '11-008', '11-009', '11-010'];

  constructor() { }

  ngOnInit(): void {
  }

}
