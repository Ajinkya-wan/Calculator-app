import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CalculatorModule } from './calculator/calculator.module';
import {OperationServiceService} from './_services/operation-service.service';
import { HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CalculatorModule,
    HttpClientModule
  ],
  providers: [OperationServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
