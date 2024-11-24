
import { useEffect } from 'react';

export const CursorExample = ({ children }) => {
  useEffect(() => {
    return () => {
      // Cleanup any existing cursor effects when unmounting
      const existingCursors = document.querySelectorAll('.cursor-element');
      existingCursors.forEach(cursor => cursor.remove());
    };
  }, []);

  return <div className="cursor-example">{children}</div>;
};