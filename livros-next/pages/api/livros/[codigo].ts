// Importar os módulos necessários
import { NextApiRequest, NextApiResponse } from 'next';
import { ControleLivros } from '../../../classes/controle/ControleLivros';

// Definir uma instância exportável de ControleLivros
const controleLivros = new ControleLivros();

// Definir a função de tratamento de requisições
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Verificar o método da requisição
    if (req.method === 'DELETE') {
        try {
            // Obter o código do livro da URL
            const { codigo } = req.query;
            // Excluir o livro com o código fornecido
            await controleLivros.excluir(Number(codigo));
            // Responder com status 200 e uma mensagem de sucesso em formato JSON
            res.status(200).json({ message: 'Livro excluído com sucesso' });
        } catch (error) {
            // Em caso de exceção, responder com status 500 (erro interno do servidor)
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        // Responder com status 405 (método não permitido)
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
