import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlusSidebarSuperiorComponent } from './plus-sidebar-superior.component';

describe('PlusSidebarSuperiorComponent', () => {
  let component: PlusSidebarSuperiorComponent;
  let fixture: ComponentFixture<PlusSidebarSuperiorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlusSidebarSuperiorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlusSidebarSuperiorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
