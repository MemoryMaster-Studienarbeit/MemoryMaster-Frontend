import styled from 'styled-components';

export const AppContainer = styled.div`
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
    background-color: ${({ theme }) => theme.background};
`;
