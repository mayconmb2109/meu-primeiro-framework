import Link from 'next/link';

export const Menu: React.FC = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" href="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/LivroLista">Lista de Livros</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/LivroDados">Dados do Livro</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
