import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { InvoicesComponent } from './pages/invoices/invoices.component';
import { SalesComponent } from './pages/sales/sales.component';
import { StocktakingComponent } from './pages/stocktaking/stocktaking.component';
import { ConfigurationComponent } from './pages/configuration/configuration.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'facturacion',
        component: InvoicesComponent,
      },
      {
        path: 'ventas',
        component: SalesComponent,
      },
      {
        path: 'inventario',
        component: StocktakingComponent,
      },
      {
        path: 'configuracion',
        component: ConfigurationComponent,
      },
      {
        path: '**',
        redirectTo: 'home',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
