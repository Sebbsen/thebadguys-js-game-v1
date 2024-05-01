import React, { useEffect, useState, useContext } from 'react';
import GameState from '../../../state/GameManager';
import { MyReactState } from '../../../state/ReactContext';

import { simulateKeyPress } from '../../../services/utils';

export const BuyBuildingItem = ({
    buildingModel,
    type = '',
    name = '',
    img = '',
    tileType = '',
    buildResources = [],
    productionInput = [],
    productionOutput = []
}) => {
    const { dispatch, state } = useContext(MyReactState);
    const { tileClickedCoords, isBuilding } = state;

    const [isSelected, setIsSelected] = useState(false);
    const [mouseOver, setMouseOver] = useState(false);

    const handleBuyBuilding = () => {
        simulateKeyPress('Escape', 'Escape', 27);
        dispatch({ type: 'updateIsBuilding', payload: type });
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Escape' && isBuilding) {
            dispatch({ type: 'updateIsBuilding', payload: '' });
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isBuilding]);

    useEffect(() => {
        if (isBuilding === type) {
            if (GameState.getEntityById(tileClickedCoords.coords)) {
                dispatch({ type: 'showAlert', payload: 'Tile is occupied' });
                return;
            }
            const currentResources = GameState.getResources();
            const hasAllResources = buildResources.every(resource =>
                currentResources[resource.type] >= resource.cost
            );

            if (hasAllResources) {
                buildResources.forEach(resource => {
                    GameState.changeResource(resource.type, -resource.cost);
                });
                const newBuildingModel = new buildingModel({ id: tileClickedCoords.coords });
                GameState.addEntity(newBuildingModel);
                if (newBuildingModel.checkForAutoWork) {
                    newBuildingModel.checkForAutoWork();
                }
                GameState.editMap(tileClickedCoords.coords.split('-'), tileType);
            } else {
                dispatch({ type: 'showAlert', payload: 'Not enough resources' });
            }
        }
    }, [tileClickedCoords]);

    const renderResourceList = (resources, spritePosition) => (
        resources.map((resource, index) => (
            <div key={index} style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '2px'
            }}>
                <div style={{
                    width: '32px',
                    height: '32px',
                    display: 'inline-block',
                    backgroundImage: `url(./32x32_icon_sprite.png)`,
                    backgroundPosition: `-${spritePosition[resource.type]}px 0px`,
                    backgroundSize: '224px'
                }}></div>
                <span> {resource.cost}</span>
            </div>
        ))
    );

    const spritePosition = {
        wood: 0,
        planks: 32,
        iron: 64,
        gold: 96,
        ironIngots: 128,
        goldIngots: 160,
        compasses: 192,
    };
    

    return (
        <div
            className='hover_ani'
            style={{
                position: 'relative',
                padding: '10px 0',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                textAlign: 'center',
                opacity: isBuilding && isBuilding !== type ? '0.5' : '1',
                height: '100%',
            }}
            onClick={handleBuyBuilding}
            onMouseEnter={() => setMouseOver(true)}
            onMouseLeave={() => setMouseOver(false)}
        >
            <img src={img} alt={name} style={{ width: '70px', height: '70px', objectFit: 'contain' }} />
            {name}
            <div style={{
                opacity: mouseOver ? '1' : '0',
                position: 'absolute',
                bottom: '152px',
                left: '50%',
                width: '220px',
                height: '290px',
                transform: 'translateX(-50%)',
                padding: '45px 20px',
                background: 'url(./buildmenuinfobg.png)',
                backgroundSize: 'cover',
                pointerEvents: 'none',
                transition: 'opacity 0.1s',
            }}>
                <div style={{display: productionInput.length > 0 ? '' : 'none',}}>
                    <span style={{ opacity: 0.4, }}>Input:</span>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                        {renderResourceList(productionInput, spritePosition)}
                    </div>
                </div>
                <hr style={{border: '1px solid rgba(0,0,0,0.1)'}} />
                <div>
                    <span style={{ opacity: 0.4, }}>Output:</span>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px'  }}>
                        {renderResourceList(productionOutput, spritePosition)}
                    </div>
                </div>
                <hr style={{border: '1px solid rgba(0,0,0,0.1)'}} />
                <div>
                    <span style={{ opacity: 0.4, }}>Building Costs:</span>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px'  }}>
                        {renderResourceList(buildResources, spritePosition)}
                    </div>
                </div>
            </div>
        </div>
    );
};
