import { StudentCount } from './../models/student-count.interface';
import { Student } from './../models/student.interface';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from, of } from 'rxjs';
import { convertSnaps } from '../shared/db-utils';
import { map, max, tap, catchError, filter, take, toArray, buffer, scan, last } from 'rxjs/operators';
import { OrderByDirection } from '@firebase/firestore';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private db: AngularFirestore) { }

  allStudents(query: any): Observable<Student[]> {
      return this.db.collection(`students`, query)
      .snapshotChanges()
      .pipe(map(snaps =>
        convertSnaps<Student>(snaps)
        ));
  }

  student(studentId: string): Observable<Student> {
      return this.db.collection(`students`,
      ref => ref.where('studentId', '==', studentId))
      .snapshotChanges()
      .pipe(map(snaps =>
        convertSnaps<Student>(snaps)[0]
        ));
  }

  createStudent(student: Student) {
      return  this.db.collection(`students`).add(student);
  }

  deleteStudent(id: string) {
      return  this.db.doc(`students/${id}`).delete();
  }

  updateStudent(id: string, changes: Student): Observable<any> {
      return from(this.db.doc(`students/${id}`).update(changes));
     }



     getIncrementNo(): Observable<StudentCount>{
      return this.db.collection('stats/', ref => ref.where('url', '==', '--stats--'))
       .snapshotChanges()
       .pipe(
         map(snap =>
          convertSnaps<StudentCount>(snap)[0]
          ));
     }

     updateIncrement() {
       const increment = firebase.firestore.FieldValue.increment(1);
       return from(this.db.doc('stats/--stats--').update({studentCount: increment})).pipe(take(1));
     }
}
