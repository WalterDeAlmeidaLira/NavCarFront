import React from "react"
import { Link } from "react-router-dom"
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
                        <Link to="/login" className={styles.link}><li className={styles.menu_navegacao_itens}>Login</li></Link>
                        <Link to="/register" className={styles.link}><li className={styles.menu_navegacao_itens}>Cadastro</li></Link>
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
                            
                            
                        </div>
                        <div className={styles.conteudo_input}>
                            
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