import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { rawListeners } from 'process';
import { RootState } from '../app/store';
import { Alien } from '../data/alien';
import { individualWidth } from '../data/draw';
import { availableMinions, getMinionById } from '../data/minion';
import getWorld from '../data/world';
import { BulletInfo } from './bullet';
import { Event }  from './event';




var bullets: Array<BulletInfo> = [];

export function addBullet(d:BulletInfo) {
  bullets.push(d);
};

export function resetBullets(){
  bullets = [];
};

export function allBullets(){
  return bullets;
}

export interface DynamicState {
    timeClock: number;
    contribution: number;
    events: Array<Event>;
    alien: Alien;
    viewIndex: number;
    sketchSignal: number;
    damage: number;
}

const initialState: DynamicState = {
  contribution:0,
  timeClock: 0,
  events:[],
  alien: {name:"GruStoood", alienId: 0, pos:0, status:"run", dizzle:0},
  viewIndex: 0,
  sketchSignal: 0,
  damage:0,
};

function timeout(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const updateTimeClockAsync = createAsyncThunk(
    'dynamic/updateTimeClockAsync',
    async (timerId:number, thunkAPI) => {
      await timeout(1000);
      return 1;
    }
)

export const dynamicSlice = createSlice({
  name: 'dynamic',
  initialState,
  reducers: {
    addEvent: (state, d) => {
      state.events.unshift(d.payload);
    },
    signalSketch: (state) => {
      state.sketchSignal ++;
    },
    signalBulletsUpdate: (state, d) => {
      let cs = [];
      let cor:[number, number] = d.payload;
      for (var i=0;i<bullets.length;i++) {
        let b = bullets[i];
        let [done, hit] = b.approach(cor[0], cor[1]);
        if (hit) {
          if (b.source === 1) {
            state.contribution += 1;
          }
          state.damage += b.power;
          if (state.damage > 200) {
            state.alien.status = "dizzle";
            state.alien.dizzle = 20;
            state.damage = 0;
          }
          console.log(`alien has taken ${state.damage} damage`);
        }
        if (!done) {
          cs.push(b);
        }
      }
      bullets = cs;
    },
    signalAlien: (state) => {
      let status = state.alien.status;
      if (status == "run") {
        state.alien.pos += 1;
        if (state.alien.pos >= individualWidth * getWorld().instances.length) {
          state.alien.pos = 0;
        }
      }
      if (status == "dizzle") {
        //let instance = getWorld().getInstanceById(state.viewIndex);
        //instance.info.drops.push(state.alien.pos % individualWidth);
        state.alien.dizzle -= 1;
        if (state.alien.dizzle == 0) {
          state.alien.status = "run";
        }
      }
    },
    switchView: (state, d) => {
      state.viewIndex = d.payload;
    },
    signalPlaceMinion: (state, d) => {
      let viewIndex = d.payload.viewIndex;
      let instance = getWorld().getInstance(viewIndex*individualWidth);
      //let m = randomMinion();
      let m = {
        ...
        d.payload.minion
      }
      instance.info.minions.push(m);
      //console.log("minion added");
      d.payload.location = viewIndex;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateTimeClockAsync.fulfilled, (meta: DynamicState, c) => {
        meta.timeClock += 1;
      })
  },
});
export const {signalBulletsUpdate, signalAlien, switchView, addEvent, signalSketch, signalPlaceMinion,} = dynamicSlice.actions;
export const selectTimeClock = (state: RootState) => state.dynamic.timeClock;
export const selectContribution = (state: RootState) => state.dynamic.contribution;
export const selectEvents = (state: RootState) => state.dynamic.events;
export const selectAlien = (state: RootState) => state.dynamic.alien;
export const selectViewIndex = (state: RootState) => state.dynamic.viewIndex;
export const selectSketchSignal = (state: RootState) => state.dynamic.sketchSignal;
export default dynamicSlice.reducer;
