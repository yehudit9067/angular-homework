import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GradesTableComponent } from './grades-table.component';

describe('GradesTableComponent', () => {
  let component: GradesTableComponent;
  let fixture: ComponentFixture<GradesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradesTableComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(GradesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate the average of the grades', () => {
    const total = component.grades.reduce((sum, item) => sum + item.grade, 0);
    const rounded = Math.round((total / component.grades.length) * 10) / 10;
    expect(component.average).toBe(rounded);
  });

  it('should render a status for every subject', () => {
    const rows = fixture.nativeElement.querySelectorAll('li');
    expect(rows.length).toBe(component.grades.length);
  });

  it('should show the average on screen', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain(String(component.average));
  });
});
