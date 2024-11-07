function validarCPF(cpf) {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/[^\d]+/g, '');
  
    // Verifica se o CPF tem 11 dígitos ou se é uma sequência repetida (ex.: "11111111111")
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
      return false;
    }
  
    // Função auxiliar para calcular os dígitos verificadores
    function calcularDigito(cpf, peso) {
      let soma = 0;
      for (let i = 0; i < peso - 1; i++) {
        soma += parseInt(cpf.charAt(i)) * (peso - i);
      }
      let resto = (soma * 10) % 11;
      return resto === 10 ? 0 : resto;
    }
  
    // Calcula e verifica o primeiro dígito verificador
    let digito1 = calcularDigito(cpf, 10);
    if (digito1 !== parseInt(cpf.charAt(9))) {
      return false;
    }
  
    // Calcula e verifica o segundo dígito verificador
    let digito2 = calcularDigito(cpf, 11);
    if (digito2 !== parseInt(cpf.charAt(10))) {
      return false;
    }
  
    return true;
  }

module.exports = validarCPF