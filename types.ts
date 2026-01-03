export interface VideoItem {
  id: string;
  title: string;
  src: string;
  type: 'video/mp4' | 'video/webm' | string;
  file?: File;
  isEmbed?: boolean; // New property to distinguish between native video and iframes
}

export interface NavItem {
  label: string;
  href: string;
}

export enum SectionId {
  WELCOME = 'welcome-screen',
  HOME = 'home',
  ABOUT = 'about',
  RESUME = 'resume',
  WORK = 'my-work',
  CONTACT = 'contact',
}