import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import '../Component.css';
import Contribute from "../../modals/contribute";
import 'bootstrap/dist/css/bootstrap.min.css';
import { individualWidth } from '../../data/draw';
import getWorld from '../../data/world';
import { selectViewIndex } from '../../dynamic/dynamicSlice';
import minion from "../../sprite/ufo/ufo.png";

export function MinionAvator() {
    return (<div className="minion-avator"><img src={minion} className="minion-avator"></img></div>)
}


export function ToolBarWeapon() {
  const viewIndex = useAppSelector(selectViewIndex);
  const minions = getWorld().getInstance(viewIndex*individualWidth).info.minions;
  var damage = 0;
  for (var m of minions) {
    damage += getWorld().getMinion(m).power;
  }
  return (
    <div className="tool-bar">
        <ul>
            <li>
                <ul className="inline-brick">
                    {minions.map((m) => {
                        return <li key={getWorld().getMinion(m).id}><MinionAvator></MinionAvator></li>;
                    })}
                    <li> {minions.length} minions are protecting this block. </li>
                    <li> Total Damage: {damage} </li>
                    <li> Speed reduction: %10</li>
                    <Contribute></Contribute>
                </ul>
            </li>
        </ul>
    </div>
  );
}
