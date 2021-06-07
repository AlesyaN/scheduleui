import {WeekDay} from '@angular/common';

export class Schedule {
  id: number;
  name: string;
  populationId: any;
  fitness: number;
  schedule: ScheduleItem[];
}

export interface ScheduleItem {
  group: Group;
  classes: CellClass[];
}

export interface Group {
  id: number;
  number: number;
  count: number;
}

export interface CellClass {
  scheduleCell: ScheduleCell;
  lesson: Class;
}

export interface ScheduleCell {
  dayOfWeek: WeekDay;
  timeSlot: TimeSlot;
}

export interface Class {
  subject: Subject;
  teacher: Teacher;
  auditorium: Auditorium;
  classType: ClassType;
}

export interface TimeSlot {
  number: number;
  start: string;
  end: string;
}

export interface Subject {
  name: string;
}

export interface Teacher {
  name: string;
  surname: string;
  patronymic: string;
}

export interface Auditorium {
  roomNumber: string;
}

export enum ClassType {
  GYM = 'Спортивный зал',
  LECTURE = 'Лекция',
  SEMINAR = 'Практика'
}

export class GeneratorRequest {
  name: string;
  divideOnLectureAndPracticeDays: boolean;
  fixAuditoriumFor: FixAuditoriumFor;
  isFreeDayRequired: boolean;
  divideOnShifts: boolean;
  semesterNumber: number;
  algorithmType: AlgorithmType;

  constructor(divideOnLectureAndPracticeDays: boolean,
              fixAuditoriumFor: FixAuditoriumFor,
              isFreeDayRequired: boolean,
              divideOnShifts: boolean,
              algorithmType: AlgorithmType) {
    this.divideOnLectureAndPracticeDays = divideOnLectureAndPracticeDays;
    this.fixAuditoriumFor = fixAuditoriumFor;
    this.isFreeDayRequired = isFreeDayRequired;
    this.divideOnShifts = divideOnShifts;
    this.algorithmType = algorithmType;
    this.semesterNumber = 1;
  }

}

export enum FixAuditoriumFor {
  TEACHER = 'Teacher',
  GROUP = 'Group',
  SUBJECT = 'Subject'
}

export enum AlgorithmType {
  GENETIC = 'GENETIC',
  ANNEALING = 'ANNEALING'
}
