// Importar os módulos necessários
import { NextApiRequest, NextApiResponse } from 'next';
import { ControleLivros } from '../../../classes/controle/ControleLivros';

// Definir uma instância exportável de ControleLivro
const controleLivros = new ControleLivros();

// Definir a função de tratamento de requisições
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Verificar o método da requisição
    if (req.method === 'GET') {
        try {
            // Obter os livros
            const livros = await controleLivros.obterLivros();
            // Responder com status 200 e o vetor de livros em formato JSON
            res.status(200).json(livros);
        } catch (error) {
            // Em caso de exceção, responder com status 500 (erro interno do servidor)
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else if (req.method === 'POST') {
        try {
            // Incluir o livro fornecido no corpo da requisição
            await controleLivros.incluir(req.body);
            // Responder com status 200 e uma mensagem de sucesso em formato JSON
            res.status(200).json({ message: 'Livro adicionado com sucesso' });
        } catch (error) {
            // Em caso de exceção, responder com status 500 (erro interno do servidor)
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        // Responder com status 405 (método não permitido)
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
