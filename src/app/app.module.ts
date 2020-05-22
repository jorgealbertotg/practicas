import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlusSidebarSuperiorComponent } from './components/plus-sidebar-superior/plus-sidebar-superior.component';

@NgModule({
  declarations: [
    AppComponent,
    PlusSidebarSuperiorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
