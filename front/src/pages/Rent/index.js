import React from "react";
import styles from './index_rent.module.css'
import Header from '../layout/Header'
import moeda from '../../assets/moeda.png'
import mobi from '../../assets/mobi.png'
import Footer from '../layout/Footer'


export default function Rent() {

    const card = [{
        "id": 1,
        "modelo":"Fiat Mobi 1.0",
        "marca": "Renault",
        "ano":"2020",
        "imagem": mobi
    },{
        "id": 1,
        "modelo":"Fiat Mobi 1.0",
        "marca": "Renault",
        "ano":"2020",
        "imagem": mobi
    },{
        "id": 1,
        "modelo":"Fiat Mobi 1.0",
        "marca": "Renault",
        "ano":"2020",
        "imagem": mobi
    },{
        "id": 1,
        "modelo":"Fiat Mobi 1.0",
        "marca": "Renault",
        "ano":"2020",
        "imagem": mobi
    },{
        "id": 1,
        "modelo":"Fiat Mobi 1.0",
        "marca": "Renault",
        "ano":"2020",
        "imagem": mobi
    },{
        "id": 1,
        "modelo":"Fiat Mobi 1.0",
        "marca": "Renault",
        "ano":"2020",
        "imagem": mobi
    },{
        "id": 1,
        "modelo":"Fiat Mobi 1.0",
        "marca": "Renault",
        "ano":"2020",
        "imagem": mobi
    },{
        "id": 1,
        "modelo":"Fiat Mobi 1.0",
        "marca": "Renault",
        "ano":"2020",
        "imagem": mobi
    },{
        "id": 1,
        "modelo":"Fiat Mobi 1.0",
        "marca": "Renault",
        "ano":"2020",
        "imagem": mobi
    }]

    return (
        <div>
            <Header></Header>
            <div className={styles.banner_rent}>
                <div></div>
                <div className={styles.frase_efeito}>
                    <p>frase de efeito</p>
                    <p>"Fazer"</p>
                </div>
            </div>
            <form className={styles.form_rent}>
                <div className={styles.container_inputs}>
                    <div className={styles.conteudo_input_text}>
                        <div className={styles.div_input}>
                            <input type="text" className={styles.input} placeholder="Onde voce quer alugar?" />
                            
                            <svg _ngcontent-serverApp-c158="" className={styles.svg} viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path _ngcontent-serverApp-c158="" fill-rule="evenodd" clip-rule="evenodd" d="M0 5.79457C0 2.59944 2.69158 0 6 0C9.30839 0 11.9999 2.59944 12 5.79457C12 9.75982 6.63059 15.581 6.40198 15.8269C6.18764 16.0575 5.81275 16.0579 5.59802 15.8269C5.36941 15.581 0 9.75982 0 5.79457ZM2.98128 5.79457C2.98128 7.40213 4.33545 8.70998 6 8.70998C7.66452 8.70998 9.01869 7.40217 9.01869 5.7946C9.01869 4.18704 7.66452 2.87919 6 2.87919C4.33548 2.87919 2.98128 4.18701 2.98128 5.79457Z" fill="#555"></path>
                            </svg>

                        </div>
                    </div>
                    <div className={styles.conteudo_input}>
                        <div className={styles.div_input}>
                            <input type="date" className={styles.input} />
                        </div>
                    </div>
                    <div className={styles.conteudo_input}>
                        <div className={styles.div_input}>
                            <input type="time" className={styles.input} />
                        </div>
                    </div>
                </div>
                <div className={styles.planos_rent}>
                    <img alt="moeda" src={moeda} className={styles.moeda}></img>
                    <p>Economize com nossos planos</p>
                </div>
            </form>
            <main className={styles.principal_rent}>
                <div className={styles.container_veiculos} >
                    <h3 className={styles.titulo_rent}>Grupo de Carros</h3>
                    <div className={styles.veiculos_rent}>
                        {card.map( carro =>(
                            <div key={carro.id} className={styles.card_veiculo}>
                                <p>{carro.modelo}, {carro.marca}</p>
                                <img alt="veiculo" src={carro.imagem} className={styles.veiculo_card}></img>
                                <button className={styles.botao_veiculos}>Reserve Agora</button>
                                <p className={styles.detalhes_veidulos}>mais detalhes</p>
                            </div>
                        ))}
                        { card.length==0 && <h1>Não Há Veículos</h1>}
                    </div>
                </div>
            </main>
            <Footer></Footer>
        </div>
    )
}