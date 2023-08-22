export interface inputModel {
  icon: string;
  labelExists: boolean;
  iconExists: boolean;
  decimal: boolean;
  name:string;
  placeholder: string;
  controlName: string;
  type:string;
  validations?: validationsItems[];
}

export interface validationsItems {
  value: string;
  name: string;
}

