import { ValidatorFn, FormGroup } from "@angular/forms";

 
 /**
* @method 
* @param cntName the fromGroup control name 
* @param min min value the control must contain
* @param max max value the control can contain
* @return array of validators
*/
 export function checkStringLength(cntName: string, min: number, max: number): Array<ValidatorFn> {
    return [
      f => !f.value ? { "val": `${cntName} is required` } : null,
      f => f.value && f.value.length > max ? { "val": `${cntName} is max ${max} chars` } : null,
      f => f.value && f.value.length < min ? { "val": `${cntName} is min ${min} chars` } : null,
      f => f.value && f.value.includes("'") ? { "val": `${cntName} can not contain '.` } : null
    ];
  }
   /**
* @method 
* @param password the choosen password  
* @return array of validators
*/
  export function confirmPassword(formgroup:FormGroup): Array<ValidatorFn> {
    return [
      f => !f.value ? { "val": `confirm password is required` } : null,
      f=>f.value&&f.value!=formgroup.get("password").value?{ "val": `confirm password does not match the passwords` } : null

    ];
  }

 

     /**
* @method 
* @param password the choosen password  
* @return array of validators
*/
export function checkEmail(): Array<ValidatorFn> {
  return [
    f => !f.value ? { "val": `Email is required` } : null,
    f=>f.value&&f.value.match( "^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$")?{ "val": `email address is not valid` } : null

  ];
}