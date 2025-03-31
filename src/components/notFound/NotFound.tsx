import React from 'react';
import {Link} from 'react-router-dom';
import {NotFoundContainer} from "./NotFound.styles";

const NotFound: React.FC = () => {
    return (
        <NotFoundContainer>
            <h1>404 - Not Found!</h1>
            <p>
                Sorry, the page you are looking for does not exist.
                <Link to="/">Go Home</Link>
            </p>
        </NotFoundContainer>
    );
};

export default NotFound;