import React from 'react';
import classNames from 'classnames';
import {tempConversion} from '../utils';

export default function SelectedForeCast({
    foreCast: {
      lists = [],
      cityName = ''
    },
    selectedDay = 0,
    unit = 'C',
    onChangeTempUnit,
  }){
    const {
      date = '',
      description = '',
      icon = '',
      temp = ''
    } =lists[selectedDay];
  
    const celsiusClasses = classNames(
      "temp-celsius",
      {
        "unit--active" : unit==='C',
        "unit--not-active" : unit==='F'
      }
    );
  
    const farenheitClasses = classNames(
      "temp-farenheit",
      {
        "unit--active" : unit==='F',
        "unit--not-active" : unit==='C'
      }
    );
  
    return(
      <>
        <div className="selected-forecast">
          <ul>
            <li>{cityName}</li>
            <li>{new Date(date).toDateString()} | {new Date(date).toLocaleTimeString()}</li>
            <li className="climate-decsription">{description}</li>
          </ul>
        </div>
        <div className="icon-group">
          <img src={icon} className="icon"/>
          <span className="temperature-text">{tempConversion(unit, temp)}</span>
          <span onClick={()=>onChangeTempUnit('C')} className={celsiusClasses}>&#8451;</span>
          <span onClick={()=>onChangeTempUnit('F')} className={farenheitClasses}>&#8457;</span>
        </div>
      </> 
    )
  }