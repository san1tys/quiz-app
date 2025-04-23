import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQuizDetailComponent } from './view-quiz-detail.component';

describe('ViewQuizDetailComponent', () => {
  let component: ViewQuizDetailComponent;
  let fixture: ComponentFixture<ViewQuizDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewQuizDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewQuizDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
