import { NgModule } from '@angular/core';
import { Router, Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/user/home/home.component';
import {LoginComponent} from './components/user/login/login.component';
import {RegisterComponent} from './components/user/register/register.component';
import {ProfileComponent} from './components/user/profile/profile.component';
import {DetailComponent} from './components/user/detail/detail.component';
import {DashboardComponent} from './components/admin/dashboard/dashboard.component';
import {UserListComponent} from './components/admin/user-list/user-list.component';
import {ProductListComponent} from './components/admin/product-list/product-list.component';
import {UnauthorizedComponent} from './components/error/unauthorized/unauthorized.component';
import {NotFoundComponent} from './components/error/not-found/not-found.component';
import {TransactionListComponent} from './components/admin/transaction-list/transaction-list.component';
import {AuthGuard} from './guards/auth.guard';
import {Role} from './model/role';
import {VibhagListComponent} from './components/admin/vibhag-list/vibhag-list.component';
import {DistrictListComponent} from './components/admin/district-list/district-list.component';
import {TalukaListComponent} from './components/admin/taluka-list/taluka-list.component';
import {MandalListComponent} from './components/admin/mandal-list/mandal-list.component';
import {VillageListComponent} from './components/admin/village-list/village-list.component';
import {EntryListComponent} from './components/user/entry-list/entry-list.component';
import {NagarListComponent} from './components/admin/nagar-list/nagar-list.component';
import {VastiListComponent} from './components/admin/vasti-list/vasti-list.component';
import {DashboardPrantComponent} from './components/admin/dashboard-prant/dashboard-prant.component';
import {EntryVastiComponent} from './components/user/entry-vasti/entry-vasti.component';
import {PrantReportComponent} from './components/admin/prant-report/prant-report.component';
import {DatewiseReportComponent} from './components/admin/datewise-report/datewise-report.component';
import {PrantDashboardComponent} from './components/admin/prant-dashboard/prant-dashboard.component';


const routes: Routes = [
  //Main page
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  //User pages
  {path: 'login', component: LoginComponent},
  
  {path: 'register', 
   component: RegisterComponent
//   canActivate: [AuthGuard],
//   data: {roles: [Role.ADMIN]}
  },
  
  {path: 'profile',
  component: ProfileComponent,
  canActivate: [AuthGuard]
  },
  {path: 'detail', component: DetailComponent},
  {path: 'detail/:id', component: DetailComponent},

  //admin panel
  {path: 'taluka-nagar-dashboard',
  component: DashboardComponent,
  canActivate: [AuthGuard],
  //data: {roles: [Role.ADMIN]}
  },

  {path: 'district-dashboard',
  component: DashboardPrantComponent,
  canActivate: [AuthGuard],
  data: {roles: [Role.PRANT,Role.USER]}
  },

  {path: 'datewise-report',
  component: DatewiseReportComponent,
  canActivate: [AuthGuard],
  data: {roles: [Role.USER]}
  },

  {path: 'prant-dashboard',
  component: PrantReportComponent,
  canActivate: [AuthGuard],
  data: {roles: [Role.PRANT]}
  },

  {path: 'prant-report',
  component: PrantDashboardComponent,
  canActivate: [AuthGuard],
  data: {roles: [Role.PRANT]}
  },

  {path: 'user-list',
  component: UserListComponent,
  canActivate: [AuthGuard],
  data: {roles: [Role.ADMIN]}
  },
  {path: 'product-list',
  component: ProductListComponent,
  canActivate: [AuthGuard],
  data: {roles: [Role.ADMIN]}
 },
 {path: 'vibhag-list',
  component: VibhagListComponent,
  canActivate: [AuthGuard],
  data: {roles: [Role.ADMIN]}
 },
  {path: 'district-list',
  component: DistrictListComponent,
  canActivate: [AuthGuard],
  data: {roles: [Role.ADMIN]}
 },

  {path: 'taluka-list',
  component: TalukaListComponent,
  canActivate: [AuthGuard],
  data: {roles: [Role.ADMIN]}
 },

  {path: 'nagar-list',
  component: NagarListComponent,
  canActivate: [AuthGuard],
  data: {roles: [Role.ADMIN]}
 },

  {path: 'vasti-list',
  component: VastiListComponent,
  canActivate: [AuthGuard],
  data: {roles: [Role.ADMIN]}
 },


  {path: 'mandal-list',
  component: MandalListComponent,
  canActivate: [AuthGuard],
  data: {roles: [Role.ADMIN]}
 },

  {path: 'village-list',
  component: VillageListComponent,
  canActivate: [AuthGuard],
  data: {roles: [Role.ADMIN]}
 },

 {path: 'entry-list',
  component: EntryListComponent,
  canActivate: [AuthGuard],
  data: {roles: [Role.TALUKA]}
 },

 {path: 'entry-vasti',
  component: EntryVastiComponent,
  canActivate: [AuthGuard],
  data: {roles: [Role.NAGAR]}
 },

 {path: 'transaction-list',
 component: TransactionListComponent,
 canActivate: [AuthGuard],
 data: {roles: [Role.ADMIN]}
},

  //error pages
  {path: '404', component: NotFoundComponent},
  {path: '401', component: UnauthorizedComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
constructor(private router: Router) {
  this.router.errorHandler = (error: any) => {
    this.router.navigate(['/404']);
  }
}
}
