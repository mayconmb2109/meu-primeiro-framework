import React, { useState, useEffect } from 'react';
import { ControleLivros } from './controle/ControleLivros';
import { ControleEditora } from './controle/ControleEditora';

// Definir o componente auxiliar LinhaLivro
const LinhaLivro = ({ livro, excluir }) => {
    // Instanciar um controlador de editoras
    const controleEditora = new ControleEditora();
    // Definir o atributo nomeEditora, invocando o método getNomeEditora
    const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);

    return (
        <tr>
            <td>
                {livro.titulo}<br></br>
                <button className="btn btn-sm btn-danger ml-2" onClick={() => excluir(livro.codigo)}>Excluir</button>
            </td>            
            <td>{livro.resumo}</td>
            <td>{nomeEditora}</td>            
            <td>
                <ul>
                    {livro.autores.map((autor, index) => (
                        <li key={index}>{autor}</li>
                    ))}
                </ul>
            </td>
        </tr>
    );
};

// Definir o componente LivroLista
const LivroLista = () => {
    // Definir as propriedades livros, do tipo vetor, e carregado, booleana, através de useState
    const [livros, setLivros] = useState([]);
    const [carregado, setCarregado] = useState(false);

    // Utilizar o Hook useEffect para alimentar livros com a chamada para obterLivros do controlador
    useEffect(() => {
        const controleLivro = new ControleLivros();
        controleLivro.obterLivros().then(livros => {
            setLivros(livros);
            setCarregado(true);
        });
    }, [carregado]);

    // Acrescentar o método excluir
    const excluir = (codigoLivro) => {
        const controleLivro = new ControleLivros();
        controleLivro.excluir(codigoLivro);
        setCarregado(false); // Força o redesenho da página
    };

    // Retorno do componente
    return (
        <main>
            <h1>Catálogo de Livros</h1>
            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th>Título</th>                        
                        <th>Resumo</th>
                        <th>Editora</th>
                        <th>Autores</th>
                    </tr>
                </thead>
                <tbody>
                    {livros.map(livro => (
                        <LinhaLivro key={livro.codigo} livro={livro} excluir={excluir} />
                    ))}
                </tbody>
            </table>
        </main>
    );
};

export default LivroLista;
