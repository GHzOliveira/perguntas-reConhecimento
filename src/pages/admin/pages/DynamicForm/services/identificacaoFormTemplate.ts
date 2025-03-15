export const identificacaoFormTemplate = {
  schema: {
    type: 'object',
    title: 'Formulário de Identificação',
    properties: {
      nome: {
        type: 'string',
        title: 'Nome completo'
      },
      dataNascimento: {
        type: 'string',
        format: 'date',
        title: 'Data de nascimento'
      },
      genero: {
        type: 'string',
        title: 'Gênero',
        enum: ['Masculino', 'Feminino', 'Prefiro não dizer']
      },
      estadoCivil: {
        type: 'string',
        title: 'Estado Civil',
        enum: ['Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Viúvo(a)']
      },

      // Endereço
      pais: {
        type: 'string',
        title: 'País'
      },
      estado: {
        type: 'string',
        title: 'Estado'
      },
      cidade: {
        type: 'string',
        title: 'Cidade'
      },

      // Empresa
      filialId: {
        type: 'integer',
        title: 'Selecione sua filial'
      },
      funcaoMacro: {
        type: 'string',
        title: 'Qual a sua função?',
        enum: ['Conselho', 'Diretor', 'Equipe', 'Gerente']
      },
      dataAdmissao: {
        type: 'string',
        format: 'date',
        title: 'Data de admissão'
      },
      tempoEmpresa: {
        type: 'string',
        title: 'Tempo de empresa',
        enum: ['Menos de 1 ano', '1 a 3 anos', '5 a 10 anos', 'Mais de 10 anos']
      },
      modeloTrabalho: {
        type: 'string',
        title: 'Modelo de trabalho?',
        enum: ['Presencial', 'Híbrido', 'Remoto']
      }
    },
    required: ['nomeCompleto']
  },
  uiSchema: {
    'ui:sections': [
      {
        title: 'Dados Pessoais',
        fields: ['nome', 'dataNascimento', 'cpf', 'genero', 'estadoCivil']
      },
      {
        title: 'Endereço',
        fields: ['pais', 'estado', 'cidade']
      },
      {
        title: 'Empresa',
        fields: [
          'filialId',
          'funcaoMacro',
          'tempoEmpresa',
          'dataAdmissao',
          'modeloTrabalho'
        ]
      }
    ]
  }
}
