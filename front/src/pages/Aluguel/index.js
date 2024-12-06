import React from "react";
import api from "../../utils/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Aluguel() {

  const navigate = useNavigate()

  const [aluguel, setAluguel] = useState([])
  const [carro, setCarro] = useState([])
  const [preco, setPreco] = useState(0)
  const [exibir, setExibir] = useState([])
  const [seguro, setSeguro] = useState([
    { icon: "car", text: "Proteção do Carro", price: 19.95 },
    { icon: "shield-alt", text: "Proteção Total Avarias", price: 35.95 },
    { icon: "user-shield", text: "Seguro de Terceiros", price: 17.95 },])
  const [adicionais, setAdicionais] = useState([
    { icon: "user-plus", text: "Condutor Adicional Ilimitado", price: 19.95 },
    { icon: "leaf", text: "Neutraliza - Compensação de Carbono", price: 1.99 },
  ])
  const [dataRetirada, setDataRetirada] = useState(null)
  const [dataDevolucao, setDDataDevolucao] = useState('')
  const [limpeza, setLimpeza] = useState(false)
  const [seguroVeiculo, setSeguroVeiculo] = useState(false)
  const [avariasVeiculo, setAvariasSeguroVeiculo] = useState(false)
  const [terceiros, setTerceiros] = useState(false)
  const [condutor, setCondutor] = useState(false)
  const [neutraliza, setNeutraliza] = useState(false)
  const [adicionaisVeiculo, setAdicionaisVeiculo] = useState(false)
  
  const [today, setToday] = useState(() => {
    // Obtém a data atual no formato YYYY-MM-DD
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Adiciona zero à esquerda
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  });

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

    if (carro.length > 0) {
      console.log(aluguel[0])
      console.log(carro[0])
      let dataInicio = aluguel[0].inicio_aluguel
      let dataConversao = dataInicio.split('T')[0]
      let horaConversao = dataInicio.split('T')[1].split('.')[0]


      let dadosTela = {
        dataInicio: dataConversao,
        horaInicio: horaConversao,
        dataFim: null,
        horaFim: null,
        modelo: carro[0].modelo,
        marca: carro[0].marca,
        preco: carro[0].preco,
        localRetirada: aluguel[0].local_retirada,
        localDevolucao: aluguel[0].local_devolucao
      }
      if (exibir.length < 1) {
        setExibir(prevState => [...prevState, dadosTela])
      }


      console.log(exibir)
    }

  }, [carro]);

  function changeData(e) {
    
    setPreco(0)

    setLimpeza(false)
    setSeguroVeiculo(false)
    setAvariasSeguroVeiculo(false)
    setTerceiros(false)
    setCondutor(false)
    setNeutraliza(false)
    setAdicionaisVeiculo(false)
    setPreco(0)
    

    let dataInicio = aluguel[0].inicio_aluguel
    let dataConversao = dataInicio.split('T')[0]

    const primeiraData = new Date(dataConversao);
    const segundaData = new Date(e.target.value);

    if(segundaData - primeiraData < 0){
      alert('a data deve ser maior que a retirada')
      return
    }

    

    const diferencaEmMilissegundos = Math.abs(segundaData - primeiraData);
    const diferencaEmDias = Math.ceil(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));
    let valorTotal
    console.log('dias',diferencaEmDias)
    if(diferencaEmDias == 0 ){
      
      valorTotal = carro[0].preco
    }else if(diferencaEmDias > 0){
      
      valorTotal = carro[0].preco * diferencaEmDias      
    }else{
      
      alert('a data de devolucao deve ser maior que a de devolução!')
      
    }

    console.log('precoTotal')
    setPreco(valorTotal+preco)
    setDataRetirada(e.target.value)
    

    return diferencaEmDias;
  }

  function voltar(e){
    navigate('user/rent')
  }

  function addLimpeza(e) {
    console.log(e.target.checked)
    if (e.target.checked) {
      setPreco(preco + 30.01)
      setLimpeza(true)
    } else {
      setPreco(preco - 30.01)
      setLimpeza(false)
    }
  }

  function addSeguro(e) {
    const id = e.target.id
    if (e.target.checked) {
      setPreco(preco + seguro[id].price)
      if(id == 0){
        setSeguroVeiculo(true)

      }
      if(id == 2){
        setTerceiros(true)

      }
      if(id == 1){
        setAvariasSeguroVeiculo(true)

      }

    } else {
      setPreco(preco - seguro[id].price)
      if(id == 0){
        setSeguroVeiculo(false)
      }
      if(id == 2){
        setTerceiros(false)
      }
      if(id == 1){
        setAvariasSeguroVeiculo(false)
      }
    }
  }

  function addAdicionais(e) {
    const id = e.target.id
    if (e.target.checked) {
      setPreco(preco + adicionais[id].price)
      setAdicionaisVeiculo(true)
      if(id == 0){
        setCondutor(true)        
      }
      if(id == 1){
        setNeutraliza(true)
      }
    } else {
      setPreco(preco - adicionais[id].price)
      setAdicionaisVeiculo(false)
      if(id == 0){
        setCondutor(false)        
      }
      if(id == 1){
        setNeutraliza(false)
      }}

  }

  function mudarData(e){
    setDataRetirada(e.target.value)
    changeData(e)
  }


  async function criarAluguel(e){
    const updateAluguel = {
      alugado: false,
      fim_aluguel: dataRetirada,
      localDevolucao:'Centro Universitário Senac',
      limpeza: limpeza,
      protecaoCarro: seguroVeiculo,
      protecaoAvarias: avariasVeiculo,
      segurosTerceiros: terceiros,
      condutorAdcionais: condutor,
      condutorNeutraliza: neutraliza,
      preco: preco,       
    }

    console.log('data',dataRetirada)

    if(dataRetirada == null){
      alert("voce deve escolher uma data")
      return
    }

    const url = window.location.href.split('/')
    let idAluguel = url[url.length - 1]
    idAluguel = parseInt(idAluguel)

    const result = await api.post(`car/atualizar-aluguel/${idAluguel}`,{updateAluguel})
    
    console.log(result.data)
    
    navigate(`/car/pagamento/${idAluguel}`)

    console.log(updateAluguel)

  }

  

  return (
    <div>
      <div className="container p-3" style={{ backgroundColor: "#D6D6D6" }}>
        <div className="row">
          <div className="col-md-8">
            <div className="card mb-3">
              <div className="card-header d-flex justify-content-between align-items-center bg-success">
                <span>Economize 40% comprando a lavagem agora</span>
                <span>R$ 30,01 <small>*valor único</small></span>
              </div>
              <div className="card-body">
                <p>
                  Não se preocupe em lavar o carro para devolvê-lo. Mas lembre-se: em caso de sujeira excessiva, como: lama, areia, manchas, pelos de animais, odor forte e similares, será cobrada lavagem especial a partir de R$ 120,00.
                </p>
                <div className="form-check form-switch">
                  <label>Limpeza</label>
                  <input className="form-check-input" type="checkbox" onChange={addLimpeza} />
                </div>
              </div>
            </div>
            {/* Proteções */}
            <div className="card mb-3">
              <div className="card-header bg-success">Proteções</div>
              <div className="card-body">
                <p>Para uma viagem mais segura, escolha uma proteção para o seu aluguel: (opcional)</p>
                <ul className="list-group">
                  {/* Opções de Proteção */}
                  {seguro.map((item, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <i className={`fas fa-${item.icon}`}></i> {item.text}
                      </div>
                      <div>
                        <span>R$ {item.price}</span>
                        <div className="form-check form-switch">
                          <input className="form-check-input" id={index} type="checkbox" onChange={addSeguro} />
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Adicionais */}
            <div className="card mb-3">
              <div className="card-header bg-success">Adicionais</div>
              <div className="card-body">
                <p>Fique livre de preocupações! Conheça e inclua os nossos adicionais na sua reserva: (opcional)</p>
                <ul className="list-group">
                  {adicionais.map((item, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <i className={`fas fa-${item.icon}`}></i> {item.text}
                      </div>
                      <div>
                        <span>R$ {item.price}</span>
                        <div className="form-check form-switch">
                          <input className="form-check-input" type="checkbox" id={index} onChange={addAdicionais} />
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Botões de Navegação */}
            <div className="d-flex justify-content-between">
              <button className="btn btn-secondary" onClick={voltar}>VOLTAR</button>
              <button className="btn btn-primary" onClick={criarAluguel}>CONTINUAR</button>
            </div>
          </div>

          {/* Coluna Direita */}
          <div className="col-md-4">
            {/* Resumo da Reserva */}
            <div className="card summary-card">
              <div className="card-header bg-success">Resumo da Reserva</div>
              <div className="card-body">
                {exibir.length > 0 ? (
                  exibir.map((dado, index) => (
                    <div key={index}>
                      <h3>Retirada</h3>
                      <p>local: {dado.localRetirada}</p>
                      <label className="mt-1">Data de Retirada: </label>
                      <input type="date" value={dado.dataInicio} readOnly class="form-control border border-secondary" />
                      <label className="mt-3" >Horário da retirada: </label>
                      <input class="form-control border border-secondary" readOnly type="time" value={dado.horaInicio} />
                      <p className="mt-3">Veículo: {dado.modelo} - {dado.marca}</p>
                      <p className="mt-3">Preço por dia: {dado.preco}</p>
                    </div>
                  ))
                ) : (
                  <p>Carregando informações...</p>
                )}
                <hr />
                <div className="mb-3">
                  <h3 className="mt-1">Data da devolção: </h3>
                  <input type="date" required onChange={changeData} min={today} className="form-control mt-1 border border-secondary" />
                  <label className="mt-3">Horário da Devolucao: máximo 18:00 hrs</label>
                </div>
                <p className="text-success"><strong>Valor total previsto: </strong></p>
                {
                  preco < 0 ? (
                    setPreco(0),
                    <p>{preco}</p>
                  ) : (
                    <p>R$ {preco.toFixed(2)}</p>
                  )
                }
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Aluguel;