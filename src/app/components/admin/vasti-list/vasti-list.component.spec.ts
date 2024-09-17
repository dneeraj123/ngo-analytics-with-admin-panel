import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VastiListComponent } from './vasti-list.component';

describe('VastiListComponent', () => {
  let component: VastiListComponent;
  let fixture: ComponentFixture<VastiListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VastiListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VastiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
