import styled from 'styled-components';

export const AddCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
    height: 100%;
    width: 100%;

    @media (max-width: 768px) {
        margin-left: 50px;
    }
`;

export const UpperGeneralOptionsContainer= styled.div`
    display: flex;
    padding: 10px;
    height: fit-content;
    justify-content: space-between;
    width: calc(100% - 50px);
`
export const LeftOptionsContainer = styled.div`
    display: flex;
    padding: 0;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    
`

export const RightOptionsContainer = styled.div`
    display: flex;
    padding: 0;
    height: fit-content;
    justify-content: flex-end;
    gap: 10px;
`

export const ToggleModeButton = styled.button`
    background: none;
    border: none;
    margin: 0;
    cursor: pointer;
    width: 40px;
    height: 40px;
    align-items: center;
    justify-content: center;
`
