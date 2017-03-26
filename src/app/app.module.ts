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

@NgModule({
  declarations: [
    AppComponent
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
