import React, {ChangeEvent} from 'react';
import {SearchInput} from "./SearchFieldSidebar.styles";

const SearchFieldSidebar: React.FC<{
    onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void
}> = ({onSearchChange}) => {

    return (
        <SearchInput type="search" placeholder="Search decks..." onChange={onSearchChange}></SearchInput>
    );
}

export default SearchFieldSidebar;
