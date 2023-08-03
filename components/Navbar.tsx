import Link from 'next/link';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Início</Link>
        </li>
        <li>
          <Link href="/categories">Categoria Cliente</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
