import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { LayoutComponent } from './pages/layout/layout.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StocktakingComponent } from './pages/stocktaking/stocktaking.component';
import { InvoicesComponent } from './pages/invoices/invoices.component';
import { SalesComponent } from './pages/sales/sales.component';
import { ConfigurationComponent } from './pages/configuration/configuration.component';

@NgModule({
  declarations: [
    HomeComponent,
    LayoutComponent,
    StocktakingComponent,
    InvoicesComponent,
    SalesComponent,
    ConfigurationComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule

  ]
})
export class HomeModule { }
