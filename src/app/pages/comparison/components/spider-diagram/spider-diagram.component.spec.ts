import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SpiderDiagramComponent} from './spider-diagram.component';

describe('SpiderDiagramComponent', () => {
  let component: SpiderDiagramComponent;
  let fixture: ComponentFixture<SpiderDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpiderDiagramComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpiderDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
