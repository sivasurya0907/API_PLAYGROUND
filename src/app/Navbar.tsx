// Navbar.tsx
import { MoonIcon } from '@heroicons/react/24/solid';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface NavbarProps {
  toggleTheme: () => void;
  isDarkTheme: boolean;
}

const Navbar = ({ toggleTheme, isDarkTheme }: NavbarProps) => {
  return (
    <nav className="navbar">
      <div className="logo">Logo</div>
      <MoonIcon
        className="moon-icon"
        onClick={toggleTheme}
        style={{ cursor: 'pointer', width: '24px', height: '24px',  }} // Add styles as needed
      />
    </nav>
  );
};

export default Navbar;
