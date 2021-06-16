import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ScheduleService} from '../schedule.service';
import {Approach, Constraint, InputDataSize, Schedule} from '../model/schedule.model';
import {Router} from '@angular/router';
import {DataService} from '../data.service';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {SelectionModel} from '@angular/cdk/collections';

export class Element {
  name: string;
  parameters: Approach;
  constraints: Constraint;
  inputDataSize: InputDataSize;
  time: number;
  iterationNumber: number;
  fitness: number;
}

const ELEMENT_DATA: Element[] = [];

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css']
})
export class ScheduleListComponent implements OnInit {

  constructor(private scheduleService: ScheduleService, private router: Router, public dataService: DataService) {
  }

  schedules: Schedule[] = [];

  displayedColumns: string[];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  selection = new SelectionModel<Element>(true, []);

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatTable) table: MatTable<Element>;

  async ngOnInit(): Promise<void> {
    this.schedules = await this.getListOfSchedules();
    this.setDisplayedColumns();
    this.setRowsData();
    this.dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
    this.dataSource.sort = this.sort;
    this.table.renderRows();
  }

  async getListOfSchedules(): Promise<Schedule[]> {
    return this.scheduleService.getListOfSchedules().toPromise();
  }

  setDisplayedColumns(): void {
    this.displayedColumns = ['select', 'name', 'parameters', 'constraints', 'input', 'time', 'iterationNumber', 'fitness'];
  }

  setRowsData(): void {
    this.schedules.forEach(schedule => {
      const e = new Element();
      e.name = schedule.name;
      e.parameters = schedule.scheduleParameters.approach;
      e.constraints = null;
      e.inputDataSize = schedule.scheduleParameters.inputDataSize;
      e.time = schedule.time;
      e.fitness = schedule.fitness;
      e.iterationNumber = schedule.iterationNumber;
      ELEMENT_DATA.push(e);
    });
  }

  // tslint:disable-next-line:typedef
  async openSchedule(scheduleId: string) {
    const schedule = await this.scheduleService.getSchedule(scheduleId).toPromise();
    this.dataService.scheduleData = schedule;
    this.router.navigate(['schedule']);
  }

  // tslint:disable-next-line:typedef
  compare() {
    this.router.navigate(['compare']);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  // tslint:disable-next-line:typedef
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  // tslint:disable-next-line:typedef
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Element): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.iterationNumber + 1}`;
  }

}
