import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { MenubarModule } from 'primeng/menubar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from './shared/shared.module';
import { QuickpageComponent } from './quickpage/quickpage.component';
import { LearningComponent } from './learning/learning.component';
import { OpdConsultComponent } from './opd-consult/opd-consult.component';
import { FirstVisitComponent } from './first-visit/first-visit.component';
import { NurseWorklistComponent } from './nurse-worklist/nurse-worklist.component';
import { ChemoVisitComponent } from './chemo-visit/chemo-visit.component';
import { SurgeryComponent } from './surgery/surgery.component';
import { MdtmoduleComponent } from './mdtmodule/mdtmodule.component';
import { ProtocalMasterComponent } from './protocal-master/protocal-master.component';
import { FormsModule } from '@angular/forms';
import { PathwayComponent } from './pathway/pathway.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    ProfileComponent,
    QuickpageComponent,
    LearningComponent,
    OpdConsultComponent,
    FirstVisitComponent,
    NurseWorklistComponent,
    ChemoVisitComponent,
    SurgeryComponent,
    MdtmoduleComponent,
    ProtocalMasterComponent,
    PathwayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    PanelMenuModule ,   
     SharedModule,
     FormsModule
  
  ],
  providers: [ MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
