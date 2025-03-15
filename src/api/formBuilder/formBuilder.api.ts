import api from "../api";

interface FormData {
  id?: number;
  companyId: number;
  formData: {
    schema: any;
    uiSchema?: any;
    formOptions?: any;
  };
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isDefault?: boolean;
}

export class FormBuilderService {
  /**
   * Salva um novo formulário.
   * @param formData Dados do formulário a ser salvo
   */
  static async saveForm(formData: FormData): Promise<FormData> {
    try {
      const response = await api.post('/form-builder', formData);
      return response.data;
    } catch (error) {
      console.error('Erro ao salvar formulário:', error);
      throw error;
    }
  }

  /**
   * Obtém o formulário mais recente.
   * @param companyId ID opcional da empresa
   */
  static async getLatestForm(companyId?: number): Promise<FormData | null> {
    try {
      const url = '/form-builder/latest' + (companyId ? `?companyId=${companyId}` : '');
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar formulário mais recente:', error);
      throw error;
    }
  }

  /**
   * Obtém um formulário pelo ID.
   * @param id ID do formulário
   */
  static async getFormById(id: number): Promise<FormData> {
    try {
      const response = await api.get(`/form-builder/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar formulário ID ${id}:`, error);
      throw error;
    }
  }
  
  /**
   * Atualiza um formulário existente.
   * @param id ID do formulário
   * @param formData Dados para atualização
   */
  static async updateForm(id: number, formData: Partial<FormData>): Promise<FormData> {
    try {
      const response = await api.put(`/form-builder/${id}`, formData);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar formulário ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Obtém todos os formulários.
   * @param companyId ID opcional da empresa
   */
  static async getAllForms(companyId?: number): Promise<FormData[]> {
    try {
      const url = '/form-builder' + (companyId ? `?companyId=${companyId}` : '');
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar formulários:', error);
      throw error;
    }
  }

  /**
 * Obtém todos os formulários de uma empresa específica com resposta padronizada
 * @param companyId ID da empresa
 */
static async getFormsByCompanyId(companyId: number): Promise<any> {
  try {
    if (!companyId) {
      return {
        success: false,
        message: 'ID da empresa não fornecido',
        data: []
      };
    }
    
    const response = await api.get(`/form-builder/company/${companyId}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar formulários para empresa ${companyId}:`, error);
    return {
      success: false,
      message: 'Erro ao buscar formulários',
      data: []
    };
  }
}
  
  /**
   * Exclui um formulário.
   * @param id ID do formulário a ser excluído
   */
  static async deleteForm(id: number): Promise<boolean> {
    try {
      const response = await api.delete(`/form-builder/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao excluir formulário ID ${id}:`, error);
      throw error;
    }
  }
  
  /**
   * Define um formulário como padrão para uma empresa.
   * @param id ID do formulário
   * @param companyId ID da empresa
   */
  static async setDefaultForm(id: number, companyId: number): Promise<FormData> {
    try {
      const response = await api.patch(`/form-builder/${id}/set-default`, { companyId });
      return response.data;
    } catch (error) {
      console.error(`Erro ao definir formulário ID ${id} como padrão:`, error);
      throw error;
    }
  }
}