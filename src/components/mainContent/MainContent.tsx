import React from 'react';
import { MainContentContainer } from './MainContent.styles';

interface MainContentProps {
    isSidebarOpen: boolean;
}

const MainContent: React.FC<MainContentProps> = ({ isSidebarOpen }) => {
    return (
        <MainContentContainer isSidebarOpen={isSidebarOpen}>
            <h1>Main Content Area</h1>
        </MainContentContainer>
    );
};

export default MainContent;
