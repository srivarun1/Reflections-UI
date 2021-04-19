import { Component } from "react";

export default class ActivityEntry extends Component{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (<div><text value={this.props.text} /><checkBox key={this.props.id} /></div>);
    }
    
}


function text(props)
{
    const fontStyle= {
        fontSize: "20px",
        fontFamily: "monospace"
    };
    return(<p style={fontStyle}>props.value</p>);
}


