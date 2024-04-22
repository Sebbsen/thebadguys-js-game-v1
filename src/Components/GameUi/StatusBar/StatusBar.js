import React, { useState, useEffect } from 'react';
import GameState from '../../../state/GameManager';

import StatusbarImg from '../../../assets/statusbar.png';

export const StatusBar = () => {

    // State to hold the wood, planks, iron, gold, ironIngots, goldIngots and compasses values
    const [wood, setWood] = useState(GameState.getResouce('wood'));
    const [planks, setPlanks] = useState(GameState.getResouce('planks'));
    const [iron, setIron] = useState(GameState.getResouce('iron'));
    const [gold, setGold] = useState(GameState.getResouce('gold'));
    const [ironIngots, setIronIngots] = useState(GameState.getResouce('ironIngots'));
    const [goldIngots, setGoldIngots] = useState(GameState.getResouce('goldIngots'));
    const [compasses, setCompasses] = useState(GameState.getResouce('compasses'));

    /* DEV CHEAT START */
    /* Add unlimited resources when u is pressed 7 times */
    const addUnlimitedResources = () => {
        GameState.changeResource('wood', 9999);
        GameState.changeResource('planks', 9999);
        GameState.changeResource('iron', 9999);
        GameState.changeResource('gold', 9999);
        GameState.changeResource('ironIngots', 9999);
        GameState.changeResource('goldIngots', 9999);
        GameState.changeResource('compasses', 9999);
    };

    const [keyPressCount, setKeyPressCount] = useState(0);
    const [lastKeyPressTime, setLastKeyPressTime] = useState(0);

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'u') {
                const currentTime = new Date().getTime();
                if (currentTime - lastKeyPressTime < 1000) { // 1000 ms = 1 second
                    setKeyPressCount(keyPressCount + 1);
                    if (keyPressCount >= 6) {
                        addUnlimitedResources();
                        setKeyPressCount(0);
                    }
                } else {
                    setKeyPressCount(1);
                }
                setLastKeyPressTime(currentTime);
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [keyPressCount, lastKeyPressTime]);
    /* DEV CHEAT END */


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
            color: 'white',
            //pointerEvents: 'none',
            fontSize: '16px',
            fontWeight: 'bold',
        }}>
            <img src={StatusbarImg} alt="statusbar" />
            <div style={{
                position: 'absolute',
                top: '19px',
                left: '55px',
                marginRight: '85px',
            }}>{wood}</div>
            <div style={{
                position: 'absolute',
                top: '19px',
                left: '154px',
            }}>{planks}</div>
            <div style={{
                position: 'absolute',
                top: '19px',
                left: '254px',
            }}>{iron}</div>
            <div style={{
                position: 'absolute',
                top: '19px',
                left: '355px',
            }}>{gold}</div>
            <div style={{
                position: 'absolute',
                top: '19px',
                left: '454px',
            }}>{ironIngots}</div>
            <div style={{
                position: 'absolute',
                top: '19px',
                left: '556px',
            }}>{goldIngots}</div>
            <div style={{
                position: 'absolute',
                top: '19px',
                left: '656px',
            }}>{compasses}</div>
        </div>
    );
};