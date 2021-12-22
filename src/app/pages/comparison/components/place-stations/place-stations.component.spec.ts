import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PlaceStationsComponent} from './place-stations.component';

describe('PlaceStationsComponent', () => {
  let component: PlaceStationsComponent;
  let fixture: ComponentFixture<PlaceStationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaceStationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceStationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
