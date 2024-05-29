import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [DashboardRoutingModule, ButtonComponent],
})
export class DashboardModule {}
