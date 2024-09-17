import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPrantComponent } from './dashboard-prant.component';

describe('DashboardPrantComponent', () => {
  let component: DashboardPrantComponent;
  let fixture: ComponentFixture<DashboardPrantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardPrantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
