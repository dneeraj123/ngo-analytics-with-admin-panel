import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryVastiComponent } from './entry-vasti.component';

describe('EntryVastiComponent', () => {
  let component: EntryVastiComponent;
  let fixture: ComponentFixture<EntryVastiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryVastiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryVastiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
