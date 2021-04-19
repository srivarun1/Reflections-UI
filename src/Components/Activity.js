import { Component } from "react";
import Cookies from 'js-cookie'
import $ from 'jquery';
import React, { useState, useEffect } from 'react';
// Temporary Cookie Id
export default class Activity extends Component{
    constructor(props)
    {
        super(props);
    }

    
    render()
    {
        return(<div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '40vh'}}><InputBox /></div>);
    }
}

var i = 0;
export function InputBox()
{
    const boxStyle = {
        width: "680px",
       height: "60",
       padding: "15px",
       fontSize: "20px",
       fontFamily: "monospace",
       backgroundColor: "white",
       boxShadow: "1px 3px 10px #87cdff",
      };

      const [activities,setActivity] = useState(null);
      useEffect(() => {
        window.addEventListener('keydown', (event) => {
            if (event.key === "Enter") {
            alert("called")
            console.log(document.getElementById("inputBox").value);
            addActivityAndUpdateComponents(document.getElementById("inputBox").value);
            document.getElementById("inputBox").value = "";
            /*
                Send to server. Get back id of activity. push it to Entries
            */
                return () => { console.log("componentWillUnmount effect"); }
            }
          });
      });

      function addActivityAndUpdateComponents(activity){
        alert("update called ----- ||||| -----");
        
        addActivityForUser(activity).then(
            function(response)
            {
                
                    //Reload components under activities
                    var d = new Date();
                    var date = d.getDate();
                    var month = d.getMonth();
                    var year = d.getFullYear();
                
                    var completeDate = date + "/" + month + "/" + year;
                
                    //var cookieId = Cookies.getCookie('reflections');
                
                    var cookieId = 'f99a3fb9-b08b-43f0-a330-a3c81ed31e8a';
                    $.ajax({
                        url : 'http://localhost:8080/Activity/Get',
                        type : 'POST',
                        async: false,
                        data : {
                            'activity' : activity,
                            'cookieId' : cookieId,
                            'date' : completeDate,
                        },
                        success: function(response) 
                        {
                            setActivity(JSON.stringify(response));
                        },
                    error: function(e)
                    {
                        console.log(e);
                    }
                    });
                
         
    });
    
    }
    return (<div>
        <input style={boxStyle}
           id="inputBox" type="text"
         />
         {activities}
         </div>
         
     );
}



function addActivityForUser(activity)
{
    alert(activity + "  ----- |||||| -----")
    var d = new Date();
    var date = d.getDate();
    var month = d.getMonth();
    var year = d.getFullYear();

    var completeDate = date + "/" + month + "/" + year;

    //var cookieId = Cookies.getCookie('reflections');

    var cookieId = 'f99a3fb9-b08b-43f0-a330-a3c81ed31e8a';
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