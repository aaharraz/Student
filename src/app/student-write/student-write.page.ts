import { AngularFirestore } from '@angular/fire/firestore';
import { StudentService } from './../services/student.service';
import { Student } from './../models/student.interface';
import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, LoadingController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { switchMap, take, max, map } from 'rxjs/operators';
import { of } from 'rxjs';
import * as firebase from 'firebase';

@Component({
  selector: 'app-student-write',
  templateUrl: './student-write.page.html',
  styleUrls: ['./student-write.page.scss'],
})
export class StudentWritePage implements OnInit {
student: Student;
form: FormGroup;
modify: boolean;
  constructor(private studentService: StudentService,
              private navParams: NavParams,
              private db: AngularFirestore,
              private loadingController: LoadingController,
              private modalController: ModalController
    ) { }

  ngOnInit() {
    this.student = this.navParams.get('student');
    this.modify = this.navParams.get('modify');
    this.form = new FormGroup({
      firstName: new FormControl(this.student ? this.student.firstName : '', [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl(this.student ? this.student.lastName : '', [Validators.required, Validators.minLength(3)]),
      phoneNumber: new FormControl(this.student ? this.student.phoneNumber : '', [Validators.required, Validators.minLength(10)]),
      studentId: new FormControl(this.student ? this.student.studentId : 111),
      status: new FormControl(this.student ? this.student.status : '', Validators.required)
    });
  }

  addStudent() {
    if (!this.form.valid) {
      console.log('form is not valid: ', this.form);
      return;
    }

    console.log('form before: ', this.form);
    this.loadingController.create({
      message: 'Please wait...',
    }).then(loadingEl => {
      loadingEl.present();


      this.studentService.getIncrementNo().pipe(take(1), map(inc => inc.studentCount)).subscribe(id => {
        console.log('Ids: ', id);
        const increment = id + 1;
        this.form.value.studentId = increment ;
        this.studentService.createStudent(this.form.value).then(result => {
          this.studentService.updateIncrement().subscribe(data => {
            console.log('new increment: ', data);
            loadingEl.dismiss();
            this.modalController.dismiss();
          });
        });
      });
    });

  }

  updateStudent() {
    if (!this.form.valid) {
      console.log('The for is not Valid: ', this.form);
      return;
    }
    console.log('form: ', this.form);
    this.loadingController.create({
      message: 'Please wait...',
    }).then(loadingEl => {
      loadingEl.present();

      this.studentService.updateStudent(this.student.id, this.form.value)
      .subscribe(result => {
        console.log('result: ', result);
        loadingEl.dismiss();
        this.modalController.dismiss();
      }
        );

    });
  }


  closeModal() {
    this.modalController.dismiss();
  }

}
