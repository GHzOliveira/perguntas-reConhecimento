export interface FormField {
  name: string;
  type: string;
  title: string;
  description?: string;
  required?: boolean;
  widget?: string;
  enum?: string[];
  enumNames?: string[];
  section?: string;
  placeholder?: string;
  default?: any;
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;
  format?: string;
  readOnly?: boolean;
}

export interface FormTemplate {
  id?: number;
  name: string;
  description?: string;
  companyId?: number;
  formData: {
    schema: any;
    uiSchema?: any;
    formOptions?: any;
  };
  isDefault?: boolean;
}