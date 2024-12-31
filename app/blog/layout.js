'use client';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export default function BlogLayout({ children }) {
  return (
    <div>
      <ProgressBar
        height="4px"
        color="#ff0000"
        options={{ showSpinner: false }}
        shallowRouting
      />
      {children}
    </div>
  );
}