import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ComparisonComponent} from './pages/comparison/comparison.component';

const routes: Routes = [
  {path: '', component: ComparisonComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComparisonRoutingModule {
}
