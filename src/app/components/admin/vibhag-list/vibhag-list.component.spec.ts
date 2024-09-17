import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VibhagListComponent } from './vibhag-list.component';

describe('VibhagListComponent', () => {
  let component: VibhagListComponent;
  let fixture: ComponentFixture<VibhagListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VibhagListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VibhagListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
