import React, { useState, useEffect } from 'react';
import GameState from '../../../state/GameManager';

export const StatusBar = () => {

    // State to hold the wood, planks, iron, gold, ironIngots, goldIngots and compasses values
    const [wood, setWood] = useState(GameState.getResouce('wood'));
    const [planks, setPlanks] = useState(GameState.getResouce('planks'));
    const [iron, setIron] = useState(GameState.getResouce('iron'));
    const [gold, setGold] = useState(GameState.getResouce('gold'));
    const [ironIngots, setIronIngots] = useState(GameState.getResouce('ironIngots'));
    const [goldIngots, setGoldIngots] = useState(GameState.getResouce('goldIngots'));
    const [compasses, setCompasses] = useState(GameState.getResouce('compasses'));

    const collectWood = () => {
        GameState.changeResource('wood', 50);
    };

    const collectPlanks = () => {
        GameState.changeResource('planks', 50);
    };

    const collectIron = () => {
        GameState.changeResource('iron', 50);
    };

    const collectGold = () => {
        GameState.changeResource('gold', 50);
    };

    const collectIronIngots = () => {
        GameState.changeResource('ironIngots', 50);
    };

    const collectGoldIngots = () => {
        GameState.changeResource('goldIngots', 50);
    };

    const collectCompasses = () => {
        GameState.changeResource('compasses', 50);
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

        const goldIngotsObserver = {
            update: () => {
                setGoldIngots(GameState.getResouce('goldIngots'));
            }
        };

        const compassesObserver = {
            update: () => {
                setCompasses(GameState.getResouce('compasses'));
            }
        };

        // add observers to GameState
        GameState.addObserver('woodChanged', woodObserver);
        GameState.addObserver('planksChanged', planksObserver);
        GameState.addObserver('ironChanged', ironObserver);
        GameState.addObserver('goldChanged', goldObserver);
        GameState.addObserver('ironIngotsChanged', ironIngotsObserver);
        GameState.addObserver('goldIngotsChanged', goldIngotsObserver);
        GameState.addObserver('compassesChanged', compassesObserver);

        // removeObserver if component is unmounted
        return () => {
            GameState.removeObserver('woodChanged', woodObserver);
            GameState.removeObserver('planksChanged', planksObserver);
            GameState.removeObserver('ironChanged', ironObserver);
            GameState.removeObserver('goldChanged', goldObserver);
            GameState.removeObserver('ironIngotsChanged', ironIngotsObserver);
            GameState.removeObserver('goldIngotsChanged', goldIngotsObserver);
            GameState.removeObserver('compassesChanged', compassesObserver);
        };
    }, []);

    return (
        <div style={{
            position: 'absolute',
            top: '0',
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
            <div>
                <p>Gold Ingots: {goldIngots}</p>
                <button onClick={collectGoldIngots}>Collect Gold Ingots</button>
            </div>
            <div>
                <p>Compasses: {compasses}</p>
                <button onClick={collectCompasses}>Collect Compasses</button>
            </div>
        </div>
    );
};