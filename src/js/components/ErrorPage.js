import React from 'react';
import UI from './ui';

const ErrorPage = () => {
    return(
        <UI.Box>
            <div className="d-flex flex-column align-items-center">
                <i class="fas fa-frown fa-4x"></i>
                <p className="h2 font-weight-light text-center pt-3 pb-3">Oops! No result.</p>
            </div>
        </UI.Box>
    )
}

export default ErrorPage;