import { Component } from "react";
import Cookies from 'js-cookie'
import $ from 'jquery';
import React, { useState, useEffect } from 'react';
import InputBox from './InputBox';

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

