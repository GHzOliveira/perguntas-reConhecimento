export const identificacaoFormTemplate = {
  schema: {
    type: "object",
    title: "Formulário de Identificação",
    properties: {
      nome: {
        type: "string",
        title: "Nome completo"
      },
      dataNascimento: {
        type: "string",
        format: "date",
        title: "Data de nascimento"
      },
      email: {
        type: "string",
        format: "email",
        title: "Email"
      },
      cpf: {
        type: "string",
        title: "CPF"
      },
      genero: {
        type: "string",
        title: "Gênero",
        enum: ["Masculino", "Feminino", "Prefiro não dizer"]
      },
      estadoCivil: {
        type: "string",
        title: "Estado Civil",
        enum: ["Solteiro(a)", "Casado(a)", "Divorciado(a)", "Viúvo(a)"]
      },
      filhos: {
        type: "integer",
        title: "Número de filhos"
      },
      quantidadeLivros: {
        type: "integer",
        title: "Quantos livros lê por ano?"
      },
      hobbie: {
        type: "string",
        title: "Principal atividade nas horas vagas"
      },
      
      // Endereço
      pais: {
        type: "string",
        title: "País"
      },
      estado: {
        type: "string",
        title: "Estado"
      },
      cidade: {
        type: "string",
        title: "Cidade"
      },
      
      // Empresa
      filialId: {
        type: "integer",
        title: "Qual filial trabalha ?"
      },
      areaTrabalho: {
        type: "string",
        title: "Qual área trabalha?"
      },
      funcao: {
        type: "string",
        title: "Qual a sua função?"
      },
      tempoEmpresa: {
        type: "string",
        title: "Tempo de empresa",
        enum: ["Menos de 1 ano", "1 a 3 anos", "5 a 10 anos", "Mais de 10 anos"]
      },
      modeloTrabalho: {
        type: "string",
        title: "Modelo de trabalho?",
        enum: ["Presencial", "Híbrido", "Remoto"]
      }
    },
    required: ["nomeCompleto", "email"]
  },
  uiSchema: {
    "ui:sections": [
      {
        title: "Dados Pessoais",
        fields: ["nome", "dataNascimento", "email", "cpf", "genero", "estadoCivil", "filhos", "quantidadeLivros", "hobbie"]
      },
      {
        title: "Endereço",
        fields: ["pais", "estado", "cidade"]
      },
      {
        title: "Empresa",
        fields: ["filialId", "areaTrabalho", "funcao", "tempoEmpresa", "modeloTrabalho"]
      }
    ]
  }
};