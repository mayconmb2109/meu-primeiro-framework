import React, { useState } from 'react';
import Head from 'next/head';
import { Menu } from '../componentes/Menu';
import styles from '../styles/Home.module.css';
import { ControleEditora } from '../classes/controle/ControleEditora';
import { useRouter } from 'next/router';
import type { Livro } from '../classes/modelo/Livro';

// Definindo a URL base da API de livros
const baseURL = 'http://localhost:3000/api/livros';

const LivroDados: React.FC = () => {
    // Objeto do tipo ControleEditora
    const controleEditora = new ControleEditora();

    // Vetor opcoes
    const opcoes = controleEditora.getEditoras().map(editora => ({
        value: editora.codEditora,
        text: editora.nome
    }));

    // Estados para as propriedades de estado
    const [titulo, setTitulo] = useState('');
    const [resumo, setResumo] = useState('');
    const [autores, setAutores] = useState('');
    const [codEditora, setCodEditora] = useState(opcoes[0].value);

    // Hook de navegação do Next.js
    const navigate = useRouter();

    // Função incluirLivro
    const incluirLivro = async (livro: Livro): Promise<boolean> => {
        try {
            const response = await fetch(baseURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(livro)
            });
            return response.ok;
        } catch (error) {
            console.error('Erro ao incluir o livro:', error);
            return false;
        }
    };

    // Método tratarCombo
    const tratarCombo = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCodEditora(Number(event.target.value));
    };

    // Método incluir
    const incluir = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Separando autores por linha
        const autoresArray = autores.split('\n');

        // Instanciando um novo livro
        const novoLivro: Livro = {
            codigo: 0,
            titulo: titulo,
            resumo: resumo,
            autores: autoresArray,
            codEditora: codEditora
        };

        // Incluindo o livro
        const sucesso = await incluirLivro(novoLivro);
        if (sucesso) {
            // Navegando para a página LivroLista
            navigate.push('/LivroLista');
        }
    };

    return (
        <div className="container">
            <Head>
                <title>Dados do Livro</title>
            </Head>
            <Menu />
            <main>
                <h1 className="mb-4">Dados do Livro</h1>
                <form onSubmit={incluir}>
                    <div className="mb-3">
                        <label className="form-label">Título:</label>
                        <input type="text" className="form-control" value={titulo} onChange={e => setTitulo(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Resumo:</label>
                        <input type="text" className="form-control" value={resumo} onChange={e => setResumo(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Autores (um por linha):</label>
                        <textarea className="form-control" value={autores} onChange={e => setAutores(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Editora:</label>
                        <select className="form-select" value={codEditora} onChange={tratarCombo}>
                            {opcoes.map(opcao => (
                                <option key={opcao.value} value={opcao.value}>{opcao.text}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary">Salvar</button>
                    </div>
                </form>
            </main>
        </div>

    );
};

export default LivroDados;
