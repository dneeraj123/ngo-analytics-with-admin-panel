import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NagarDetailComponent } from './nagar-detail.component';

describe('NagarDetailComponent', () => {
  let component: NagarDetailComponent;
  let fixture: ComponentFixture<NagarDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NagarDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NagarDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
