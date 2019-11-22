import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { PcBuildComponent } from './pcs/build/pc-build.component';
import { CreatePcPartComponent } from './pcs/parts/pc-part-create/pc-part-create.component';
import { PCService } from './services/pc.service';
import { EditPcPartComponent } from './pcs/parts/pc-part-edit/pc-part-edit.component'
import { ListPcPartComponent } from './pcs/parts/pc-part-list/pc-part-list.component';
import { PartTypePipe } from './pipes/part-type-pipe';
import { PcPartItemComponent } from './pcs/parts/pc-part-item/pc-part-item.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    PcBuildComponent,
    CreatePcPartComponent,
    EditPcPartComponent,
    ListPcPartComponent,
    PartTypePipe,
    PcPartItemComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'home', component: HomeComponent},
      {path: 'builds', component: PcBuildComponent},
      {path: 'create', component: CreatePcPartComponent},
      {path: 'parts/:type', component: ListPcPartComponent},
      {path: 'parts', component: ListPcPartComponent},
      {path : '', redirectTo:'home', pathMatch:'full'},
      {path : '**', redirectTo:'home', pathMatch:'full'}
    ]),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
