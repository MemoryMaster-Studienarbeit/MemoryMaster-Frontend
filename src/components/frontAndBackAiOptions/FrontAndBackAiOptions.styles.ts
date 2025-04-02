import styled from 'styled-components';
// @ts-ignore
import addIconLight from '../../images/file-earmark-up-arrow-light.svg';
// @ts-ignore
import addIconLightHover from '../../images/file-earmark-up-arrow-light-hover.svg';
// @ts-ignore
import addIconDark from '../../images/file-earmark-up-arrow-dark.svg';
// @ts-ignore
import addIconDarkHover from '../../images/file-earmark-up-arrow-dark-hover.svg';

export const FrontAndBackAiOptionsContainer = styled.div`
    width: calc(100% - 20px);
    height: 100%;
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const LowerOptionsContainer = styled.div`
    display: flex;
    flex: 1;
    width: 80%;
    height: 100%;
    padding: 10px;
    justify-content: space-between;
    flex-direction: row;
    gap: 10px;
    
    @media (max-width: 768px) {
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }
`

export const SelectOptionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-content: center;
    gap: 10px;

    @media (max-width: 768px) {
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }
`

export const InteractButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 80%;
    height: auto;
    justify-content: flex-start;
    align-items: center;
`;

export const FileInputLabel = styled.label`
    display: flex;
    background: url(${({theme}) => (theme.isLight ? addIconLight : addIconDark)}) no-repeat center center;
    background-color: ${({theme}) => theme.backgroundColor};
    color: white;
    width: 150px;
    height: 50px;
    margin: 0;
    padding: 10px;
    border-radius: 5px;
    border: 3px dashed ${({theme}) => theme.dashedBorder};
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.3);
    transition: background-color 0.3s ease, background-image 0.3s ease;
    cursor: pointer;
    
    &:hover {
        background-color: ${({theme}) => theme.primaryInputColor};
        background-image: url(${({theme}) => (theme.isLight ? addIconLightHover : addIconDarkHover)});
    }
`;

export const FileListContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin: 10px;
`;

interface FileListItemProps {
    files: number
}

export const FileListItem = styled.div<FileListItemProps>`
    display: flex;
    width: calc(100% / ${props => props.files});
    color: ${({theme}) => theme.text};
    justify-content: center;
    align-items: center;
`;

export const FileItemDeleteButton = styled.button`
    margin: 5px;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    width: 30px;
    height: 30px;
    border: none;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.3);
    background-color: ${({theme}) => theme.primaryInputColor};
    color: ${({theme}) => theme.text};
`;
