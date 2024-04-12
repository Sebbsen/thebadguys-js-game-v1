import React, { useState, useEffect } from 'react';
import GameState from '../../../state/GameManager';

export const StatusBar = () => {

    // State to hold the wood and planks values
    const [wood, setWood] = useState(GameState.getResouce('wood'));
    const [planks, setPlanks] = useState(GameState.getResouce('planks'));
    const [iron, setIron] = useState(GameState.getResouce('iron'));

    const collectWood = () => {
        GameState.changeResource('wood', 10);
    };

    const collectPlanks = () => {
        GameState.changeResource('planks', 10);
    };

    const collectIron = () => {
        GameState.changeResource('iron', 10);
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

        // add observers to GameState
        GameState.addObserver('woodChanged', woodObserver);
        GameState.addObserver('planksChanged', planksObserver);
        GameState.addObserver('ironChanged', ironObserver);

        // removeObserver if component is unmounted
        return () => {
            GameState.removeObserver('woodChanged', woodObserver);
            GameState.removeObserver('planksChanged', planksObserver);
            GameState.removeObserver('ironChanged', ironObserver);
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
        </div>
    );
};