import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ScheduleComponent} from './schedule/schedule.component';
import {GeneratorComponent} from './generator/generator.component';
import {ScheduleDebugComponent} from './schedule-debug/schedule-debug.component';
import {ScheduleListComponent} from './schedule-list/schedule-list.component';
import {ResultComponent} from './result/result.component';
import {CompareComponent} from './compare/compare.component';

const routes: Routes = [
  {path: '', component: GeneratorComponent},
  {path: 'schedule', component: ScheduleComponent},
  {path: 'schedule-debug', component: ScheduleDebugComponent},
  {path: 'list', component: ScheduleListComponent},
  {path: 'result', component: ResultComponent},
  {path: 'compare', component: CompareComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
