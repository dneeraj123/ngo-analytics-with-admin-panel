import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrantDashboardComponent } from './prant-dashboard.component';

describe('PrantDashboardComponent', () => {
  let component: PrantDashboardComponent;
  let fixture: ComponentFixture<PrantDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrantDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrantDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
