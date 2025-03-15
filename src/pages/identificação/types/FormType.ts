import { FormData as UserFormData } from '../../../types/FormType';

export interface SchemaField {
  type: string;
  title: string;
  enum?: Array<string | number>;
  enumNames?: string[];
  format?: string;
}

export interface SchemaProperties {
  [key: string]: SchemaField;
}

export interface FormSchema {
  properties: SchemaProperties;
  required?: string[];
}

export interface UiSection {
  title: string;
  fields: string[];
}

export interface UiSchema {
  'ui:sections'?: UiSection[];
  [key: string]: any;
}

export interface FieldInfo extends SchemaField {
  name: string;
}

export interface SectionFields {
  [sectionName: string]: FieldInfo[];
}

export interface FormFieldProps {
  id: keyof UserFormData;
  label: string;
  type?: string;
  options?: { value: string | number; label: string }[];
  register: any;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
  disabled?: boolean;
  isLoading?: boolean;
  placeholder?: string;
}

export type ProcessedFormData = Partial<UserFormData>;