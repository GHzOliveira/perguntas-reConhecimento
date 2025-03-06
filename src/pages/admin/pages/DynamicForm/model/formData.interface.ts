export interface FormResponse {
    success: boolean;
    message: string;
    data: Array<{
      id: number;
      name: string;
      description?: string;
      formData: {
        schema: any;
        uiSchema?: any;
      };
      isDefault?: boolean;
    }>;
  }