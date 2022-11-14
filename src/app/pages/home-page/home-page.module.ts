import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomePageComponent } from './home-page.component';
import { HomePageRoutingModule } from './home-page-routing.module';
import { Chart1Component } from './chart1/chart1.component';
import { ElementsComponent } from './elements/elements.component';


const declarations = [HomePageComponent,Chart1Component, ElementsComponent];
const imports = [CommonModule,SharedModule, HomePageRoutingModule];
@NgModule({
  imports: [...imports],
  declarations: [...declarations],
  exports: [...declarations, ...imports],
})
export class HomePageModule {}
