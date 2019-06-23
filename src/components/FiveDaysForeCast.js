import React from 'react';
import {tempConversion} from '../utils';

export default function FiveDaysForeCast({
    lists = [],
    unit = 'C',
    onSelectDay,
    selectedDay = 0 // to active selected
  }){
    return(
        <div className="fivedays-forecast">
          {lists.map((li, i) => <div key={i}>
            <ul onClick={()=>onSelectDay(i)} className={selectedDay===i ? "active-day" : ""}>
              <li>{new Date(li.date).toDateString()}</li>
              <li>
                <img src={li.icon} />
              </li>
              <li className="min-temp">{tempConversion(unit, li.temp_min)}</li>
              <li className="max-temp">{tempConversion(unit, li.temp_max)}</li>
            </ul>
          </div>)}
        </div>
    )
  }