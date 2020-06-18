import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentWritePage } from './student-write.page';

describe('StudentWritePage', () => {
  let component: StudentWritePage;
  let fixture: ComponentFixture<StudentWritePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentWritePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentWritePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
