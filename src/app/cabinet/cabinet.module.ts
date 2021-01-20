import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CabinetRoutingModule } from './cabinet-routing.module';
import { CabinetComponent } from './cabinet.component';

import { HeaderModule } from '../ui-components/header/header.module';
import { NewDocumentComponent } from './new-document/new-document.component'
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

const LIB = [CabinetComponent, NewDocumentComponent];

@NgModule({
  declarations: [...LIB ],
  imports: [
    CommonModule,
    CabinetRoutingModule,
    HeaderModule,
    MatInputModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatCheckboxModule,
    FormsModule,
    MatButtonModule,
  ],
  exports: [...LIB]
})
export class CabinetModule { }
