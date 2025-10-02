import React, { useEffect } from 'react';

// Extend the Window interface to include adsbygoogle for TypeScript
declare global {
  interface Window {
    adsbygoogle?: object[];
  }
}

const AdBanner: React.FC = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  return (
    <div className="my-8 text-center">
        {/* 
          RemindMe Ad - Responsive
          IMPORTANT: Replace ca-pub-XXXXXXXXXXXXXXXX with your own AdSense Publisher ID.
          IMPORTANT: Replace 1234567890 with your own Ad Slot ID.
        */}
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-9775359406833016"
        data-ad-slot="9488390746"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdBanner;
