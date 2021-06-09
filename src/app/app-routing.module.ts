import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ScheduleComponent} from './schedule/schedule.component';
import {GeneratorComponent} from './generator/generator.component';
import {ScheduleDebugComponent} from './schedule-debug/schedule-debug.component';

const routes: Routes = [
  { path: '', component: GeneratorComponent},
  { path: 'schedule', component: ScheduleComponent },
  { path: 'schedule-debug', component: ScheduleDebugComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
