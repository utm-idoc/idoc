import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CabinetRoutingModule } from './cabinet-routing.module';
import { CabinetComponent } from './cabinet.component';

import { HeaderModule } from '../ui-components/header/header.module'

const LIB = [ CabinetComponent ];

@NgModule({
  declarations: [...LIB],
  imports: [
    CommonModule,
    CabinetRoutingModule,
    HeaderModule
  ],
  exports: [...LIB]
})
export class CabinetModule { }
