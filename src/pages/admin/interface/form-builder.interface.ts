export interface FormField {
    name: string;
    type: string;
    title: string;
    description?: string;
    required?: boolean;
    widget?: string;
    placeholder?: string;
    enum?: string[];
    enumNames?: string[];
    default?: any;
    minimum?: number;
    maximum?: number;
    minLength?: number;
    maxLength?: number;
    format?: string;
    readOnly?: boolean;
    section?: string;
  }

  export interface FormTemplate {
    id?: number;
    name: string;
    description?: string;
    isDefault?: boolean;
    formData: {
      schema: any;
      uiSchema?: any;
      formOptions?: any;
    };
  }