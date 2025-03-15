import { FormField } from '../../../interface/form-builder.interface';

export class FormValidator {
  /**
   * Valida o nome do campo (letras, números e underscores, sem espaços)
   */
  static isValidFieldName(name: string): boolean {
    return /^[a-zA-Z0-9_]+$/.test(name);
  }
  
  /**
   * Verifica se o nome já existe na lista de campos
   */
  static isFieldNameDuplicate(name: string, fields: FormField[]): boolean {
    return fields.some(field => field.name === name);
  }
  
  /**
   * Verifica se os arrays de enum e enumNames têm o mesmo comprimento
   */
  static hasMatchingEnumArrays(enumValues: string[], enumNames?: string[]): boolean {
    if (!enumNames) return true;
    return enumValues.length === enumNames.length;
  }
  
  /**
   * Valida um campo de formulário
   */
  static validateField(field: FormField, existingFields: FormField[]): { valid: boolean; message?: string } {
    if (!field.name || !field.title) {
      return { valid: false, message: 'Nome e título do campo são obrigatórios' };
    }
    
    if (!this.isValidFieldName(field.name)) {
      return { valid: false, message: 'Use apenas letras, números e underscores (sem espaços) para o nome do campo' };
    }
    
    if (this.isFieldNameDuplicate(field.name, existingFields)) {
      return { valid: false, message: 'Já existe um campo com este nome' };
    }
    
    const needsEnumValues = 
      (field.type === 'string' && ['select', 'radio', 'checkboxes'].includes(field.widget || '')) || 
      field.type === 'array';
      
    if (needsEnumValues && (!field.enum || field.enum.length === 0)) {
      return { valid: false, message: 'Este tipo de campo requer valores de escolha' };
    }
    
    if (field.enum && field.enumNames && !this.hasMatchingEnumArrays(field.enum, field.enumNames)) {
      return { valid: false, message: 'O número de valores e rótulos deve ser igual' };
    }
    
    return { valid: true };
  }
}