import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { HomeComponent } from './components/user/home/home.component';
import { DetailComponent } from './components/user/detail/detail.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { UserListComponent } from './components/admin/user-list/user-list.component';
import { ProductListComponent } from './components/admin/product-list/product-list.component';
import { UserTemplateComponent } from './components/template/user-template/user-template.component';
import { AdminTemplateComponent } from './components/template/admin-template/admin-template.component';
import { NotFoundComponent } from './components/error/not-found/not-found.component';
import { UnauthorizedComponent } from './components/error/unauthorized/unauthorized.component';

import {
  MatButtonModule, MatCardModule,
  MatInputModule, MatListModule,
  MatToolbarModule, MatSelectModule,
  MatFormFieldModule, MatTableModule,
  MatPaginatorModule, MatSortModule,
  MatProgressBarModule, MatIconModule,
  MatProgressSpinnerModule
} from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TransactionListComponent } from './components/admin/transaction-list/transaction-list.component';
import { VibhagListComponent } from './components/admin/vibhag-list/vibhag-list.component';
import { DistrictListComponent } from './components/admin/district-list/district-list.component';
import { TalukaListComponent } from './components/admin/taluka-list/taluka-list.component';
import { MandalListComponent } from './components/admin/mandal-list/mandal-list.component';
import { VillageListComponent } from './components/admin/village-list/village-list.component';
import { EntryListComponent } from './components/user/entry-list/entry-list.component';
import { NagarListComponent } from './components/admin/nagar-list/nagar-list.component';
import { VastiListComponent } from './components/admin/vasti-list/vasti-list.component';
import { DashboardPrantComponent } from './components/admin/dashboard-prant/dashboard-prant.component';
import { EntryVastiComponent } from './components/user/entry-vasti/entry-vasti.component';
import { PrantReportComponent } from './components/admin/prant-report/prant-report.component';
import { DistrictDetailComponent } from './components/admin/prant-report/district-detail/district-detail.component';
import { TalukaDetailComponent } from './components/admin/dashboard/taluka-detail/taluka-detail.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { DatewiseReportComponent } from './components/admin/datewise-report/datewise-report.component';
import { NagarDetailComponent } from './components/admin/dashboard/nagar-detail/nagar-detail.component';
import { PrantDashboardComponent } from './components/admin/prant-dashboard/prant-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    HomeComponent,
    DetailComponent,
    DashboardComponent,
    UserListComponent,
    ProductListComponent,
    UserTemplateComponent,
    AdminTemplateComponent,
    NotFoundComponent,
    UnauthorizedComponent,
    TransactionListComponent,
    VibhagListComponent,
    DistrictListComponent,
    TalukaListComponent,
    MandalListComponent,
    VillageListComponent,
    EntryListComponent,
    NagarListComponent,
    VastiListComponent,
    DashboardPrantComponent,
    EntryVastiComponent,
    PrantReportComponent,
    DistrictDetailComponent,
    TalukaDetailComponent,
    DatewiseReportComponent,
    NagarDetailComponent,
    PrantDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressBarModule,
    MatIconModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableExporterModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
