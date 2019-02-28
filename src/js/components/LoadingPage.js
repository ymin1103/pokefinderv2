import React from 'react';
import ui from './ui';

const Loading = () => {
    return (
        <ui.Box>
            <div className="d-flex flex-column align-items-center">
                <i className="fas fa-spinner fa-3x spinner-animation mb-4"></i>    
                <p className="h3 text-center font-weight-light">Loading...</p>
            </div>
        </ui.Box>
    )
}

export default Loading;