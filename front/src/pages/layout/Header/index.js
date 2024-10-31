import React from "react";
import styles from './index_header.module.css'

export default function Header(){
    return(
        <header className={styles.header}>
            <div className={styles.header_container}>
                <div className={styles.titulo_header}>nav car</div>
                <div>
                    <ul className={styles.lista_header}>
                        <li className={styles.item_header}>Planos</li>
                        <li className={styles.item_header}>Página 1</li>
                        <li className={styles.item_header}>Página 2</li>
                        <li className={styles.item_header}>Login</li>
                    </ul>
                </div>

            </div>
        </header>
    )
}