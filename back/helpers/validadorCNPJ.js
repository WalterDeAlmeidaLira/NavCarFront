function validarCNPJ(cnpj) {
    // Remove caracteres não numéricos
    cnpj = cnpj.replace(/[^\d]+/g, '');
  
    // Verifica se o CNPJ tem 14 dígitos ou se é uma sequência repetida (ex.: "11111111111111")
    if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) {
      return false;
    }
  
    // Função auxiliar para calcular os dígitos verificadores
    function calcularDigito(cnpj, pesoInicial) {
      let soma = 0;
      let peso = pesoInicial;
      for (let i = 0; i < pesoInicial - 1; i++) {
        soma += parseInt(cnpj.charAt(i)) * peso;
        peso = peso === 2 ? 9 : peso - 1;
      }
      let resto = soma % 11;
      return resto < 2 ? 0 : 11 - resto;
    }
  
    // Calcula e verifica o primeiro dígito verificador
    let digito1 = calcularDigito(cnpj, 5);
    if (digito1 !== parseInt(cnpj.charAt(12))) {
      return false;
    }
  
    // Calcula e verifica o segundo dígito verificador
    let digito2 = calcularDigito(cnpj, 6);
    if (digito2 !== parseInt(cnpj.charAt(13))) {
      return false;
    }
}

module.exports = validarCNPJ