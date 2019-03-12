import {AbstractControl, ValidatorFn} from '@angular/forms';

export function regValidator(nameRe: RegExp, regKey?: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        if (!control) {
            return null;
        }
        const reg = nameRe.test(control.value);
        // return {[(regKey ? regKey : 'regValidator')]: {value: control.value, reg: reg}};
        return reg ? null : {[(regKey ? regKey : 'regValidator')]: true};
    };
}
