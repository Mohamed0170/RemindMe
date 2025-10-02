import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

// ⚡ طلب إذن الإشعارات عند تشغيل التطبيق
if ("Notification" in window && Notification.permission !== "granted") {
  Notification.requestPermission();
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ✅ إرسال رسالة للـ Service Worker بعد 20 ثانية (اختبار)
if (navigator.serviceWorker && navigator.serviceWorker.controller) {
  navigator.serviceWorker.controller.postMessage({
    type: "LOCAL_REMINDER",
    title: "School Reminder",
    body: "⏰ Time to go to school!",
    delay: 20000 // بعد 20 ثانية
  });
}

