import { UiSchema } from "@rjsf/utils";
import { JSONSchema7 } from 'json-schema';


export interface FieldTemplateProps {
  id: string;
  label: string;
  required: boolean;
  children: React.ReactNode;
  errors?: React.ReactNode;
  help?: React.ReactNode;
}

export interface ObjectFieldTemplateProps {
  title?: string;
  properties: Array<{
    name: string;
    content: React.ReactNode;
  }>;
  uiSchema?: UiSchema;
}

export interface SelectWidgetProps {
  id: string;
  schema: JSONSchema7;
  options: {
    enumOptions: Array<{
      value: string;
      label: string;
    }>;
  };
  value: string;
  onChange: (value: string | undefined) => void;
  disabled?: boolean;
}

export interface FormSection {
  title: string;
  fields: Array<{
    name: string;
    content: React.ReactNode;
  }>;
}

export interface LocationOption {
  value: string;
  label: string;
}

export interface FormPreviewProps {
  schema: JSONSchema7;
  uiSchema: UiSchema;
  formName: string;
}