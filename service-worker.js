self.addEventListener("install", (event) => {
  console.log("✅ Service Worker installed");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("✅ Service Worker activated");
});

// إشعار دفع (من الخادم)
self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || "RemindMe";
  const options = {
    body: data.body || "You have a reminder!",
    icon: "/ico-192x192.png",
    badge: "/ico-192x192.png",
    vibrate: [200, 100, 200],
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// إشعار محلي (يستقبل رسالة من التطبيق)
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "LOCAL_REMINDER") {
    const { title, body, delay } = event.data;

    setTimeout(() => {
      self.registration.showNotification(title || "⏰ Reminder", {
        body: body || "It's time!",
        icon: "/ico-192x192.png",
        badge: "/ico-192x192.png",
        vibrate: [200, 100, 200],
      });
    }, delay); // delay بالمللي ثانية
  }
});

// عند الضغط على الإشعار
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow("/") // يفتح التطبيق أو صفحة البداية
  );
});

