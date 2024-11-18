import styled from 'styled-components';

export const SearchSidebarContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    color: ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.sidebarBackground};
`;

export const SearchInput = styled.input`
    width: 80%;
    padding: 0.5em;
    margin: 1em 0;
    border: 1px solid ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.inputBackground};
    color: ${({ theme }) => theme.text};
    border-radius: 4px;
    font-size: 1em;

    &::placeholder {
        color: ${({ theme }) => theme.placeholder};
    }

    &:focus {
        outline: none;
    }
`;

