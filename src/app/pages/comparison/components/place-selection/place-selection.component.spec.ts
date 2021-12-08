import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceSelectionComponent } from './place-selection.component';

describe('PlaceSelectionComponent', () => {
  let component: PlaceSelectionComponent;
  let fixture: ComponentFixture<PlaceSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaceSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
