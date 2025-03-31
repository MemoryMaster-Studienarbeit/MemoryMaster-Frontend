import styled from 'styled-components';
// @ts-ignore
import xDark from '../../images/x-icon-dark.svg';
// @ts-ignore
import xLight from '../../images/x-icon-light.svg';

export const SearchInput = styled.input`
    width: 100%;
    padding: 0.5em;
    margin: 0;
    border: none;
    background-color: ${({ theme }) => theme.primaryInputColor};
    color: ${({ theme }) => theme.text};
    border-radius: 4px;
    font-size: 1em;

    &:focus {
        outline: none;
    }

    &::-webkit-search-cancel-button {
        -webkit-appearance: none;
        height: 20px;
        width: 20px;
        background: url(${({ theme }) => theme.isLight ? xDark : xLight}) no-repeat center center;
        
        &:hover {
            cursor: pointer;
        }
`;

