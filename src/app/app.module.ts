import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PswdStrongnessComponent } from './pswd-strongness/pswd-strongness.component';
import { StrengthCheckerComponent } from './pswd-strongness/strength-checker.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PswdStrongnessComponent,
    StrengthCheckerComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
