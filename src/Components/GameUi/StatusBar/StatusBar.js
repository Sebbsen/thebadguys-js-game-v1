import React, { useState, useEffect } from 'react';
import GameState from '../../../state/GameManager';

export const StatusBar = () => {

    // State to hold the wood, planks, iron, gold and ironIngots values
    const [wood, setWood] = useState(GameState.getResouce('wood'));
    const [planks, setPlanks] = useState(GameState.getResouce('planks'));
    const [iron, setIron] = useState(GameState.getResouce('iron'));
    const [gold, setGold] = useState(GameState.getResouce('gold'));
    const [ironIngots, setIronIngots] = useState(GameState.getResouce('ironIngots'));

    const collectWood = () => {
        GameState.changeResource('wood', 10);
    };

    const collectPlanks = () => {
        GameState.changeResource('planks', 10);
    };

    const collectIron = () => {
        GameState.changeResource('iron', 10);
    };

    const collectGold = () => {
        GameState.changeResource('gold', 10);
    };

    const collectIronIngots = () => {
        GameState.changeResource('ironIngots', 10);
    };

    useEffect(() => {
        // What to do when the observer is triggered
        const woodObserver = {
            update: () => {
                setWood(GameState.getResouce('wood'));
            }
        };

        const planksObserver = {
            update: () => {
                setPlanks(GameState.getResouce('planks'));
            }
        };

        const ironObserver = {
            update: () => {
                setIron(GameState.getResouce('iron'));
            }
        };

        const goldObserver = {
            update: () => {
                setGold(GameState.getResouce('gold'));
            }
        };

        const ironIngotsObserver = {
            update: () => {
                setIronIngots(GameState.getResouce('ironIngots'));
            }
        };

        // add observers to GameState
        GameState.addObserver('woodChanged', woodObserver);
        GameState.addObserver('planksChanged', planksObserver);
        GameState.addObserver('ironChanged', ironObserver);
        GameState.addObserver('goldChanged', goldObserver);
        GameState.addObserver('ironIngotsChanged', ironIngotsObserver);

        // removeObserver if component is unmounted
        return () => {
            GameState.removeObserver('woodChanged', woodObserver);
            GameState.removeObserver('planksChanged', planksObserver);
            GameState.removeObserver('ironChanged', ironObserver);
            GameState.removeObserver('goldChanged', goldObserver);
            GameState.removeObserver('ironIngotsChanged', ironIngotsObserver);
        };
    }, []);

    return (
        <div style={{
            position: 'absolute',
            top: '0',
            left: '50%',
            pointerEvents: 'all',
            display: 'flex',
        }}>
            <div>
                <p>Wood: {wood}</p>
                <button onClick={collectWood}>Collect Wood</button>
            </div>
            <div>
                <p>Planks: {planks}</p>
                <button onClick={collectPlanks}>Collect Planks</button>
            </div>
            <div>
                <p>Iron: {iron}</p>
                <button onClick={collectIron}>Collect Iron</button>
            </div>
            <div>
                <p>Gold: {gold}</p>
                <button onClick={collectGold}>Collect Gold</button>
            </div>
            <div>
                <p>Iron Ingots: {ironIngots}</p>
                <button onClick={collectIronIngots}>Collect Iron Ingots</button>
            </div>
        </div>
    );
};