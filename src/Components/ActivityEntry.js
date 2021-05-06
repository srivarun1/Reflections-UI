import { Component } from "react";
import $ from 'jquery';
export default class ActivityEntry extends Component{
    constructor(props)
    {
        super(props);
        this.state = { number: 0 };
        this.state = { components: new Array()};
    }

    componentDidMount(){
        getActivityList().then(
            (result) =>
            {
                //[{"id":205,"username":"test","date":"1/4/2021","activity":"asdsa","completed":false},{"id":206,"username":"test","date":"1/4/2021","activity":"dsad","completed":false}]
                var values = JSON.parse(result);
                var arr = new Array();
                for(var i = 0 ; i < values.length ; i++)
                {
                    arr.push(<ActivityValueBox text={values[i].activity} id={values[i].id} status={values[i].completed}/>);
                   
                }
                let components = this.state.components.slice();
                //update it

                components = arr;
                this.setState({ components });
                console.log(this.state.components.length)
                this.setState(prevState => ({ number: prevState.number + 1 }));

            }
        )
    }
    shouldComponentUpdate(newProps)
    {

        return true;
    }
    render()
    {
        console.log("rendering...")

        return (<div>
            {this.state.components}
        </div>);
    }
    
}

export function ActivityValueBox(props)
{
    
    return (<div><p>{props.text}</p></div>)
}

 export function getActivityList(){
    //Reload components under activities
    return new Promise(function(resolve,reject){
    var d = new Date();
    var date = d.getDate();
    var month = d.getMonth();
    var year = d.getFullYear();

    var completeDate = date + "/" + month + "/" + year;

    //var cookieId = Cookies.getCookie('reflections');

    var cookieId = '4b890768-93da-4343-81db-ca5cc22b2b80';
    $.ajax({
        url : 'http://localhost:8080/Activity/Get',
        type : 'POST',
        async: false,
        data : {
            'cookieId' : cookieId,
            'date' : completeDate,
        },
        success: function(response) 
        {
            resolve(JSON.stringify(response));
        },
    error: function(e)
    {
        console.log(e);
    }
    });
});


}
function text(props)
{
    const fontStyle= {
        fontSize: "20px",
        fontFamily: "monospace"
    };
    return(<p style={fontStyle}>props.value</p>);
}


