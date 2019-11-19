import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { PcBuildComponent } from './pcs/build/pc-build.component';
import { CreatePcPartComponent } from './pcs/part/create-pc-part.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    PcBuildComponent,
    CreatePcPartComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'home', component: HomeComponent},
      {path: 'builds', component: PcBuildComponent},
      {path: 'create', component: CreatePcPartComponent},
      {path : '', redirectTo:'home', pathMatch:'full'},
      {path : '**', redirectTo:'home', pathMatch:'full'}
    ]),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
