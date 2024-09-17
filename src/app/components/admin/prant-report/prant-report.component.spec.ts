import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrantReportComponent } from './prant-report.component';

describe('PrantReportComponent', () => {
  let component: PrantReportComponent;
  let fixture: ComponentFixture<PrantReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrantReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrantReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
