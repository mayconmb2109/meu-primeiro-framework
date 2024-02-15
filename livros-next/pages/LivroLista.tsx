import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Menu } from '../componentes/Menu';
import styles from '../styles/Home.module.css';
import { Livro } from '../classes/modelo/Livro';
import { LinhaLivro } from '../componentes/LinhaLivro';

// Definindo a URL base da API de livros
const baseURL = 'http://localhost:3000/api/livros';

const LivroLista: React.FC = () => {
    const [livros, setLivros] = useState<Array<Livro>>([]);
    const [carregado, setCarregado] = useState<boolean>(false);

    useEffect(() => {
        const obterLivros = async () => {
            try {
                const response = await fetch(baseURL);
                const data = await response.json();
                setLivros(data);
                setCarregado(true);
            } catch (error) {
                console.error('Erro ao obter os livros:', error);
            }
        };

        obterLivros();
    }, [carregado]);

    const excluirLivro = async (codigo: number): Promise<boolean> => {
        try {
            const response = await fetch(`${baseURL}/${codigo}`, {
                method: 'DELETE'
            });
            return response.ok;
        } catch (error) {
            console.error('Erro ao excluir o livro:', error);
            return false;
        }
    };

    const excluir = async (codigoLivro: number) => {
        const sucesso = await excluirLivro(codigoLivro);
        if (sucesso) {
            setCarregado(false); // Força o redesenho da página
        }
    };

    return (
        <div className="container">
            <Head>
                <title>Lista de Livros</title>
            </Head>
            <Menu />
            <main>
                <h1 className="mb-4">Lista de Livros</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Título</th>
                            <th scope="col">Resumo</th>
                            <th scope="col">Editora</th>
                            <th scope="col">Autores</th>
                        </tr>
                    </thead>
                    <tbody>
                        {livros.map(livro => (
                            <LinhaLivro key={livro.codigo} livro={livro} excluir={excluir} />
                        ))}
                    </tbody>
                </table>
            </main>
        </div>

    );
};

export default LivroLista;
