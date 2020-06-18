import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentWritePage } from './student-write.page';

const routes: Routes = [
  {
    path: '',
    component: StudentWritePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentWritePageRoutingModule {}
