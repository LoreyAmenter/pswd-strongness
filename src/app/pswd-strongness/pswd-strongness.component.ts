import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormBuilder, Validators } from '@angular/forms';

import { StrengthCheckerComponent } from './strength-checker.component';

@Component({
  selector: 'app-pswd-strongness',
  standalone: true,
  imports: [CommonModule, StrengthCheckerComponent, FormsModule, ReactiveFormsModule],
  templateUrl: 'pswd-strongness.component.html',
  styleUrls: ['./pswd-strongness.component.css']
})
export class PswdStrongnessComponent {
  constructor(private fb: FormBuilder) {}
  passwordIsValid = false;
  formpswd = this.fb.group({
    password: [null, [Validators.required]],
  });

  passwordValid(event) {
    this.passwordIsValid = event;
  }
}
