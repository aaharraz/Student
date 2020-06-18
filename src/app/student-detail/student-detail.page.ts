import { NavParams, ModalController } from '@ionic/angular';
import { Student } from './../models/student.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.page.html',
  styleUrls: ['./student-detail.page.scss'],
})
export class StudentDetailPage implements OnInit {
student: Student;

  constructor(private navParams: NavParams,
              private modalController: ModalController) { }

  ngOnInit() {
    this.student = this.navParams.get('student');
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
