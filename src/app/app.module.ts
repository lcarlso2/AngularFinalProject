import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { PCBuildListComponent } from './pcs/builds/pc-build-list/pc-build-list.component';
import { PCPartCreateComponent } from './pcs/parts/pc-part-create/pc-part-create.component';
import { PCService } from './services/pc.service';
import { PCPartEditComponent } from './pcs/parts/pc-part-edit/pc-part-edit.component'
import { PCPartListComponent } from './pcs/parts/pc-part-list/pc-part-list.component';
import { PartTypePipe } from './pipes/part-type-pipe';
import { PCPartItemComponent } from './pcs/parts/pc-part-item/pc-part-item.component';
import { PcBuildItemComponent } from './pcs/builds/pc-build-item/pc-build-item.component';
import { PcBuildEditComponent } from './pcs/builds/pc-build-edit/pc-build-edit.component';
import { PcBuildCreateComponent } from './pcs/builds/pc-build-create/pc-build-create.component';
import { PcBuildDetailComponent } from './pcs/builds/pc-build-detail/pc-build-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    PCBuildListComponent,
    PCPartCreateComponent,
    PCPartEditComponent,
    PCPartListComponent,
    PartTypePipe,
    PCPartItemComponent,
    PcBuildItemComponent,
    PcBuildEditComponent,
    PcBuildCreateComponent,
    PcBuildDetailComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'home', component: HomeComponent},
      {path: 'builds', component: PCBuildListComponent},
      {path: 'create', component: PCPartCreateComponent},
      {path: 'parts/:type', component: PCPartListComponent},
      {path: 'parts', component: PCPartListComponent},
      {path : '', redirectTo:'home', pathMatch:'full'},
      {path : '**', redirectTo:'home', pathMatch:'full'}
    ]),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
