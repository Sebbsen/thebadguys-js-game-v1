import { useEffect } from 'react';

export const useEntitiesAutoWork = (entities) => {
    useEffect(() => {
        entities.forEach(entity => {
            if (entity && typeof entity.checkForAutoWork === 'function') {
                entity.checkForAutoWork(entities);
            }
        });
    }, [entities]); // Abhängigkeiten, die bei Änderungen die Effekte erneut ausführen
}
