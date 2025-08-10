'use client';

import { useEffect } from 'react';

interface LayoutShiftEntry extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

interface FirstInputEntry extends PerformanceEntry {
  processingStart: number;
}

const PerformanceMonitor = () => {
  useEffect(() => {
    // Vain kehitysmoodissa
    if (process.env.NODE_ENV !== 'production') {
      // Web Vitals mittaus
      const measureWebVitals = () => {
        // LCP (Largest Contentful Paint)
        if ('PerformanceObserver' in window) {
          new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
              console.log('🎯 LCP:', Math.round(entry.startTime), 'ms');
            });
          }).observe({ type: 'largest-contentful-paint', buffered: true });

          // FID (First Input Delay) 
          new PerformanceObserver((list) => {
            const entries = list.getEntries() as FirstInputEntry[];
            entries.forEach((entry) => {
              console.log('⚡ FID:', Math.round(entry.processingStart - entry.startTime), 'ms');
            });
          }).observe({ type: 'first-input', buffered: true });

          // CLS (Cumulative Layout Shift)
          let clsValue = 0;
          new PerformanceObserver((list) => {
            for (const entry of list.getEntries() as LayoutShiftEntry[]) {
              if (!entry.hadRecentInput) {
                clsValue += entry.value;
              }
            }
            console.log('📐 CLS:', clsValue.toFixed(4));
          }).observe({ type: 'layout-shift', buffered: true });

          // TTFB (Time to First Byte)
          const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          if (navigationEntry) {
            const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
            console.log('🚀 TTFB:', Math.round(ttfb), 'ms');
          }
        }
      };

      // Mittaa kun sivu on latautunut
      if (document.readyState === 'complete') {
        measureWebVitals();
      } else {
        window.addEventListener('load', measureWebVitals);
      }

      // Bundle analyysitiedot
      console.log('📦 Performance Tips:');
      console.log('- Hero kuva ladattu AVIF-muodossa');
      console.log('- Komponentit lazy loadattu Intersection Observer:illa');
      console.log('- Next.js kuvaoptimointi käytössä');
      console.log('- Framer Motion optimoitu');
    }
  }, []);

  return null; // Ei renderöi mitään
};

export default PerformanceMonitor;