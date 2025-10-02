
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>


  
  if (navigator.serviceWorker && navigator.serviceWorker.controller) {
  navigator.serviceWorker.controller.postMessage({
    type: "LOCAL_REMINDER",
    title: "School Reminder",
    body: "⏰ Time to go to school!",
    delay: 20000 // بعد 20 ثانية
  });
}

  
);
