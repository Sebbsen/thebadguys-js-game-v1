import React, { useState, useEffect, useRef } from 'react';


export const StoryDialog = ({ onClose }) => {
    const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
    const [isDialogOpen, setIsDialogOpen] = useState(true);
    
    const king = './profile_king.gif'
    const lumberjack = './profile_lumberjack.gif'
    
    const audioKing_1 = useRef(null);
    const audioKing_2 = useRef(null);
    const audioKing_3 = useRef(null);
    const audioKing_4 = useRef(null);
    const audioKing_5 = useRef(null);
    const audioPlayer_1 = useRef(null);
    const audioPlayer_2 = useRef(null);
    const audioPlayer_3 = useRef(null);
    const audioPlayer_4 = useRef(null);
    
    const dialogues = [
        { 
            role: 'King Compassius III', 
            emotion: 'excited',
            text: 'Ah! There you are, my most faithful navigator! I have a mission of utmost importance. Only you can save the kingdom from a terrible, nautical disaster!', 
            image: king,
            audio: audioKing_1
        },
        { 
            role: 'Player',
            emotion: 'confused',
            text: 'Your Majesty, I am just a simple lumberjack, not a navigator...',    
            image: lumberjack,
            audio: audioPlayer_1
        },
        { 
            role: 'King Compassius III',
            emotion: 'dramatically',
            text: 'Yes, yes! But today you are more than just a lumberjack. You are the savior of the realm! I had a dream, a terrible dream... Our ships were lost, simply because they did not have enough compasses! Can you imagine? A realm, lost at sea! MY REALM!', 
            image: king,
            audio: audioKing_2
        },
        { 
            role: 'Player', 
            emotion: 'ironically',
            text: 'A terrible thought, Majesty. But I\'m not so sure...', 
            image: lumberjack, 
            audio: audioPlayer_2
        },
        { 
            role: 'King Compassius III', 
            emotion: 'determined',
            text: 'One thousand! Exactly one thousand compasses must be made, and for that, I have found the perfect island. No one knows it, for it is not marked on any map. How ironic, right? You will travel there, clear the forest, and gather the necessary resources.', 
            image: king,
            audio: audioKing_3
        },
        { 
            role: 'Player', 
            emotion: 'skeptical',
            text: 'Clearing an unknown island to make compasses... Sounds... logical. But an entire island might be difficult to...', 
            image: lumberjack, 
            audio: audioPlayer_3
        },
        { 
            role: 'King Compassius III', 
            emotion: 'laughs',
            text: 'Oh, my brave lumberjack, you will manage! I leave the details to you. Imagine, every swing of your axe brings us closer to safety.', 
            image: king,  
            audio: audioKing_4
        },
        { 
            role: 'Player', 
            emotion: 'resigned',
            text: 'Well, Majesty, if you wish it so, I will make these compasses and save our kingdom. How hard can it be to make 1000 compasses, haha? When the king speaks, the subject must follow, right?', 
            image: lumberjack, 
            audio: audioPlayer_4
        },
        { 
            role: 'King Compassius III', 
            emotion: 'proud',
            text: 'I give you my best axe to start with. You will find everything else on the island.', 
            image: king,
            audio: audioKing_5
        }
    ];

    useEffect(() => {
        dialogues[0].audio.current.play();
    }, []);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                if (currentDialogueIndex + 1 < dialogues.length) {
                    dialogues[currentDialogueIndex].audio.current.pause();
                    dialogues[currentDialogueIndex+1].audio.current.play();
                    setCurrentDialogueIndex((prevIndex) => prevIndex + 1);
                } else {
                    setIsDialogOpen(false);
                    onClose();
                }
            }
        };

        const timer = setTimeout(() => {
            window.addEventListener('keydown', handleKeyDown);
        }, 500);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentDialogueIndex, onClose]);

    if (!isDialogOpen) {
        return null;
    }

    return (
        <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '27px 52px',
            color: 'black',
            width: '785px',
            height: '183px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundImage: 'url(./dialogue_bg.png)',
            backgroundSize: '100% 100%',
            zIndex: 1,
            alignItems: 'center',
        }}>
            <img src={dialogues[currentDialogueIndex].image} alt={dialogues[currentDialogueIndex].role} style={{ width: '100px', height: '100px' }} />
            <div style={{ flex: 1, marginLeft: '20px', marginRight: '20px' }}>
                <strong>{dialogues[currentDialogueIndex].role}:</strong> <br />{dialogues[currentDialogueIndex].text}
                <div
                    style={{
                        marginTop: '20px',
                    }}
                >
                    --Press Enter--
                </div>
                <div>
                    <audio ref={audioKing_1} src='./audio/dialogue_audio/king_1.mp3'></audio>
                    <audio ref={audioKing_2} src='./audio/dialogue_audio/king_2.mp3'></audio>
                    <audio ref={audioKing_3} src='./audio/dialogue_audio/king_3.mp3'></audio>
                    <audio ref={audioKing_4} src='./audio/dialogue_audio/king_4.mp3'></audio>
                    <audio ref={audioKing_5} src='./audio/dialogue_audio/king_5.mp3'></audio>
                    <audio ref={audioPlayer_1} src='./audio/dialogue_audio/player_1.mp3'></audio>
                    <audio ref={audioPlayer_2} src='./audio/dialogue_audio/player_2.mp3'></audio>
                    <audio ref={audioPlayer_3} src='./audio/dialogue_audio/player_3.mp3'></audio>
                    <audio ref={audioPlayer_4} src='./audio/dialogue_audio/player_4.mp3'></audio>
                </div>
            </div>
        </div>
    );
};