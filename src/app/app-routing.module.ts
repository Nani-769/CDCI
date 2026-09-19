import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ProfileComponent } from './profile/profile.component';
import { QuickpageComponent } from './quickpage/quickpage.component';
import { OpdConsultComponent } from './opd-consult/opd-consult.component';
import { NurseWorklistComponent } from './nurse-worklist/nurse-worklist.component';
import { FirstVisitComponent } from './first-visit/first-visit.component';
import { ChemoVisitComponent } from './chemo-visit/chemo-visit.component';
import { SurgeryComponent } from './surgery/surgery.component';
import { MdtmoduleComponent } from './mdtmodule/mdtmodule.component';
import { ProtocalMasterComponent } from './protocal-master/protocal-master.component';
import { PathwayComponent } from './pathway/pathway.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'profile', component: ProfileComponent },
   { path: 'worklist', component: QuickpageComponent },
   { path: 'opd', component: OpdConsultComponent },
   { path: 'nurse-wworklist', component: NurseWorklistComponent },
   { path: 'firstvisit', component: FirstVisitComponent },
   { path: 'chemo-visit', component: ChemoVisitComponent },
   { path: 'surgery', component: SurgeryComponent },
   { path: 'mdtmodule', component: MdtmoduleComponent },
   { path: 'protocal', component: ProtocalMasterComponent },
   { path: 'pathway', component: PathwayComponent },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
