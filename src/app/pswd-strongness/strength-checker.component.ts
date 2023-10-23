import {
  Input,
  SimpleChange,
  Output,
  Component,
  OnChanges,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-strength-checker',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class='strength'>
      <ul class='strengthoutput'>
        <li class='point' [style.background-color]="bar0"></li>
        <li class='point' [style.background-color]="bar1"></li>
        <li class='point' [style.background-color]="bar2"></li>
      </ul><br>
      <p class="alert alert-info" *ngIf="msg">{{msg}}</p>
    </div>
  `,
  styleUrls: ['./strength-checker.component.css']
})
export class StrengthCheckerComponent implements OnChanges {
  @Input() public passwordToVerify: string;
  @Output() passwordStrength = new EventEmitter<boolean>();
  bar0: string;
  bar1: string;
  bar2: string;
  msg = '';
  private colors = ['red', 'yellow', 'green'];

  private static checkStrength(p) {
    let force = 0;
    const regex = /[$-/:-?{-~!"^_@`\[\]]/g;
    const lowerLetters = /[a-z]+/.test(p);
    const upperLetters = /[A-Z]+/.test(p);
    const numbers = /[0-9]+/.test(p);
    const symbols = regex.test(p);
    const flags = [lowerLetters, upperLetters, numbers, symbols];
    let passedMatches = 0;
    for (const flag of flags) {
      passedMatches += flag === true ? 1 : 0;
    }
    force += 2 * p.length + (p.length >= 10 ? 1 : 0);
    force += passedMatches * 10;
    force = p.length <= 7 ? Math.min(force, 10) : force;
    force = passedMatches === 1 ? Math.min(force, 10) : force;
    force = passedMatches === 2 ? Math.min(force, 20) : force;
    force = passedMatches === 3 ? Math.min(force, 30) : force;
    force = passedMatches === 4 ? Math.min(force, 40) : force;
    return force;
  }
  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    const password = changes['passwordToVerify'].currentValue;
    this.setBarColors(3, '#DDD');
    if (password) {
      const c = this.getColor(StrengthCheckerComponent.checkStrength(password));
      this.setBarColors(c.idx, c.col);
      const pwdStrength = StrengthCheckerComponent.checkStrength(password);
      pwdStrength === 30
        ? this.passwordStrength.emit(true)
        : this.passwordStrength.emit(false);
      switch (c.idx) {
        case 1:
          this.msg = 'Weak';
          break;
        case 2:
          this.msg = 'Medium';
          break;
        case 3:
          this.msg = 'Strong';
          break;
      }
    } else {
      this.msg = '';
    }
  }
  private getColor(s) {
    let idx = 0;
    if (s <= 10) {
      idx = 0;
    } else if (s <= 20) {
      idx = 1;
    } else if (s <= 30) {
      idx = 2;
    } else {
      idx = 3;
    }
    return {
      idx: idx + 1,
      col: this.colors[idx],
    };
  }
  private setBarColors(count, col) {
    if(this['passwordToVerify'].length <= 7){
      for (let n = 0; n <= 2; n++) {
        this['bar' + n] = col;
      }
    } else{
      for (let n = 0; n < count; n++) {
        this['bar' + n] = col;
      }
    }
  }
}

