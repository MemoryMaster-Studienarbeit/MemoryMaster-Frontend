import {DarkModeSwitch} from 'react-toggle-dark-mode';
import {InnerSettingsContainer, SettingsContainer} from "./SidebarSettings.styles";
import React, {FC} from "react";

interface SidebarSettingsProps {
    isOpen: boolean;
    isDarkMode: boolean;
    toggleTheme: () => void;
}

const SidebarSettings: FC<SidebarSettingsProps> = ({isOpen, isDarkMode, toggleTheme}) => {
    return (
        <SettingsContainer isOpen={isOpen}>
            <InnerSettingsContainer>
                <DarkModeSwitch
                    style={{padding: "10px", width: "40%"}}
                    moonColor={"white"}
                    sunColor={"#faba44"}
                    checked={isDarkMode}
                    onChange={toggleTheme}
                    size={50}
                />
            </InnerSettingsContainer>
        </SettingsContainer>
    )
}

export default SidebarSettings;