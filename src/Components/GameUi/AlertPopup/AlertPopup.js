import React, { useContext, useEffect, useState } from 'react';
import { MyReactState } from '../../../state/ReactContext';
import './AlertPopup.css'; // Dein vorher definiertes CSS für Alerts

const AlertPopup = () => {
    const { state: { alert }, dispatch } = useContext(MyReactState);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updateCursorPosition = (e) => {
            setCursorPosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('click', updateCursorPosition);

        return () => {
            window.removeEventListener('click', updateCursorPosition);
        };
    }, []);

    useEffect(() => {
        if (alert.isVisible) {
            const timer = setTimeout(() => {
                dispatch({ type: 'hideAlert' });
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [alert.isVisible, dispatch]);

    if (!alert.isVisible) return null;

    return (
        <div className="alert-box info" style={{ position: 'fixed', left: `${cursorPosition.x}px`, top: `${cursorPosition.y}px` }}>
            {alert.message}
        </div>
    );
};

export default AlertPopup;