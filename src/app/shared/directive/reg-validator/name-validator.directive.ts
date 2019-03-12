import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator} from '@angular/forms';
import {regValidator} from './reg-validator.directive';

@Directive({
    selector: '[appNameValidate]',
    providers: [{provide: NG_VALIDATORS, useExisting: NameValidatorDirective, multi: true}]
})
export class NameValidatorDirective implements Validator {

    @Input('appNameValidate') appNameValidate: string;

    validate(control: AbstractControl): { [key: string]: any } {
        return this.appNameValidate ? regValidator(new RegExp(this.appNameValidate, 'i'), 'appNameValidate')(control) : null;
    }

    constructor() {
    }

}
