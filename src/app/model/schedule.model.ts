import {WeekDay} from '@angular/common';

export class Schedule {
  id: string;
  iterationNumber: number;
  name: string;
  populationId: string;
  fitness: number;
  schedule: ScheduleItem[];
  scheduleParameters: ScheduleParameters;
}

export interface ScheduleParameters {
  groups: Group[];
  timeSlots: TimeSlot[];
  lectureDays: WeekDay[];
}

export class SaveScheduleRequest {
  constructor(id: string, populationId: string, iterationNumber: number) {
    this.id = id;
    this.populationId = populationId;
    this.iterationNumber = iterationNumber;
  }

  id: string;
  populationId: string;
  iterationNumber: number;

}

export interface ScheduleItem {
  group: Group;
  classes: CellClass[];
}

export interface Group {
  id: number;
  number: string;
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

export class Class {
  subject: Subject;
  teacher: Teacher;
  auditorium: Auditorium;
  classType: ClassType;

  toString(): string {
    return this.subject.name + '\n'
      + this.classType + '\n'
      + this.teacher.toString() + '\n'
      + this.auditorium.roomNumber;
  }
}

export class TimeSlot {
  number: number;
  start: string;
  end: string;

  toString(): string {
    return this.start + '-' + this.end;
  }
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

export interface InputData {
  auditoriums: any[];
  groups: any[];
  teachers: any[];

}

export class GeneratorRequest {
  name: string;
  divideOnLectureAndPracticeDays: boolean;
  fixAuditoriumFor: FixAuditoriumFor;
  isFreeDayRequired: boolean;
  divideOnShifts: boolean;
  semesterNumber: number;
  algorithmType: AlgorithmType;
  inputData: InputData;

  constructor(name: string,
              divideOnLectureAndPracticeDays: boolean,
              fixAuditoriumFor: FixAuditoriumFor,
              isFreeDayRequired: boolean,
              divideOnShifts: boolean,
              algorithmType: AlgorithmType,
              data: InputData) {
    this.name = name;
    this.divideOnLectureAndPracticeDays = divideOnLectureAndPracticeDays;
    this.fixAuditoriumFor = fixAuditoriumFor;
    this.isFreeDayRequired = isFreeDayRequired;
    this.divideOnShifts = divideOnShifts;
    this.algorithmType = algorithmType;
    this.semesterNumber = 1;
    this.inputData = data;
  }

}

export class NextIterationRequest {
  populationIdList: string[];

  constructor(populationIdList: string[]) {
    this.populationIdList = populationIdList;
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
