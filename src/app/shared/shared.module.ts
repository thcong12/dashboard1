import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BaseComponent } from './component/base.component';
import { InputMsgDirective } from './directive/input-msg.directive';
import { LoaderComponent } from './component/layout/loader/loader.component';


const declarations: any[] = [BaseComponent,InputMsgDirective,LoaderComponent];
const imports = [CommonModule, FormsModule, ReactiveFormsModule,HttpClientModule,];
@NgModule({
  declarations: [...declarations, ],
  exports:[...declarations,...imports],
  imports: [...imports],
})
export class SharedModule {}
