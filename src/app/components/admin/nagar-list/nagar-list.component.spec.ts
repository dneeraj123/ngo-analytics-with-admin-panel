import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NagarListComponent } from './nagar-list.component';

describe('NagarListComponent', () => {
  let component: NagarListComponent;
  let fixture: ComponentFixture<NagarListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NagarListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NagarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
