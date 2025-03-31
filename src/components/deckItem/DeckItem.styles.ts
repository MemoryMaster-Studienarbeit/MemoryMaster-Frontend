import styled from "styled-components";
// @ts-ignore
import xDark from '../../images/x-icon-dark.svg';
// @ts-ignore
import xLight from '../../images/x-icon-light.svg';
// @ts-ignore
import xRed from '../../images/x-icon-red.svg';

export const ListItem = styled.li`
    display: flex;
    padding: 0;
    margin-bottom: 0.5em;
    width: 100%;
    border-radius: 5px;
`;

export const DeleteButton = styled.button`
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background: url(${({ theme }) => theme.isLight ? xDark : xLight}) no-repeat center center;
    align-items: center;
    justify-content: center;
    width: 15px;

    &:hover {
        background-image: url("${xRed}");
        transform: scale(1.5);
        transition: transform 0.2s ease-in-out;
    }
`;

export const ListItemContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin: 0;
`;

export const DeckName = styled.div<{ $isSelected: boolean }>`
    display: flex;
    cursor: pointer;
    position: relative;
    color: ${(props) =>
            props.$isSelected ? props.theme.alternativeSecondaryColor : props.theme.text};
    transform: ${(props) => (props.$isSelected && window.innerWidth > 768 ? 'translateX(10px) scale(1.1)' : 'none')};
    margin: 0;
    width: 70%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    
    &:hover {
        text-decoration: underline;
        transform: translateX(10px) scale(1.1);
        color: cadetblue;
        transition: transform 0.2s ease-in-out;
    }
`;