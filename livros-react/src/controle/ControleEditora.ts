import { Editora } from '../modelo/Editora';

// Definir a variável editoras, como Array<Editora>, contendo ao menos três elementos, no formato JSON
const editoras: Array<Editora> = [
    { codEditora: 1, nome: 'Alta Books' },
    { codEditora: 2, nome: 'Pearson' },
    { codEditora: 3, nome: 'Addison Wesley' }
];

class ControleEditora {
    // Implementar o método getEditoras, com o retorno do vetor editoras
    getEditoras(): Array<Editora> {
        return editoras;
    }

    // Implementar o método getNomeEditora, recebendo codEditora, do tipo numérico, e retornando o nome da editora, através de uma operação filter sobre o vetor editoras
    getNomeEditora(codEditora: number): string {
        const editora = editoras.find(editora => editora.codEditora === codEditora);
        return editora ? editora.nome : 'Editora não encontrada';
    }
}

export { ControleEditora };
