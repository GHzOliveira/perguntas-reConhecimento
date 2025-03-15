import { FormField } from '../../../interface/form-builder.interface';

export class FormSchemaService {
  /**
   * Gera o schema JSON e uiSchema a partir dos campos do formulário
   */
  static generateSchema(fields: FormField[]): { schema: any, uiSchema: any } {
    if (fields.length === 0) {
      return { schema: {}, uiSchema: {} };
    }
    
    const schema: any = {
      type: 'object',
      required: [],
      properties: {}
    };
    
    const uiSchema: any = {};
    const fieldOrder: string[] = [];
    
    const sectionMap: { [key: string]: string[] } = {};
    
    fields.forEach((field) => {
      const { name, type, title, description, required, widget, section, ...rest } = field;
      
      schema.properties[field.name] = {
        type: field.type,
        title: field.title,
        ...rest
      };
      
      fieldOrder.push(name);
      
      if (description) {
        schema.properties[name].description = description;
      }
      
      if (required) {
        schema.required.push(name);
      }
      
      if (widget || field.placeholder) {
        uiSchema[name] = uiSchema[name] || {};
        
        if (widget) {
          uiSchema[name]['ui:widget'] = widget;
        }
        
        if (field.placeholder) {
          uiSchema[name]['ui:placeholder'] = field.placeholder;
        }
      }
      
      const sectionKey = section || 'outros';
      if (!sectionMap[sectionKey]) {
        sectionMap[sectionKey] = [];
      }
      sectionMap[sectionKey].push(name);
    });

    if (fieldOrder.length > 0) {
      uiSchema['ui:order'] = fieldOrder;
    }
    
    const sections = [];
    
    const sectionOrder = ['dados_pessoais', 'endereco', 'empresa', 'outros'];
    
    for (const sectionKey of sectionOrder) {
      if (sectionMap[sectionKey] && sectionMap[sectionKey].length > 0) {
        sections.push({
          title: this.getSectionTitle(sectionKey),
          fields: sectionMap[sectionKey]
        });
      }
    }
    
    if (sections.length > 0) {
      uiSchema['ui:sections'] = sections;
    }
    
    return { schema, uiSchema };
  }

  /**
   * Retorna o título da seção com base no identificador
   */
  static getSectionTitle(sectionKey: string): string {
    const sectionTitles: { [key: string]: string } = {
      'dados_pessoais': 'Dados Pessoais',
      'endereco': 'Endereço',
      'empresa': 'Empresa',
      'outros': 'Outros'
    };
    
    return sectionTitles[sectionKey] || 'Outros';
  }

  /**
 * Organiza campos em seções (para uso no uiSchema)
 */
  static organizeSections(fields: FormField[]): { [key: string]: string[] } {
    const sectionMap: { [key: string]: string[] } = {};
    
    fields.forEach(field => {
      if (field.section) {
        if (!sectionMap[field.section]) {
          sectionMap[field.section] = [];
        }
        sectionMap[field.section].push(field.name);
      }
    });
    
    return sectionMap;
  }

  /**
   * Extrai campos de um schema existente
   */
  static extractFieldsFromSchema(schema: any, uiSchema: any = {}): FormField[] {
    const extractedFields: FormField[] = [];
    
    if (!schema?.properties) return extractedFields;

    const fieldsMap: Record<string, FormField> = {};
    const sectionMap: Record<string, string> = {};
    
    if (uiSchema['ui:sections']) {
      uiSchema['ui:sections'].forEach((section: any) => {
        const { title, fields } = section;
        const sectionKey = this.getSectionKeyFromTitle(title);
        
        fields.forEach((fieldName: string) => {
          sectionMap[fieldName] = sectionKey;
        });
      });
    }
    
    Object.entries(schema.properties).forEach(([name, propDetails]: [string, any]) => {
      const field: FormField = {
        name,
        type: propDetails.type,
        title: propDetails.title || name,
        description: propDetails.description,
        required: schema.required?.includes(name),
        section: sectionMap[name] || undefined
      };
      
      if (propDetails.enum) field.enum = propDetails.enum;
      if (propDetails.enumNames) field.enumNames = propDetails.enumNames;
      if (propDetails.default !== undefined) field.default = propDetails.default;
      if (propDetails.minimum !== undefined) field.minimum = propDetails.minimum;
      if (propDetails.maximum !== undefined) field.maximum = propDetails.maximum;
      if (propDetails.minLength !== undefined) field.minLength = propDetails.minLength;
      if (propDetails.maxLength !== undefined) field.maxLength = propDetails.maxLength;
      if (propDetails.format) field.format = propDetails.format;
      if (propDetails.readOnly) field.readOnly = propDetails.readOnly;
      
      if (uiSchema[name]) {
        if (uiSchema[name]['ui:widget']) field.widget = uiSchema[name]['ui:widget'];
        if (uiSchema[name]['ui:placeholder']) field.placeholder = uiSchema[name]['ui:placeholder'];
      }
      
      fieldsMap[name] = field;
    });

    if (uiSchema['ui:order'] && Array.isArray(uiSchema['ui:order'])) {
      uiSchema['ui:order'].forEach((fieldName: string) => {
        if (fieldsMap[fieldName]) {
          extractedFields.push(fieldsMap[fieldName]);
          delete fieldsMap[fieldName];
        }
      });
    }
    
    Object.values(fieldsMap).forEach(field => {
      extractedFields.push(field);
    });
    
    return extractedFields;
  }

  /**
   * Obtém a chave da seção com base no título
   */
  static getSectionKeyFromTitle(title: string): string {
    const titleToKey: { [key: string]: string } = {
      'Dados Pessoais': 'dados_pessoais',
      'Endereço': 'endereco',
      'Empresa': 'empresa',
      'Outros': 'outros'
    };
    
    return titleToKey[title] || 'outros';
  }
}