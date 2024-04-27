import React, { useState, useEffect } from 'react';
import { loadMap } from '../../state/GameManager';
import { simulateKeyPress } from '../../services/utils';

export const StoryDialog = () => {
    const dialogues = [
        { 
            role: 'King Compassius III', 
            text: '(excited) Ah! There you are, my most faithful navigator! I have a mission of utmost importance. Only you can save the kingdom from a terrible, nautical disaster!', 
            image: 'https://cdn.discordapp.com/attachments/989437366844395541/1233876153115349082/sebbo997_profile_image_to_dialog_pixelart_King_Compassius_III_e_c956337f-be77-4c72-9330-cb0d269c642f.png?ex=662eb037&is=662d5eb7&hm=c0e0daf2ea137c655c48372181db72be0f66c9ff1abe4f5bb2ab485a19e82d6f&' 
        },
        { 
            role: 'Player', 
            text: '(confused) Your Majesty, I am just a simple lumberjack, not a navigator...', 
            image: 'https://cdn.discordapp.com/attachments/989437366844395541/1233876984602558524/sebbo997_profile_image_to_dialog_pixelart_lumberjack_confused_Y_165604b3-304a-4695-9e2e-a319117f6653.png?ex=662eb0fd&is=662d5f7d&hm=6a3f8c18f8982f3d62fb987c3a521d0b0a3b9ef102b6b0cc4a85e8928ce93992&' 
        },
        { 
            role: 'King Compassius III', 
            text: '(dramatically) Yes, yes! But today you are more than just a lumberjack. You are the savior of the realm! I had a dream, a terrible dream... Our ships were lost, simply because they did not have enough compasses! Can you imagine? A realm, lost at sea! MY REALM!', 
            image: 'https://cdn.discordapp.com/attachments/989437366844395541/1233876153115349082/sebbo997_profile_image_to_dialog_pixelart_King_Compassius_III_e_c956337f-be77-4c72-9330-cb0d269c642f.png?ex=662eb037&is=662d5eb7&hm=c0e0daf2ea137c655c48372181db72be0f66c9ff1abe4f5bb2ab485a19e82d6f&' 
        },
        { 
            role: 'Player', 
            text: '(ironically) A terrible thought, Majesty. But I\'m not so sure...', 
            image: 'https://cdn.discordapp.com/attachments/989437366844395541/1233876984602558524/sebbo997_profile_image_to_dialog_pixelart_lumberjack_confused_Y_165604b3-304a-4695-9e2e-a319117f6653.png?ex=662eb0fd&is=662d5f7d&hm=6a3f8c18f8982f3d62fb987c3a521d0b0a3b9ef102b6b0cc4a85e8928ce93992&' 
        },
        { 
            role: 'King Compassius III', 
            text: '(determined) One thousand! Exactly one thousand compasses must be made, and for that, I have found the perfect island. No one knows it, for it is not marked on any map. How ironic, right? You will travel there, clear the forest, and gather the necessary resources.', 
            image: 'https://cdn.discordapp.com/attachments/989437366844395541/1233876153115349082/sebbo997_profile_image_to_dialog_pixelart_King_Compassius_III_e_c956337f-be77-4c72-9330-cb0d269c642f.png?ex=662eb037&is=662d5eb7&hm=c0e0daf2ea137c655c48372181db72be0f66c9ff1abe4f5bb2ab485a19e82d6f&' 
        },
        { 
            role: 'Player', 
            text: '(skeptical) Clearing an unknown island to make compasses... Sounds... logical. But an entire island might be difficult to...', 
            image: 'https://cdn.discordapp.com/attachments/989437366844395541/1233876984602558524/sebbo997_profile_image_to_dialog_pixelart_lumberjack_confused_Y_165604b3-304a-4695-9e2e-a319117f6653.png?ex=662eb0fd&is=662d5f7d&hm=6a3f8c18f8982f3d62fb987c3a521d0b0a3b9ef102b6b0cc4a85e8928ce93992&' 
        },
        { 
            role: 'King Compassius III', 
            text: '(laughs) Oh, my brave lumberjack, you will manage! I leave the details to you. Imagine, every swing of your axe brings us closer to safety.', 
            image: 'https://cdn.discordapp.com/attachments/989437366844395541/1233876153115349082/sebbo997_profile_image_to_dialog_pixelart_King_Compassius_III_e_c956337f-be77-4c72-9330-cb0d269c642f.png?ex=662eb037&is=662d5eb7&hm=c0e0daf2ea137c655c48372181db72be0f66c9ff1abe4f5bb2ab485a19e82d6f&' 
        },
        { 
            role: 'Player', 
            text: '(with resigned humor) Well, Majesty, if you wish it so, I will make these compasses and save our kingdom. How hard can it be to make 1000 compasses, haha? When the king speaks, the subject must follow, right?', 
            image: 'https://cdn.discordapp.com/attachments/989437366844395541/1233876984602558524/sebbo997_profile_image_to_dialog_pixelart_lumberjack_confused_Y_165604b3-304a-4695-9e2e-a319117f6653.png?ex=662eb0fd&is=662d5f7d&hm=6a3f8c18f8982f3d62fb987c3a521d0b0a3b9ef102b6b0cc4a85e8928ce93992&' 
        },
        { 
            role: 'King Compassius III', 
            text: '(proud) I give you my best axe to start with. You will find everything else on the island.', 
            image: 'https://cdn.discordapp.com/attachments/989437366844395541/1233876153115349082/sebbo997_profile_image_to_dialog_pixelart_King_Compassius_III_e_c956337f-be77-4c72-9330-cb0d269c642f.png?ex=662eb037&is=662d5eb7&hm=c0e0daf2ea137c655c48372181db72be0f66c9ff1abe4f5bb2ab485a19e82d6f&' 
        }
            ];
    const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
    const [isDialogOpen, setIsDialogOpen] = useState(true);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                if (currentDialogueIndex + 1 < dialogues.length) {
                    setCurrentDialogueIndex((prevIndex) => prevIndex + 1);
                } else {
                    loadMap();
                    simulateKeyPress('ArrowUp', 'ArrowUp', 38);
                    simulateKeyPress('ArrowDown', 'ArrowDown', 40);
                    setIsDialogOpen(false);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentDialogueIndex]);

    if (!isDialogOpen) {
        return null;
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
            borderRadius: '5px',
            width: '80%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
        }}>
            <img src={dialogues[currentDialogueIndex].image} alt={dialogues[currentDialogueIndex].role} style={{ width: '100px', height: '100px' }} />
            <div style={{ flex: 1, marginLeft: '20px', marginRight: '20px' }}>
                <strong>{dialogues[currentDialogueIndex].role}:</strong> {dialogues[currentDialogueIndex].text}
                <div>--Press Enter--</div>
            </div>
        </div>
    );
};