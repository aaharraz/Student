
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentPageRoutingModule } from './student-routing.module';

import { StudentPage } from './student.page';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PhonePipe } from '../shared/phone.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentPageRoutingModule,
    DragDropModule
  ],
  declarations: [StudentPage, PhonePipe]
})
export class StudentPageModule {}
