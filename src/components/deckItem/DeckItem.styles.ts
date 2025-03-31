import styled from "styled-components";
// @ts-ignore
import xDark from '../../images/x-icon-dark.svg';
// @ts-ignore
import xLight from '../../images/x-icon-light.svg';
// @ts-ignore
import xRed from '../../images/x-icon-red.svg';

export const ListItem = styled.li`
    display: flex;
    justify-content: space-between;
    padding: 0;
    margin-bottom: 0.5em;
    width: 100%;
    border-radius: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const DeleteButton = styled.button`
    width: 20px;
    height: 10px;
    padding: 10px;
    background: url(${({ theme }) => theme.isLight ? xDark : xLight}) no-repeat center center;
    border: none;
    cursor: pointer;

    &:hover {
        background-image: url("${xRed}");
        transform: scale(1.5);
        transition: transform 0.2s ease-in-out;
    }
`;

export const ListItemContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin: 0;
`;

export const DeckName = styled.p<{ $isSelected: boolean }>`
    display: flex;
    cursor: pointer;
    color: ${(props) =>
            props.$isSelected ? props.theme.alternativeSecondaryColor : props.theme.text};
    transform: ${(props) => (props.$isSelected ? 'translateX(5px) scale(1.1)' : 'none')};
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    
    &:hover {
        text-decoration: underline;
        transform: translateX(5px) scale(1.1);
        color: cadetblue;
        transition: transform 0.2s ease-in-out;
    }
`;