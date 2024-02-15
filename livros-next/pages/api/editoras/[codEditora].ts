// Importar os módulos necessários
import { NextApiRequest, NextApiResponse } from 'next';
import { ControleEditora } from '../../../classes/controle/ControleEditora';

// Definir uma instância exportável de ControleEditora
const controleEditora = new ControleEditora();

// Definir a função de tratamento de requisições
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Verificar o método da requisição
    if (req.method === 'GET') {
        try {
            // Obter o código da editora da URL
            const { codEditora } = req.query;
            // Obter o nome da editora
            const nomeEditora = await controleEditora.getNomeEditora(Number(codEditora));
            // Responder com status 200 e um objeto JSON contendo o nome da editora
            res.status(200).json({ nome: nomeEditora });
        } catch (error) {
            // Em caso de exceção, responder com status 500 (erro interno do servidor)
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        // Responder com status 405 (método não permitido)
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
