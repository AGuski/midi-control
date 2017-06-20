import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

/* Angular material */
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';

/* ngx-electron: https://github.com/ThorstenHans/ngx-electron/ */
import { NgxElectronModule } from 'ngx-electron';

import { SharedModule } from './shared/shared.module';
import { WidgetsModule } from './widget-components/widgets.module';

/* root services */
import { SettingsService } from './services/settings/settings.service';
import { MidiConnectionService } from 'app/services/midi-connection/midi-connection.service';
import { RoutingService } from 'app/services/routing/routing.service';
import { NetworkService } from 'app/services/network/network.service';
import { SessionService } from './services/session/session.service';
import { WidgetService } from './services/widget/widget.service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    NgxElectronModule,
    SharedModule,
    WidgetsModule,
    MaterialModule.forRoot(),
  ],
  providers: [
    SettingsService,
    MidiConnectionService,
    RoutingService,
    NetworkService,
    SessionService,
    WidgetService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
