import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

/* Angular material */
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';

/* ngx-electron: https://github.com/ThorstenHans/ngx-electron/ */
import { NgxElectronModule } from 'ngx-electron';

/* root services */
import { LocalStorageService } from 'app/services/local-storage/local-storage.service';
import { MidiConnectionService } from 'app/services/midi-connection/midi-connection.service';
import { RoutingService } from 'app/services/routing/routing.service';

import { AppComponent } from './app.component';
import { ToolbarComponent } from 'app/components/toolbar/toolbar.component';
import { StatusBarComponent } from 'app/components/status-bar/status-bar.component';
import { MessageIndicatorComponent } from 'app/components/message-indicator/message-indicator.component';
import { RouteSelectorComponent } from 'app/components/route-selector/route-selector.component';

/* editor module components */
import { InputModuleComponent } from 'app/components/input-module/input-module.component';
import { OutputModuleComponent } from 'app/components/output-module/output-module.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    StatusBarComponent,
    MessageIndicatorComponent,
    RouteSelectorComponent,
    InputModuleComponent,
    OutputModuleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    FlexLayoutModule,
    NgxElectronModule,
    MaterialModule.forRoot()

  ],
  providers: [
    LocalStorageService,
    MidiConnectionService,
    RoutingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
