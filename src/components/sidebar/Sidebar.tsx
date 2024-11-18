import { useTheme } from '../../ThemeContext';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { SidebarContainer, ToggleButton, BurgerIcon, Overlay, SettingsContainer } from './Sidebar.styles';
import SearchSidebar from "../searchFieldSidebar/SearchFieldSidebar";
import {SearchSidebarContainer} from "../searchFieldSidebar/SearchFieldSidebar.styles";

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
    const { isDarkMode, toggleTheme } = useTheme();

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
                    <DarkModeSwitch
                        style={{marginTop: "auto"}}
                        moonColor={"white"}
                        sunColor={"#faba44"}
                        checked={isDarkMode}
                        onChange={toggleTheme}
                        size={30}
                    />
                    <DarkModeSwitch
                        style={{marginTop: "auto"}}
                        moonColor={"white"}
                        sunColor={"#faba44"}
                        checked={isDarkMode}
                        onChange={toggleTheme}
                        size={30}
                    />
                    <DarkModeSwitch
                        style={{marginTop: "auto"}}
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
