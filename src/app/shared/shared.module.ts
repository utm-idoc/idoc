import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MinLengthDirective } from './directives/validators/length.directive'

const LIB = [MinLengthDirective]

@NgModule({
  declarations: [
    ...LIB
  ],
  imports: [
  ],
  exports: [
    ...LIB
  ]
})
export class SharedModule { }
