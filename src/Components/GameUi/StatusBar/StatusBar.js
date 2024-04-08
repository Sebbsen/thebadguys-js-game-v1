import React, { useState, useEffect } from 'react';
import GameState from '../../../state/GameManager';

export const StatusBar = () => {

    // State to hold the wood value
    const [wood, setWood] = useState(GameState.getWood());

    const collectWood = () => {
        GameState.addWood(10);
        console.log('Wood collected', GameState.getWood());
    };

    useEffect(() => {
        // What to do when the observer is triggered
        const woodObserver = {
            update: () => {
                setWood(GameState.getWood());
            }
        };

        // add observer to GameState
        GameState.addObserver('woodChanged', woodObserver);

        // removeObserver if component is unmounted
        return () => {
            GameState.removeObserver('woodChanged', woodObserver);
        };
    }, []);

    return (
        <div style={{
            position: 'absolute',
            top: '0',
            left: '50%',
            pointerEvents: 'all',
        }}>
            <p>Wood: {wood}</p>
            <button onClick={collectWood}>Collect Wood</button>
        </div>
    );
};