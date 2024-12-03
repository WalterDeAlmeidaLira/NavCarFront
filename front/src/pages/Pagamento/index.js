import React from "react";
import { useState, useEffect } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";

const Reserva = () => {
  const navigate = useNavigate()
  const [aluguel, setAluguel] = useState([])
  const [user, setUser] = useState([])
  const [carro, setCarro] = useState([])
  const [preco, setPreco] = useState(0)
  const [exibir, setExibir] = useState([])
  const [exibirUser, setExibirUsser] = useState([])
  const [seguro, setSeguro] = useState([
    { icon: "car", text: "Proteção do Carro", price: 19.95 },
    { icon: "shield-alt", text: "Proteção Total Avarias", price: 35.95 },
    { icon: "user-shield", text: "Seguro de Terceiros", price: 17.95 },])
  const [adicionais, setAdicionais] = useState([
    { icon: "user-plus", text: "Condutor Adicional Ilimitado", price: 19.95 },
    { icon: "leaf", text: "Neutraliza - Compensação de Carbono", price: 1.99 },
  ])
  const [dataRetirada, setDataRetirada] = useState('')
  const [dataDevolucao, setDDataDevolucao] = useState('')

  const [numeroCartao, setNumeroCartao] = useState(null)
  const [nomeCartao, setNomeCartao] = useState(null)
  const [validade, setValidade] = useState(null)
  const [cvv, setCvv] = useState(null)


  useEffect(() => {
    // Obter a URL atual
    const url = window.location.href.split('/')
    let idAluguel = url[url.length - 1]
    idAluguel = parseInt(idAluguel)

    api.get(`car/unico/alugar/${idAluguel}`).then(resp => {
      const aluguelRetorno = resp.data.aluguel
      setAluguel(aluguelRetorno)
      console.log(aluguel[0].id_car)
    }).catch(erro => {
      console.log(erro)
    })



  }, [])

  useEffect(() => {
    if (aluguel && aluguel.length > 0) {
      const idCar = aluguel[0].id_car;
      api.get(`car/exibirCarros/${idCar}`)
        .then(resp => {
          setCarro(resp.data.carro)
        })
        .catch(erro => {
          console.log(erro);
        });

    }
  }, [aluguel]);

  useEffect(() => {
    if (aluguel && aluguel.length > 0) {
      const idUser = aluguel[0].user_id;
      api.get(`user/${idUser}`)
        .then(resp => {
          setUser(prevState => [...prevState, resp.data.user])
        })
        .catch(erro => {
          console.log(erro);
        });

    }

  }, [carro]);

  useEffect(() => {

    if (carro.length > 0) {
      console.log("aluguel", aluguel[0])
      console.log("carro", carro[0])
      console.log("user", user[0])
      let dataInicio = aluguel[0].inicio_aluguel
      let dataConversao = dataInicio.split('T')[0]
      let horaConversao = dataInicio.split('T')[1].split('.')[0]

      let dataFim = aluguel[0].fim_aluguel
      let dataFimConversao = dataFim.split('T')[0]

      let dadosTela = {
        dataInicio: dataConversao,
        horaInicio: horaConversao,
        dataFim: dataFimConversao,
        horaFim: "Até às 18:00 hrs",
        modelo: carro[0].modelo,
        marca: carro[0].marca,
        preco: carro[0].preco,
        localRetirada: aluguel[0].local_retirada,
        localDevolucao: aluguel[0].local_devolucao,
        precoTotal: (aluguel[0].PRECO).toFixed(2)
      }
      if (exibir.length < 1) {
        setExibir(prevState => [...prevState, dadosTela])
      }

      console.log("dados da tela", dadosTela)
    }



  }, [carro]);

  useEffect(() => {
    let userExibirDados
    if (user.length > 0) {
      console.log('dentor do user', user)
      userExibirDados = {
        id: user[0].user_id,
        name: user[0].user_name,
        email: user[0].user_email,
        doc: user[0].user_doc,
      }
    }

    if (user.length < 3) {
      setExibirUsser(prevState => [...prevState, userExibirDados])
    }

    console.log('estou awui', exibirUser)

  }, [user])

  const [validoCartao, setValidoCartao] = useState(null);

  function formatarCartao(numeroCartao) {
    return numeroCartao
      .replace(/\D/g, "") // Remove caracteres não numéricos
      .replace(/(\d{4})(?=\d)/g, "$1 "); // Adiciona espaços a cada 4 dígitos
  }

  function changeCartao(e) {

    const input = e.target.value;
    const formatado = formatarCartao(input);
    

    // Valida somente se o número tiver pelo menos 13 dígitos (mínimo para cartões válidos)
    if (formatado.replace(/\D/g, "").length >= 16) {
      setNumeroCartao(formatado)
    }else{
      setNumeroCartao(null)
    }
  }

  function validarData(data) {
    // Verifica se a data segue o padrão MM/YYYY
    const regex = /^(0[1-9]|1[0-2])\/\d{4}$/;
    if (!regex.test(data)) {
      return false; // Retorna falso se não estiver no formato correto
    }
  
    const [mes, ano] = data.split("/").map(Number); // Extrai mês e ano como números
  
    // Obtém a data atual
    const hoje = new Date();
    const anoAtual = hoje.getFullYear();
    const mesAtual = hoje.getMonth() + 1; // Mês no JavaScript começa em 0
  
    // Verifica se a data está no passado
    if (ano < anoAtual || (ano === anoAtual && mes < mesAtual)) {
      return false;
    }
  
    return true; // Data válida
  }

  function changeValidade(e) {
    let data = e.target.value
    let validade = validarData(data)
    if(validade){
      setValidade(e.target.value)
      
    }else{
      setValidade(null)
    }
  }

  function validarCVV(cvv) {
    // Verifica se o CVV contém exatamente 3 dígitos numéricos
    const regex = /^\d{3}$/;

    if(cvv == null || cvv == ''){
      return false
    }

    return regex.test(cvv);
  }

  function changeCvv(e) {
    let testeCvv = validarCVV(e.target.value)
    if(testeCvv){
      setCvv(e.target.value)

    }else{
      setCvv(null)
    }
  }

  function validarNome(nome) {
    // Verifica se o nome atende aos critérios
    const regex = /^[a-zA-Zà-üÀ-Ü\s]{2,50}$/;

    if(nome == '' || nome == null){
      return false
    }
  
    // Retorna true se for válido, false caso contrário
    return regex.test(nome.trim());
  }

  function changeNome(e) {
    let nomeUsuario = validarNome(e.target.value)
    if(nomeUsuario){
      setNomeCartao(e.target.value)
      
    }else{
      setNomeCartao(null)
    }
  }

  async function envioPagamento() {
    if(numeroCartao == null){
      alert("número do cartao incorreto")
      return
    }

    if(validade == null){
      alert("validade errada")
      return
    }

    if(nomeCartao == null){
      alert("nome inválido")
      return
    }

    if(cvv == null){
      alert("seu cvv está incorreto")
      return
    }


    const pagamento = {
      numeroCartao: numeroCartao,
      validade: validade,
      cvv: cvv,
      nome: nomeCartao,
      aluguel: aluguel[0].id_aluguel,
      userId: aluguel[0].user_id,
      idCar: carro[0].id_car,
    }

    const resultado = await api.post('car/pagamento', { pagamento })

    const id = user[0].user_id


    navigate(`/user/perfil/${id}`)
  }

  return (
    <div className="container p-3">
      <div className="row">
        <div className="col-md-8">
          <div className="mb-4">
            <h2 className="fw-bold">Dados Pessoais</h2>
            <p className="text-muted">
              Informe seus dados para que possamos efetuar a sua reserva.
            </p>
            <p className="text-muted">
              As informações coletadas no cadastro do cliente serão utilizadas para identificação das reservas e execução de contrato entre o titular e a Localiza. Para mais informações sobre o tratamento de dados pessoais, acesse nosso Portal de Privacidade.
            </p>
          </div>
          <div className="bg-light p-4 rounded">
            <form>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="nomeCompleto" className="form-label">
                    Nome Completo*
                  </label>
                  {exibirUser[2] && (
                    <input type="text" className="form-control" id="nomeCompleto" value={exibirUser[2].name}
                      disabled
                    />

                  )}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label">
                    E-mail*
                  </label>
                  {exibirUser[2] && (
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={exibirUser[2].email}
                      disabled
                    />
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="documento" className="form-label">
                    Documento*
                  </label>
                  {exibirUser[2] && (
                    <input
                      type="text"
                      className="form-control"
                      id="documento"
                      value={exibirUser[2].doc}
                      disabled
                    />
                  )}
                </div>
              </div>
            </form>
          </div>
          <div className="mt-4">
            <h2 className="fw-bold">Cartão de crédito*</h2>
            <p className="text-muted">
              Insira os dados do seu cartão.
            </p>
            <form>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="numeroCartao" className="form-label">
                    Número do Cartão*
                  </label>
                  <input
                    onChange={changeCartao}
                    type="text"
                    placeholder="xxxx.xxxx.xxxx.xxxx"
                    className="form-control"
                    id="numeroCartao"
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="validade" className="form-label">
                    Validade*
                  </label>
                  <input type="text" placeholder="MM/AAAA" className="form-control" id="validade" onChange={changeValidade} />
                </div>
                <div className="col-md-3">
                  <label htmlFor="cvv" className="form-label">
                    CVV*
                  </label>
                  <input type="text" placeholder='123' className="form-control" id="cvv" onChange={changeCvv} />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="nomeTitular" className="form-label">
                    Nome do titular no cartão*
                  </label>
                  <input
                    placeholder="Nome Completo"
                    onChange={changeNome}
                    type="text"
                    className="form-control"
                    id="nomeTitular"
                  />
                </div>
              </div>
              <div className="row mb-3">
              </div>
            </form>
          </div>
        </div>
        <div className="col-md-4 p-3">
          <div className="card">
            <div className="card-header bg-warning">Resumo da Reserva</div>
            <div className="card-body">
              <div className="mb-3">
                {exibir.length > 0 ? (
                  exibir.map((dado, index) => (
                    <div key={index}>
                      <h3>Retirada</h3>
                      <p>local: {dado.localRetirada}</p>
                      <label className="mt-1">Data de Retirada: </label>
                      <input type="date" value={dado.dataInicio} readOnly class="form-control border border-secondary" />
                      <label className="mt-3">Horário da retirada: </label>
                      <input class="form-control border border-secondary" readOnly type="time" value={dado.horaInicio} />
                      <p className="mt-3">Veículo: {dado.modelo} - {dado.marca}</p>
                      <p className="mt-3">Preço por dia: {dado.preco}</p>
                      <hr></hr>
                      <label>Data de Devolucao</label>
                      <input type="date" value={dado.dataFim} readOnly class="form-control border border-secondary" />
                      <p className="mt-3">Até às 18:00 horas.</p>
                      <p className="mt-3">Preço total R$ {dado.precoTotal}</p>
                    </div>
                  ))
                ) : (
                  <p>Carregando informações...</p>
                )}
                <hr />
              </div>
            </div>
          </div>
          <button className="btn btn-dark w-100 mt-3" onClick={envioPagamento}>Reservar</button>
        </div>
      </div>
    </div>
  );
};

export default Reserva;
