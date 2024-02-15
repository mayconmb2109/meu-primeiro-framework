import { ControleEditora } from '../classes/controle/ControleEditora';
import type { Livro } from '../classes/modelo/Livro';
// Defina a interface LinhaLivroProps
interface LinhaLivroProps {
    livro: Livro;
    excluir: (codigoLivro: number) => void; // Agora espera um argumento do tipo number
}

// Defina o componente LinhaLivro
export const LinhaLivro: React.FC<LinhaLivroProps> = ({ livro, excluir }) => {
    const controleEditora = new ControleEditora();
    const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);

    return (
        <tr>
            <td>
                {livro.titulo}<br></br>
                <button onClick={() => excluir(livro.codigo)} className="btn btn-sm btn-danger ms-2">Excluir</button>
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
