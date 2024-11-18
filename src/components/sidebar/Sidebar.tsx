import { useTheme } from '../../ThemeContext';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { SidebarContainer, ToggleButton, BurgerIcon, Overlay, SettingsContainer, LogoutButton } from './Sidebar.styles';
import SearchSidebar from "../searchFieldSidebar/SearchFieldSidebar";
import {SearchSidebarContainer} from "../searchFieldSidebar/SearchFieldSidebar.styles";
import { BiLogOut } from "react-icons/bi";

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar}) => {
    const { isDarkMode, toggleTheme } = useTheme();
    const handleLogout = () => {
        console.log('Logging out...');
        // Weitere Logout-Logik, z. B. API-Aufruf oder Session löschen
    };

    return (
        <>
            <SidebarContainer isOpen={isOpen}>
                <ToggleButton onClick={toggleSidebar}>
                    <BurgerIcon>☰</BurgerIcon>
                </ToggleButton>
                <SearchSidebarContainer>
                    {isOpen && <SearchSidebar/>}
                </SearchSidebarContainer>

                <SettingsContainer isOpen={isOpen}>
                    <LogoutButton onClick={handleLogout}>
                        <BiLogOut />
                    </LogoutButton>
                    <LogoutButton onClick={handleLogout}>
                        <BiLogOut />
                    </LogoutButton>
                    <DarkModeSwitch
                        style={{padding: "10px"}}
                        moonColor={"white"}
                        sunColor={"#faba44"}
                        checked={isDarkMode}
                        onChange={toggleTheme}
                        size={30}
                    />
                    <DarkModeSwitch
                        style={{padding: "10px"}}
                        moonColor={"white"}
                        sunColor={"#faba44"}
                        checked={isDarkMode}
                        onChange={toggleTheme}
                        size={30}
                    />
                </SettingsContainer>

            </SidebarContainer>

            {isOpen && (
                <Overlay onClick={toggleSidebar} />
            )}
        </>
    );
};

export default Sidebar;
