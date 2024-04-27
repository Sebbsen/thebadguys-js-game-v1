import React, { useState, useEffect } from 'react';
import { loadMap } from '../../state/GameManager';
import { simulateKeyPress } from '../../services/utils';

export const StoryDialog = () => {
    const dialogues = [
        'Willkommen im Spiel!',
        'Deine Mission ist es, die Welt zu retten.',
        'Viel Glück!'
    ];
    const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
    const [isDialogOpen, setIsDialogOpen] = useState(true); // Neuer Zustand für die Anzeige des Dialogs

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                if (currentDialogueIndex + 1 < dialogues.length) {
                    setCurrentDialogueIndex((prevIndex) => prevIndex + 1);
                } else {
                    loadMap(); // Rufen Sie loadMap auf, wenn alle Dialoge durchgegangen sind
                    simulateKeyPress('ArrowUp', 'ArrowUp', 38);
                    simulateKeyPress('ArrowDown', 'ArrowDown', 40);
                    setIsDialogOpen(false); // Schließen Sie den Dialog
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentDialogueIndex]); // Fügen Sie currentDialogueIndex zu den Abhängigkeiten hinzu

    if (!isDialogOpen) {
        return null; // Rendern Sie nichts, wenn der Dialog geschlossen ist
    }

    return (
        <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            borderRadius: '5px'
        }}>
            {dialogues[currentDialogueIndex]}
            <div>--Press Enter--</div>
        </div>
    );
};