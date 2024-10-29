import React from "react"
import styles from './index_home.module.css'
import car1 from '../../assets/image 1.png'
import car2 from '../../assets/image 4.png'
import Footer from '../layout/Footer/index.js'

function Home() {
    return (
        <div>
            <header className={styles.cabecalho_home}>
                <nav className={styles.navegacao}>
                    <ul className={styles.menu_navegacao}>
                        <li className={styles.menu_navegacao_itens}>Login</li>
                        <li className={styles.menu_navegacao_itens}>Cadastro</li>
                    </ul>
                </nav>
                <div className={styles.container_titulo}>
                    <h1 className={styles.titulo}>Nav Car</h1>
                    <p className={styles.titulo_mensagem}>Sua viagem começa aqui</p>
                </div>
            </header>
            <main>
                <div className={styles.conteiner_conteudo}>
                    <div className={styles.container_mensagem}>
                        <div className={styles.conteudo_principal}>
                            <div className={styles.titulo_container}>
                                <h2>Quem nós Somos</h2>
                            </div>
                            <p className={styles.paragrafo_container}>A Navcar é uma empresa de aluguel de carros fundada em São Paulo, dedicada a proporcionar uma experiência de mobilidade prática, segura e eficiente. </p>
                            <p className={styles.paragrafo_container}>Com uma frota constantemente renovada e serviços personalizados, estamos comprometidos em oferecer veículos que atendam às diversas necessidades dos nossos clientes, desde viagens de negócios até aventuras em família.</p>
                        </div>
                        <div className={styles.container_imagem}>
                            <img src={car1} className={styles.imagem_conteudo} alt="imagem de um veículo na estrada"></img>
                        </div>
                    </div>
                </div>
                <div className={styles.conteiner_busca}>
                    <div>
                        <h3 className={styles.titulo_container}>Alugue um Carro</h3>
                    </div>
                    <div className={styles.container_inputs}>
                        <div className={styles.conteudo_input}>
                            <label className={styles.label}>
                                Alugue um carro
                            </label>
                            <div className={styles.div_input}>
                                <svg _ngcontent-serverApp-c158="" className={styles.svg} viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path _ngcontent-serverApp-c158="" fill-rule="evenodd" clip-rule="evenodd" d="M0 5.79457C0 2.59944 2.69158 0 6 0C9.30839 0 11.9999 2.59944 12 5.79457C12 9.75982 6.63059 15.581 6.40198 15.8269C6.18764 16.0575 5.81275 16.0579 5.59802 15.8269C5.36941 15.581 0 9.75982 0 5.79457ZM2.98128 5.79457C2.98128 7.40213 4.33545 8.70998 6 8.70998C7.66452 8.70998 9.01869 7.40217 9.01869 5.7946C9.01869 4.18704 7.66452 2.87919 6 2.87919C4.33548 2.87919 2.98128 4.18701 2.98128 5.79457Z" fill="#555"></path>
                                </svg>

                                <input type="text" className={styles.input} placeholder="Onde voce quer alugar?" />
                            </div>
                        </div>
                        <div className={styles.conteudo_input}>
                            <label className={styles.label}>
                                Data e Hora da Retirada
                            </label>
                            <div className={styles.div_input}>
                                <input type="date" className={styles.input} />

                                <input type="time" className={styles.input} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.conteiner_conteudo}>
                    <div className={styles.container_mensagem}>
                        <div className={styles.container_imagem}>
                            <img src={car2} className={styles.imagem_conteudo_dois} alt="imagem de um veículo na estrada"></img>
                        </div>
                        <div className={styles.conteudo_dois}>
                            <div>
                                <h2 className={styles.titulo_dois}>Frota Atualizada</h2>
                            </div>
                            <p className={styles.paragrafo_container}>Aqui na NavCar, oferecemos uma frota de veículos constantemente atualizada para garantir o máximo de conforto, segurança e tecnologia aos nossos clientes. Nossa seleção de carros vai desde modelos compactos e econômicos até SUVs e veículos premium . </p>

                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </main>
        </div>
    )
}

export default Home