import React from "react";
import styles from "./index_footer.module.css"

export default function Footer(){
    return(
        <footer className={styles.footer}>
            <div className={styles.coluna_footer}>
                <h4>Contato</h4>
                <p>Email: contato@navcar.com.br</p>
                <p>Telefone: (11) 1234-5678</p>
                <p>Endereço: Rua: Exemplo, 234, São Paulo-SP</p>
            </div>
            <div>
                <h4>Links úteis</h4>
                <p>Sobre Nós</p>
                <p>Serviços</p>
                <p>Contato</p>
            </div>
            <div>
                <h4>Siga-nos</h4>
                <div>
                    <img alt="logo facebook"></img>
                    <img alt="logo X"></img>
                    <img alt="logo instagram"></img>
                </div>
            </div>
        </footer>
    )
}