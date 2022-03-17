import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import '../Component.scss';
import Contribute from "../../modals/contribute";
import 'bootstrap/dist/css/bootstrap.min.css';
import { individualWidth } from '../../data/draw';
import getWorld from '../../data/world';
import { selectViewIndex } from '../../dynamic/dynamicSlice';
import minion from "../../sprite/ufo/ufo0.png";
import './style.scss';
export function MinionAvator() {
  return (<div className="minion-avator"><img src={minion} className="minion-avator"></img></div>)
}


export function ToolBarWeapon() {
  const viewIndex = useAppSelector(selectViewIndex);
  const minions = getWorld().getInstance(viewIndex * individualWidth).info.minions;
  var damage = 0;
  for (var m of minions) {
    damage += getWorld().getMinion(m).power;
  }
  return (
    <div className="tool-bar">
      <ul>
        <li>
          <ul className="inline-brick world">
            <div className='minionList'>
              {minions.map((m) => {
                return <li className='minionItem' key={getWorld().getMinion(m).id}><MinionAvator></MinionAvator></li>;
              })}
            </div>
            <div className='minionDamage'>
              <li> {minions.length} minions are protecting this block. </li>
              <div>
                <li> Total Damage: {damage} </li>
                <li> Speed reduction: 10%</li>
              </div>

            </div>
          </ul>
          
          <Contribute></Contribute>
          
        </li>
        
      </ul>
      
    </div>
  );
}
