import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private readonly router = inject(Router);
  
  readonly conversionMap: Record<string, string>={
    'א': 't',
    'ב': 'c',
    'ג': 'd',
    'ד': 's',
   'ה': 'v',
    'ו':'u',
    'ז':'z',
    'ח':'j',
    'ט':'y',
    'י':'h',
    'כ':'f',
    'ל':'k',
    'מ':'n',
    'נ':'b',
    'ן':'i',
    'ס':'x',
    'ע':'g',
    'פ':'p',
    'ף':';',
    'צ':'m',
    'ץ':'.',
    'ק':'e',
    'ר':'r',
    'ש':'a',
    'ת':',',
    '/':'q',
    "'":'w'
    
  }

  emailConfirmation: string ='';

  toEnglish(text:string): string {
    return Array.from(text).map((char) => {
      const english = this.conversionMap[char];
      return typeof english === 'string'? english : char;
    })
    .join('');
  }

  /** ממיר את תוכן שדה האימייל לאנגלית תוך שמירה על מיקום הסמן. */
  onEmailInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const converted = this.toEnglish(input.value);

    if (converted === input.value) {
      return;
    }

    const caret = input.selectionStart ?? converted.length;
    input.value = converted;
    input.setSelectionRange(caret, caret);
  }

  /**
   * Enter ראשון מאשר את הכתובת ומציג אותה מתחת לשדה.
   * Enter שני (כשהכתובת כבר מוצגת) שולח את הטופס כרגיל.
   */
  onEmailEnter(event: KeyboardEvent): void {
    if (event.key !== 'Enter') {
      return;
    }

    if (this.emailConfirmation !== '') {
      return; // Enter שני — ממשיכים לשליחה הרגילה
    }

    event.preventDefault(); // Enter ראשון — לא שולחים את הטופס

    const input = event.target as HTMLInputElement;
    const email = this.toEnglish(input.value).trim();

    if (email === '') {
      return;
    }

    this.emailConfirmation = `כתובת המייל שנקלטה היא ${email}`;
  }
  
  /** מוסיף את הסיומת לכתובת ומציג אותה מתחת לשדה. */
  addGmailSuffix(): void {
    const emailInput = document.getElementById('email-address') as HTMLInputElement | null;

    if (!emailInput) {
      return;
    }

    const localPart = this.toEnglish(emailInput.value).trim().replace(/@gmail\.com$/i, '');

    if (localPart === '') {
      return;
    }

    const email = `${localPart}@gmail.com`;
    emailInput.value = email;
    this.emailConfirmation = `כתובת המייל שנקלטה היא ${email}`;
  }

  onSubmit(event: SubmitEvent): void {
    event.preventDefault();          // מונע רענון של הדף
    this.router.navigateByUrl('/grades');
  }
}

