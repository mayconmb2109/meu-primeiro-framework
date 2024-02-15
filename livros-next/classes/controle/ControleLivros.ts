import { Livro } from '../modelo/Livro';

// Definir a variável livros, como Array<Livro>, contendo ao menos três elementos, no formato JSON
const livros: Array<Livro> = [
    { codigo: 1, codEditora: 1, titulo: 'Use a Cabeça: Java', resumo: 'Use a cabeça! Java é uma experiência completa de aprendizado em programação orientada a objetos (OO) e Java.', autores: ['Bert Bates', 'Kathy Sierra'] },
    { codigo: 2, codEditora: 2, titulo: 'Java, como Programar', resumo: 'Milhões de alunos e profissionais aprendem programação e desenvolvimento de software com os livros Deitel.', autores: ['Paul Deitel', 'Harvey Deitel'] },
    { codigo: 3, codEditora: 3, titulo: 'Core Java for the Impatient', resumo: 'Readers familiar with Horstmann\'s original, two-volume "Core Java" books who are looking for a comprehensive, but condensed guide to all of rhe new features and functions of Java SE 9 will learn how these new features impact the language and core libraries.', autores: ['Cay Horstmann'] }
];

class ControleLivros {
    // Implementar o método obterLivros, com o retorno do vetor livros
    obterLivros(): Promise<Array<Livro>> {
        return Promise.resolve(livros);
    }    

    // Implementar o método incluir, recebendo um objeto do tipo Livro, que terá o código trocado pelo código mais alto do vetor, incrementado de um, e depois será adicionado ao vetor
    incluir(livro: Livro): void {
        // Encontrar o código mais alto atualmente no vetor
        let maxCodigo = 0;
        livros.forEach(l => {
            if (l.codigo > maxCodigo) {
                maxCodigo = l.codigo;
            }
        });

        // Incrementar o código em um e adicionar o livro ao vetor
        livro.codigo = maxCodigo + 1;
        livros.push(livro);
    }

    // Implementar o método excluir, recebendo o código do livro a ser excluído, e remover o livro do vetor
    excluir(codigo: number): void {
        // Encontrar o índice do livro com o código fornecido
        const index = livros.findIndex(livro => livro.codigo === codigo);

        // Remover o livro do vetor, se encontrado
        if (index !== -1) {
            livros.splice(index, 1);
        }
    }
}

export { ControleLivros };
