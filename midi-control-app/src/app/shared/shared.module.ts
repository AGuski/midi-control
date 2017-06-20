import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/* Angular material */
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { ServerSetupComponent } from './server-setup/server-setup.component';
import { StatusBarComponent } from './status-bar/status-bar.component';
import { MessageIndicatorComponent } from './message-indicator/message-indicator.component';
import { RouteSelectorComponent } from './route-selector/route-selector.component';
import { WidgetsLoaderDirective } from './widgets-loader/widgets-loader.directive';
import { RouteInputComponent } from './route-input/route-input.component';
import { RouteOutputComponent } from './route-output/route-output.component';

@NgModule({
  declarations: [
    ToolbarComponent,
    SideMenuComponent,
    StatusBarComponent,
    ServerSetupComponent,
    MessageIndicatorComponent,
    RouteSelectorComponent,
    SideMenuComponent,
    WidgetsLoaderDirective,
    RouteInputComponent,
    RouteOutputComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule.forRoot(),
  ],
  exports: [
    ToolbarComponent,
    SideMenuComponent,
    StatusBarComponent,
    ServerSetupComponent,
    MessageIndicatorComponent,
    RouteSelectorComponent,
    SideMenuComponent,
    WidgetsLoaderDirective,
    RouteInputComponent,
    RouteOutputComponent
  ],
  providers: [],
})
export class SharedModule { }
