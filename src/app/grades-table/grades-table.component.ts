import { Component } from '@angular/core';
import { Grade } from './grade';

@Component({
  selector: 'app-grades-table',
  standalone: true,
  imports: [],
  templateUrl: './grades-table.component.html',
  styleUrl: './grades-table.component.css'
})
export class GradesTableComponent {
  readonly passingGrade = 60;

  readonly grades: Grade[] = [
    { subject: 'מתמטיקה', grade: 92 },
    { subject: 'אנגלית', grade: 60 },
    { subject: 'מדעים', grade: 59 },
    { subject: 'יהדות', grade: 82 },
    { subject: 'דינים', grade: 96 }
  ];

  get average(): number {
    if (this.grades.length === 0) {
      return 0;
    }
    const total = this.grades.reduce((sum, item) => sum + item.grade, 0);
    return Math.round((total / this.grades.length) * 10) / 10;
  }
}
