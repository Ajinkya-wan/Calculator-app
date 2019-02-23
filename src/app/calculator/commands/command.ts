import { Calculator } from "./../calculator";
import {OperationServiceService} from '../../_services/operation-service.service';

export interface Command {
    execute(): void;
}

export class PushNumberCommand implements Command {
    constructor(private calculator: Calculator, private number: string) { }

    execute(): void {
        if (this.calculator.currentValue === '') {
            this.calculator.currentValue = this.number;
        } else {
            this.calculator.currentValue += this.number;
        }
    }
}

export class SetOperationCommand implements Command {
    constructor(private calculator: Calculator, private operation: string) { }

    execute(): void {

        let res = this.calculator.calculate();

        this.calculator.leftOperand = this.calculator.operation === '' ? Number(this.calculator.currentValue) : res;
        this.calculator.currentValue = '';
        this.calculator.operation = this.operation;
    }
}

export class YieldResultCommand implements Command {
    constructor(private calculator: Calculator, private oss : OperationServiceService) { }

    execute(): void {

        let res = this.calculator.calculate();
        let question = this.calculator.leftOperand+this.calculator.operation+this.calculator.currentValue;
        this._saveOperation(question,res);
        this.calculator.leftOperand = res;
        this.calculator.currentValue = '' + this.calculator.leftOperand;
        this.calculator.operation = '';
    }

    /*Save operation function*/
    _saveOperation(question, answer){
      this.oss._saveOperation(question , answer).subscribe((data:any)=>{
        if(data) {
          console.log("Operation Saved Succesfully")
        }
      })
    }
}

export class ClearCommand implements Command {
    constructor(private calculator: Calculator) { }

    execute(): void {
        this.calculator.currentValue = '';
        this.calculator.operation = '';
        this.calculator.leftOperand = 0;
    }
}

export class InvertCommand implements Command {
    constructor(private calculator: Calculator) { }

    execute(): void {
        this.calculator.currentValue = - Number(this.calculator.currentValue) + '';
    }
}
