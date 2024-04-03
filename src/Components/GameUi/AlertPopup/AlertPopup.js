import React, { useContext, useEffect } from 'react';
import { MyReactState } from '../../../state/ReactContext';
import './AlertPopup.css'; // Dein vorher definiertes CSS für Alerts

const AlertPopup = () => {
  const { state: { alert }, dispatch } = useContext(MyReactState);

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
    <div className="alert-box info">
      {alert.message}
    </div>
  );
};

export default AlertPopup;
