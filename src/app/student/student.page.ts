import { StudentDetailPage } from './../student-detail/student-detail.page';
import { StudentWritePage } from './../student-write/student-write.page';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { Student } from './../models/student.interface';
import { Observable } from 'rxjs';
import { StudentService } from './../services/student.service';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit {
  students$: Observable<Student[]>;
  studentsActive: Student[];
  studentsDelinquent: Student[];
  studentsDroped: Student[];
  students: Student[] = [];
  lastPageLoaded = 0;
  pageSize = 10;
  sortOrder = 'asc';
  pageNumber = 0;
  sortField = 'studentId';
  enableModify = false;


  constructor(private studentService: StudentService,
              private modalController: ModalController,
              private loadingController: LoadingController,
              private alertCtrl: AlertController) { }

  ngOnInit() {
    this.getData(this.query);
  }

query = ref => ref.orderBy(this.sortField, this.sortOrder)
              .limit(this.pageSize)

queryPlus = ref => ref.orderBy(this.sortField, this.sortOrder)
                .startAfter(this.lastPageLoaded * this.pageSize)
                .limit(this.pageSize)


  nextPage() {
      this.lastPageLoaded++;
      console.log('this.lastPageLoaded:: ++ ', this.lastPageLoaded);
      this.getData(this.queryPlus);
  }
  showAll() {
      this.lastPageLoaded = 0;
      const query = ref => ref.orderBy(this.sortField, this.sortOrder);
      this.getData(query);
 
  }

  prevPage() {
    if (this.lastPageLoaded-- < 0) {
      console.log('this is the first page');
      this.lastPageLoaded = 0;
    }
    // this.query = this.queryPlus;
    this.getData(this.queryPlus);
  }

  getData(query) {
    this.loadingController.create({
      message: 'Please wait...',
    }).then(loadingEl => {
      loadingEl.present();
      // this.students$ = this.studentService.allStudents(this.query);
      this.studentService.allStudents(query).subscribe(data => {
        this.students = data;
        this.studentsDelinquent = this.students.filter(result => result.status === 'delinquent');
        this.studentsDroped = this.students.filter(result => result.status === 'dropped');
        this.studentsActive = this.students.filter(result => result.status === 'active');
        loadingEl.dismiss();

    });
    });

  }

  dropEvent(event: CdkDragDrop<Student[]>) {
    if (event.previousContainer === event.container) {
        moveItemInArray(
          event.container.data,
          event.previousIndex,
          event.currentIndex);
    } else {
      const student: Student = event.previousContainer.data[event.previousIndex];
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      student.status = event.container.id ;
      this.studentService.updateStudent(student.id, student)
        .subscribe(result => console.log('student Updated: ', result));
    }

  }




  async openModal( modify: boolean, student?: Student) {
    const modal = await this.modalController.create({
      component: StudentWritePage,
      componentProps: {
        student: modify ? student : null,
        modify
      }
    });
    modal.present();
  }

  async openModalDetail(student: Student) {
    const modal = await this.modalController.create({
      component: StudentDetailPage,
      componentProps: {
        student,
      }
    });
    modal.present();
  }

 
  deleteStudent(id: string) {
    console.log('delete id: ', id);
    this.alertCtrl.create({
      header: 'Confirm Delete a student!',
      message: 'Are you sure? ',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => { console.log('Confirm Cancel: blah'); }
        },
        {
          text: 'Okay',
          cssClass: 'danger',
          handler: () => {
            this.studentService.deleteStudent(id).then(result => {
              console.log('delete result: ', result);
              console.log('Unit Model has been deleted');
            });
        }
      }
      ]
    })
      .then(alertEl => {
        alertEl.present();
      });
  }


  getNewPageSizeData() {
    const query = ref => ref.orderBy(this.sortField, this.sortOrder)
              .limit(this.pageSize);
    this.getData(query);
  }

  onSearchChange(event) {

  }

}
