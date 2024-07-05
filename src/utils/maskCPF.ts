export const maskCPF = (cpf: string) => {
  return cpf
	.replace(/\D/g, '') // Remove tudo o que não é dígito
	.replace(/(\d{3})(\d)/, '$1.$2') // Coloca ponto após o terceiro dígito
	.replace(/(\d{3})(\d)/, '$1.$2') // Coloca ponto após o sexto dígito
	.replace(/(\d{3})(\d)/, '$1-$2') // Coloca um hífen após o nono dígito
	.replace(/(-\d{2})\d+?$/, '$1'); // Captura 2 dígitos após o hífen e impede a digitação de mais dígitos
};