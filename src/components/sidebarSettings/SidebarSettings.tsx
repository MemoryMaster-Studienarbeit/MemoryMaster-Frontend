import {DarkModeSwitch} from 'react-toggle-dark-mode';
import {InnerSettingsContainer, SettingsContainer} from "./SidebarSettings.styles";
import React, {FC} from "react";
import {useNavbar, useTheme} from "../../ThemeContext";


const SidebarSettings: FC = () => {
    const { isSidebarOpen } = useNavbar();
    const {isDarkMode, toggleTheme} = useTheme();

    return (
        <SettingsContainer $isSidebarOpen={isSidebarOpen}>
            <InnerSettingsContainer>
                <DarkModeSwitch
                    style={{padding: "10px", width: "50%"}}
                    moonColor={"white"}
                    sunColor={"#eaac02"}
                    checked={isDarkMode}
                    onChange={toggleTheme}
                    size={50}
                />
            </InnerSettingsContainer>
        </SettingsContainer>
    )
}

export default SidebarSettings;