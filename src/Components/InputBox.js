import { Component } from "react";


import $ from 'jquery';
import Cookies from 'js-cookie'
import ActivityEntry from "./ActivityEntry";

export default class InputBox extends Component{
    constructor(props){
        super(props);
        this.state = { index: -1,currentActivity: "No entry",currentId : -1,currentStatus : "false", componentId: new Array(),componentValue: new Array(),componentStatus: new Array()};
        this.addFunction = this.addFunction.bind(this); 
        this.clickHandler = this.clickHandler.bind(this); 
      }
  

    addFunction(event){
        if (event.key === "Enter") {
            var activity = document.getElementById("inputBox").value;
            var id = -1;
            var wait = true;
             var arrId = this.state.componentId;
             var arrVal = this.state.componentValue;
             var arrStatus = this.state.componentStatus;
                addActivityForUser(activity).then(
                    function(response)
                    {
                        id = response;
                        console.log(response);
                        if(id == "-1")
                        {
                            alert("Error saving value. Please press enter again");
                        }
                        else
                        {
                            arrId.push(id);
                            arrVal.push(activity);
                            arrStatus.push("false");
                            document.getElementById("inputBox").value = "";  
                        }
                        
                    }                 
                )

               var index = arrId.length;
                this.setState({index : index, currentActivity : activity, currentId : this.state.componentId[index], currentStatus : this.state.componentStatus[index]});
                
            }
            else if(event.key == "ArrowLeft")
            {
                var index = this.state.index;
                index--;
                if(index < 0)
                {
                    index = this.state.componentId.length-1;
                }
                if(index > -1)
                {
                    this.setState({index : index, currentActivity : this.state.componentValue[index], currentId : this.state.componentId[index], currentStatus : this.state.componentStatus[index]});
                }
                // console.log(this.state.componentStatus[index]);
                // console.log(this.state.currentStatus);

                
            }
            else if(event.key == "ArrowRight")
            {
                var index = this.state.index;
                index++;
                if(this.state.componentId.length == 0)
                {
                    index= -1;
                }
                else if(index >= this.state.componentId.length)
                {
                    index = 0;
                }
                if(index > -1)
                {
                    this.setState({index : index, currentActivity : this.state.componentValue[index], currentId : this.state.componentId[index], currentStatus : this.state.componentStatus[index]});
                }
                // console.log(this.state.index);
                // console.log(this.state.componentId.length);
                //console.log(this.state.componentValue.length);
                //  console.log(this.state.componentStatus[index]);
                //  console.log(this.state.currentStatus);
            }
            else if(event.key == "Escape")
            {
                if(window.confirm("Are you sure you want to logout ? "))
                {
                    Cookies.set('reflections',null);
                    window.location.href = "/Login";
                }
            }
                     
      }
     

      
    
   
    componentDidMount(){
        document.addEventListener("keydown", this.addFunction, false);
        getActivityList().then(
            (result) =>
            {
                var values = JSON.parse(result);
                var arrId = this.state.componentId;
                var arrVal = this.state.componentValue;
                var arrStatus = this.state.componentStatus;
                for(var i = 0 ; i < values.length ; i++)
                {
                        arrId.push(values[i].id);
                        arrVal.push(values[i].activity.trim());
                        arrStatus.push(values[i].completed);
                        console.log(arrId[i] + "  " + arrVal[i] + "  " + arrStatus[i]);
                }
                if(values.length > 0)
                {
                    var index = 0;
                    this.setState({index : index, currentActivity : this.state.componentValue[index], currentId : this.state.componentId[index], currentStatus : this.state.componentStatus[index]});

                }
                //console.log(result);

            }
        )
      }

      componentWillUnmount(){
        document.removeEventListener("keydown", this.addFunction, false);
      }

      clickHandler() {
        
        if(document.getElementById("markBox").checked)
        {
            markCompleted(this.state.componentId[this.state.index]);
            this.state.componentStatus[this.state.index] = true;
        }
        else
        {
            unMarkCompleted(this.state.componentId[this.state.index]);
            this.state.componentStatus[this.state.index] = false;
        }
      }

    

      render()
      {


          const inputStyle = {
            marginTop : "400px",
            padding: "15px",
            fontSize: "20px",
            width: "680px",
            height: "60",
            fontFamily: "monospace",
            backgroundColor: "white",
            boxShadow: "1px 3px 10px #87cdff",
          }

        const divStyle = {
            borderBotton : "40px",
        }
         const fontStyle = {
            fontFamily: "monospace",
            fontSize:"30px",
            maxWidth:"900px",
            overflowWrap: 'break-word',
         }
         const greenFontStyle = {
            fontFamily: "monospace",
            fontSize:"30px",
            color : "green",
            maxWidth:"900px",
            overflowWrap: 'break-word',
         }

         const buttonStyle = {
             height : "20px",
             width : "20px",
         }
        //   for(var i = 0 ; i < this.state.componentId.length; i++)
        //   {
        //       console.log("print here " + this.state.componentStatus[i]);
        //   }
        //   console.log(this.state.componentId.length + "  "  + "in render function")

        if(document.getElementById("markBox") != null)
        {
            document.getElementById("markBox").checked = false;
        }
        if(this.state.index == -1)
        {
            return (
                <div>
                    <Legend />
                <div>
                  <input style={inputStyle} id="inputBox" type="text"/>
                  </div>
                  <br />
                    <br />
                    <br />
                    <br />
                    <div>
                        <p style = {fontStyle}> Go on start adding activities</p>
                     </div>
                     </div>
                  
                  );
        }
        else{
      
            if(this.state.currentStatus == true)
            {
                
                return ( <div>
                    <div style={divStyle}>
                         <input style={inputStyle} id="inputBox" type="text"/>
                    </div> 
                    <br />
                    <br />
                    <br />
                    <br />
                    <div>
                        <p style = {greenFontStyle}>{this.state.currentActivity} </p>
                     </div>
                  </div>);
            }
            else{
            return (
                <div>
                    <div style={divStyle}>
                         <input style={inputStyle} id="inputBox" type="text"/>
                    </div> 
                    <br />
                    <br />
                    <br />
                    <br />
                    <div>
                        <p style = {fontStyle}><input type="checkbox" style = {buttonStyle} id="markBox" onClick={this.clickHandler}/> {this.state.currentActivity} </p>
                     </div>
                  </div>
                  );
            }
        }
        
          
      }
}

function Legend()
{
    return(<div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '5vh'}}><h4 style={{color : '#629af5'}}>Legend  :  Escape - Logout | Enter - Add Activity | Left Right ArrowKeys - Toggle activites </h4></div>);
}


export function UpdateComponents(){
        //Reload components under activities
        return new Promise(function(resolve,reject){
        var d = new Date();
        var date = d.getDate();
        var month = d.getMonth();
        var year = d.getFullYear();
    
        var completeDate = date + "/" + month + "/" + year;
    
        //var cookieId = Cookies.getCookie('reflections');
    
        var cookieId = Cookies.get('reflections');
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

export function addActivityForUser(activity)
{
    var d = new Date();
    var date = d.getDate();
    var month = d.getMonth();
    var year = d.getFullYear();

    var completeDate = date + "/" + month + "/" + year;

    //var cookieId = Cookies.getCookie('reflections');

    var cookieId = Cookies.get('reflections');
    return new Promise(function(resolve,reject){
        $.ajax({
            url : 'http://localhost:8080/Activity/Add',
            type : 'POST',
            async: false,
            data : {
                'activity' : activity,
                'cookieId' : cookieId,
                'date' : completeDate,
            },
            success: function(response) 
            {
                resolve(response);
            },
        error: function(e)
        {
            reject(e);
        }
        });
    });
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
    
        var cookieId =Cookies.get('reflections');
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

export function markCompleted(id){
    //Reload components under activities
    return new Promise(function(resolve,reject){


    //var cookieId = Cookies.getCookie('reflections');

    var cookieId = Cookies.get('reflections');
    $.ajax({
        url : 'http://localhost:8080/Activity/MarkCompleted',
        type : 'PUT',
        async: false,
        data : {
            'cookieId' : cookieId,
            'activityId' : id,
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

export function unMarkCompleted(id){
    //Reload components under activities
    return new Promise(function(resolve,reject){


    //var cookieId = Cookies.getCookie('reflections');

    var cookieId = Cookies.get('reflections');
    $.ajax({
        url : 'http://localhost:8080/Activity/UnMarkCompleted',
        type : 'PUT',
        async: false,
        data : {
            'cookieId' : cookieId,
            'activityId' : id,
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