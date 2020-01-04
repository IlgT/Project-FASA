import { Validator, AbstractControl, NG_VALIDATORS, FormControl, Validators, ValidationErrors } from "@angular/forms";
import { Directive, Input } from "@angular/core";
@Directive({
    selector: '[greaterThanZero]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: GreaterThanZeroValidator,
        multi: true
    }]
})
export class GreaterThanZeroValidator implements Validator{
    validate(control: FormControl): ValidationErrors | null {
        return GreaterThanZeroValidator.validateValueGreaterThanzero(control);
    }

    static validateValueGreaterThanzero(control: FormControl): ValidationErrors {
        let value: number = +control.value;
        console.log("Value ist " + value);
        if (value === 0) {
            return { amountValue: "Eingabe muss größer als 0 sein" };
        }
        return null;
    }
}
