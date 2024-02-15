import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ControleLivros } from './controle/ControleLivros';
import { ControleEditora } from './controle/ControleEditora';

const LivroDados = () => {
    // Instanciar um controlador de livros e um de editoras
    const controleLivro = new ControleLivros();
    const controleEditora = new ControleEditora();

    // Definir o vetor opcoes
    const opcoes = controleEditora.getEditoras().map(editora => ({
        value: editora.codEditora,
        text: editora.nome
    }));

    // Definir as propriedades de estado
    const [titulo, setTitulo] = useState('');
    const [resumo, setResumo] = useState('');
    const [autores, setAutores] = useState('');
    const [codEditora, setCodEditora] = useState(opcoes[0].value);

    // Hook para navegação
    const navigate = useNavigate();

    // Método para tratar a seleção da combo de editoras
    const tratarCombo = event => {
        setCodEditora(Number(event.target.value));
    };

    // Método para inclusão de um novo livro
    const incluir = event => {
        event.preventDefault();
        const autoresArray = autores.split('\n');
        const novoLivro = {
            codigo: 0,
            titulo,
            resumo,
            autores: autoresArray,
            codEditora
        };
        controleLivro.incluir(novoLivro);
        navigate('/');
    };

    return (
        <main>
            <div className='container'>
                <h1>Dados do Livro</h1>
                <form onSubmit={incluir}>
                    <div className="mb-3">
                        <label htmlFor="titulo" className="form-label">Título</label>
                        <input type="text" className="form-control" id="titulo" value={titulo} onChange={e => setTitulo(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="resumo" className="form-label">Resumo</label>
                        <textarea className="form-control" id="resumo" value={resumo} onChange={e => setResumo(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="editora" className="form-label">Editora</label>
                        <select className="form-select" id="editora" value={codEditora} onChange={tratarCombo}>
                            {opcoes.map(opcao => (
                                <option key={opcao.value} value={opcao.value}>{opcao.text}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="autores" className="form-label">Autores (um por linha)</label>
                        <textarea className="form-control" id="autores" value={autores} onChange={e => setAutores(e.target.value)} required />
                    </div>
                    
                    <button type="submit" className="btn btn-primary">Salvar</button>
                </form>
            </div>
        </main>
    );
};

export default LivroDados;
