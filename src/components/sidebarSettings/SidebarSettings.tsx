import {DarkModeSwitch} from 'react-toggle-dark-mode';
import {InnerSettingsContainer, SettingsContainer, ToggleButton} from "./SidebarSettings.styles";
import React, {FC} from "react";
import {useNavbar, useTheme} from "../../ThemeContext";

// @ts-ignore
import helpLight from '../../images/question-circle-light.svg';
// @ts-ignore
import helpDark from '../../images/question-circle-dark.svg';

interface SidebarSettingsProps {
    onHelpClick: () => void;
}

const SidebarSettings: FC<SidebarSettingsProps> = ({onHelpClick}) => {
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
            <InnerSettingsContainer>
                <ToggleButton onClick={onHelpClick}>
                    {isDarkMode ? <img src={helpLight} alt="Help" />
                        : <img src={helpDark} alt="Help"  />
                    }
                </ToggleButton>

            </InnerSettingsContainer>
        </SettingsContainer>
    )
}

export default SidebarSettings;