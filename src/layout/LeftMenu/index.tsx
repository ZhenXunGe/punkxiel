import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  home,
  world,
  vote,
  market,
  selectPanel,
} from '../../layout/layoutSlice';

import {Hover} from "../Hover";
import {HandlerProxy} from "../handlerProxy"
import './style.scss';
import HOME_ACT from '../../images/buttons/home_act.png';
import WORLD_ACT from '../../images/buttons/world_act.png';
import RANK_ACT from '../../images/buttons/rank_act.png';
import MARKET_ACT from '../../images/buttons/market_act.png';

import HOME_UNACT from '../../images/buttons/home_unact.png';
import WORLD_UNACT from '../../images/buttons/world_unact.png';
import RANK_UNACT from '../../images/buttons/rank_unact.png';
import MARKET_UNACT from '../../images/buttons/market_unact.png';


interface LeftMenuProp {
  handlerProxy: HandlerProxy;
}

export function LeftMenu(prop: LeftMenuProp) {
  const [currentpanel, setCurrentPanel] = useState('home');
  const dispatch = useAppDispatch();
  const homeButtonRef = React.createRef<HTMLDivElement>();
  const worldButtonRef = React.createRef<HTMLDivElement>();
  const rankButtonRef = React.createRef<HTMLDivElement>();
  const marketButtonRef = React.createRef<HTMLDivElement>();
  React.useEffect(()=>{
    if (homeButtonRef.current) {
      prop.handlerProxy.registerClick("home", homeButtonRef.current!, ()=>{setCurrentPanel('home'); dispatch(home())});
    }
    if (worldButtonRef.current) {
      prop.handlerProxy.registerClick("world", worldButtonRef.current!, ()=>{setCurrentPanel('world'); dispatch(world())});
    }
    if (rankButtonRef.current) {
      prop.handlerProxy.registerClick("rank", rankButtonRef.current!, ()=>{setCurrentPanel('rank'); dispatch(vote())});
    }
    if (marketButtonRef.current) {
      prop.handlerProxy.registerClick("market", marketButtonRef.current!, ()=>{setCurrentPanel('market'); dispatch(market())});
    }
  },[homeButtonRef, worldButtonRef, rankButtonRef, marketButtonRef])
  return (
    <div className="left-menu">
      <div className="padding-top"></div>
      <div className='avatorTop'>
        <div className='avatorContext'></div>
      </div>
      <div className="panelSelect">
        <div className={`bicon ${'home' === currentpanel ? "active" : "unact"
          }`} ref={homeButtonRef}>
          <img src={HOME_ACT}></img>
        </div>
        <div className={`bicon right ${'world' === currentpanel ? "active" : "unact"
          }`} ref={worldButtonRef}>
          <img src={WORLD_ACT}></img>
        </div>
        <div className={`bicon bottom ${'rank' === currentpanel ? "active" : "unact"
          }`} ref={rankButtonRef}>
          <img src={RANK_ACT}></img>
        </div>
        <div className={`bicon right bottom ${'market' === currentpanel ? "active" : "unact"
          }`} ref={marketButtonRef}>
          <img src={MARKET_ACT}></img>
        </div>
      </div>
    </div>
  );
}
