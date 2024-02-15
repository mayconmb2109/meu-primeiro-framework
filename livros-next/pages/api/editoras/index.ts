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
            // Obter o vetor de editoras
            const editoras = await controleEditora.getEditoras();
            // Responder com status 200 e o vetor de editoras em formato JSON
            res.status(200).json(editoras);
        } catch (error) {
            // Em caso de exceção, responder com status 500 (erro interno do servidor)
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        // Responder com status 405 (método não permitido)
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
