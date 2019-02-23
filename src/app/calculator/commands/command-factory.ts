import { Calculator } from './../calculator';
import { KeyType, Key } from './../key/key';
import { PushNumberCommand, SetOperationCommand, YieldResultCommand, ClearCommand, InvertCommand, Command } from "./command";
import {OperationServiceService} from '../../_services/operation-service.service';

export class CommandFactory {

    static create(calculator: Calculator, key: Key, oss : OperationServiceService): Command {
        if (key.type === KeyType.NUMBER || key.type === KeyType.DECIMAL_POINT) {
            return new PushNumberCommand(calculator, key.value);
        } else if (key.type === KeyType.OPERATION) {
            return new SetOperationCommand(calculator, key.value);
        } else if (key.type === KeyType.YIELD) {
            return new YieldResultCommand(calculator,oss);
        } else if (key.type === KeyType.CLEAR) {
            return new ClearCommand(calculator);
        } else if (key.type === KeyType.INVERT) {
            return new InvertCommand(calculator);
        }
    }
}
