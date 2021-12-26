import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)},
  {path: 'vergleich', loadChildren: () => import('./pages/comparison/comparison.module').then(m => m.ComparisonModule)},
  {path: 'uebersicht', loadChildren: () => import('./pages/overview/overview.module').then(m => m.OverviewModule)},
  {path: 'ueber', loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule)},
  {path: 'kontakt', loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule)},
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {anchorScrolling: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
