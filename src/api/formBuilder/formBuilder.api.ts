import api from "../api";


export class FormBuilderService {
  /**
   * Salva um novo formulário.
   */
  static async saveForm(formData: any): Promise<any> {
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
   */
  static async getLatestForm(): Promise<any> {
    try {
      const response = await api.get('/form-builder/latest');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar formulário:', error);
      throw error;
    }
  }

  /**
   * Obtém todos os formulários.
   */
  static async getAllForms(): Promise<any[]> {
    try {
      const response = await api.get('/form-builder');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar formulários:', error);
      throw error;
    }
  }
}