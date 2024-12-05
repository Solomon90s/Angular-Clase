// Vamos a crear nuestras propias validaciones

import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export class FormValidators {

  static notOnlyWhiteSpace(control: FormControl): ValidationErrors | null {
    if ((control.value != null) && (control.value.trim().length == 0)) {
      return {notOnlyWhiteSpace: true}
    } else {
      return null;
    }

  }

// Funcion con parametro, palabra prohibida
  static palabraProhibida(palabra: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const prohibida = new RegExp(palabra,'i');
      const esProhibida = prohibida.test(control.value);
      return esProhibida ? {palabraProhibida: true} : null;
    }
  }

}
