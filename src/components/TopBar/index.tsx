import './styles.css';
import '../../assets/logo.jpeg';
import logo from '../../assets/logo.jpeg';


interface TopBarProps {
    title: string;
}

export function TopBar({ title }: TopBarProps) {
    return (
        <div id="top-bar">
            <img src={logo} alt="logo" />
            <h1>{title}</h1>
        </div>
    );
}