import { Injectable } from '@angular/core';
import {Schedule} from './model/schedule.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  scheduleData: Schedule;

  constructor() { }
}
