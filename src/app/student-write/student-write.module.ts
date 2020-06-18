import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentWritePageRoutingModule } from './student-write-routing.module';

import { StudentWritePage } from './student-write.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    StudentWritePageRoutingModule
  ],
  declarations: [StudentWritePage]
})
export class StudentWritePageModule {}
