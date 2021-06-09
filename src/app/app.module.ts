import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {SideBarComponent} from './side-bar/side-bar.component';
import {GenerationFormComponent} from './generation-form/generation-form.component';
import {GeneratorComponent} from './generator/generator.component';
import {SortablejsModule} from 'ngx-sortablejs';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { ScheduleComponent } from './schedule/schedule.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import { ScheduleDebugComponent } from './schedule-debug/schedule-debug.component';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    GenerationFormComponent,
    GeneratorComponent,
    ScheduleComponent,
    ScheduleDebugComponent
  ],
    imports: [
        BrowserModule,
        SortablejsModule.forRoot({animation: 150}),
        FormsModule,
        HttpClientModule,
        BrowserModule,
        RouterModule.forRoot([
            {path: '', component: GeneratorComponent},
        ]),
        AppRoutingModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatButtonModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
