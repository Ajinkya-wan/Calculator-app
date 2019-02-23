import { Component } from '@angular/core';


import { KEYS } from './key/keys.conf';
import { Key, KeyType } from './key/key';
import { Calculator } from './calculator';
import { CommandFactory } from './commands/command-factory';
import {OperationServiceService} from '../_services/operation-service.service';

@Component({
  selector: 'calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {

  _operations : [] =[];
  startDate:any="2019-01-01";
  endDate:any="2019-12-31";



  constructor(private oss : OperationServiceService){

  }
  keys = KEYS;

  calculator = new Calculator;

  private handleKeyAction(key: Key): void {

    let command = CommandFactory.create(this.calculator, key,this.oss);
    command.execute();
  }

  _getHistory(){
    this.oss._operationHistory(this.startDate , this.endDate).subscribe((data:any)=>{
      if(data) {
        this._operations = data['result']['list']
        console.log(this._operations, "History")
      }
    })
  }

  _getThisMonthHistory(){
    const date = new Date();

    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    this.oss._operationHistory(firstDay , lastDay).subscribe((data:any)=>{
      if(data) {
        this._operations = data['result']['list']
        console.log(this._operations, "This month History")
      }
    })
  }

  _getThisWeekHistory(){
    const curr = new Date;
    const first = curr.getDate() - curr.getDay();
    const last = first + 6;

    const firstday = new Date(curr.setDate(first))
    const lastday = new Date(curr.setDate(last))

    this.oss._operationHistory(firstday , lastday).subscribe((data:any)=>{
      if(data) {
        this._operations = data['result']['list']
        console.log(this._operations, "This Week History")
      }
    })
  }

  _getHistoryOfCurrentDay(){

    let start = new Date();
    start.setHours(0,0,0,0);

    let end = new Date();
    end.setHours(23,59,59,999);

    this.oss._operationHistory(start , end).subscribe((data:any)=>{
      if(data) {
        this._operations = data['result']['list']
        console.log(this._operations, "Todayss History")
      }
    })
  }

}
