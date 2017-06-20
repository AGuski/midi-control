import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';

import { SharedModule } from '../shared/shared.module';

/* editor widgets components */
import { WidgetComponent } from './widget/widget.component';
import { InputWidgetComponent } from './input-widget/input-widget.component';
import { NetworkWidgetComponent } from './network-widget/network-widget.component';
import { OutputWidgetComponent } from './output-widget/output-widget.component';
import { SingleControlWidgetComponent } from './single-control-widget/single-control-widget.component';
import { TransposeWidgetComponent } from './transpose-widget/transpose-widget.component';

@NgModule({
  declarations: [
    WidgetComponent,
    InputWidgetComponent,
    OutputWidgetComponent,
    NetworkWidgetComponent,
    SingleControlWidgetComponent,
    TransposeWidgetComponent
  ],
  entryComponents: [
    WidgetComponent,
    SingleControlWidgetComponent,
    NetworkWidgetComponent,
    InputWidgetComponent,
    OutputWidgetComponent,
    TransposeWidgetComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule.forRoot(),
    SharedModule
  ],
  providers: [ ]
})
export class WidgetsModule { }
