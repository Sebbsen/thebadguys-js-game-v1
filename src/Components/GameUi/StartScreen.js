import React, { useState, useEffect } from 'react';
import { StoryDialog } from './StoryDialog';
import { loadMap } from '../../state/GameManager';
import { simulateKeyPress } from '../../services/utils';

export const StartScreen = ({ children }) => {
    const [enterPressed, setEnterPressed] = useState(false);
    const [loading, setLoading] = useState(true);
    const [dialogFinished, setDialogFinished] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                setEnterPressed(true);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    const handleClose = () => {
        setDialogFinished(true);
    };

    if (dialogFinished) {
        return null;
    }

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: loading ? 'url("./start_screen-bg.webp")' : 'none', // Replace with your background image
            backgroundSize: 'cover',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            zIndex: 2000,
        }}>
            <h1 style={{
                color: 'white',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                marginTop: '550px',
            }}>{loading ? 'Loading ...' : enterPressed ? '' : 'Press Enter to Start'}</h1>
            {enterPressed && <StoryDialog onClose={handleClose} />}
            {children}
        </div>
    );
};