// Module declarations for CSS and image imports to satisfy TypeScript
declare module '*.css';
declare module '*.scss';
declare module '*.sass';
declare module '*.module.css';
declare module '*.module.scss';

// Swiper CSS side-effect imports
declare module 'swiper/css';
declare module 'swiper/css/navigation';
declare module 'swiper/css/pagination';

// Common image formats (allow importing images as modules)
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.webp';
declare module '*.avif';
declare module '*.svg';

// Allow importing raw text files if used
declare module '*.txt';

// If you need stricter typings later, replace the `any` with proper interfaces
declare const cssModule: { [className: string]: string };
export default cssModule;
