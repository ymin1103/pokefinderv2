import React from 'react';
import Language from '../../config/languageConfig';
import ui from '../ui';

const MakeAbilityData = (data) =>{
    const AbilityData = data.map((e)=>{
        return(
            <div className="d-flex flex-column flex-md-row justify-content-between border-bottom">
                <p className={e.is_hidden===true ? "font-weight-bold" : ""}>
                    {e.names[11-Language.korean].name}
                </p>
                <p className={e.is_hidden === true ? "font-weight-bold" : ""}>
                    {e.flavor_text_entries[8].flavor_text}
                </p>
            </div>
        )
    })
    return AbilityData;
}

const AbilityInfo = (props) => {
    const AInfo = MakeAbilityData(props.data);
    return(
        <div>
            <h3 className="mb-0">Abilities</h3>
            <ui.subBox>
                {AInfo}
            </ui.subBox>
        </div>
    )
}

export default AbilityInfo;