import React from 'react';

class SearchBar extends React.Component {
    
    render(){
        return(
            <form className="container-fluid d-flex justify-content-center pb-5 bg-dark">
                <input type="text" className="s-bar" placeholder="Search with No. or Name"
                    onChange={this.props.ChangeEvent}/>
                <input type="submit" className="s-button" value="검색" onClick={this.props.ClickEvent}/>
            </form>
        )
    }
}

export default SearchBar;