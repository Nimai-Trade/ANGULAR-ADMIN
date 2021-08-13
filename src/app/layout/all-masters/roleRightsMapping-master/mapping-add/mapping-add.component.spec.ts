import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MappingAddComponent } from './mapping-add.component';

describe('MappingAddComponent', () => {
  let component: MappingAddComponent;
  let fixture: ComponentFixture<MappingAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MappingAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MappingAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
