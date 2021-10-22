import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ComparisonComponent} from './pages/comparison/comparison.component';
import {ComparisonRoutingModule} from './comparison-routing.module';

@NgModule({
  declarations: [ComparisonComponent],
  imports: [
    CommonModule,
    ComparisonRoutingModule
  ]
})
export class ComparisonModule {
}
