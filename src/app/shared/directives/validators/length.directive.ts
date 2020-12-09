import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, Validators } from '@angular/forms';

@Directive({
  selector: '[min-length]',
  providers: []
})
export class MinLengthDirective implements Validator {
  @Input() min: number;

  validate(control: AbstractControl): { [key: string]: any} {
    return control.value.length < this.min ? {
      min: {
        invalid: true,
        actual: control.value
      }
    } : null
  }

  constructor() { }

}
