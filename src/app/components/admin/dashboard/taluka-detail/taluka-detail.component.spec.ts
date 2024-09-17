import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TalukaDetailComponent } from './taluka-detail.component';

describe('TalukaDetailComponent', () => {
  let component: TalukaDetailComponent;
  let fixture: ComponentFixture<TalukaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalukaDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalukaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
