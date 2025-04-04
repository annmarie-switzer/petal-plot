import { ViewHorizontalIcon, ViewVerticalIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import './Drawer.css';

export type DrawerPosition = 'right' | 'bottom';

interface DrawerProps {
  defaultPosition: DrawerPosition;
}

export const Drawer = ({ defaultPosition }: DrawerProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState<DrawerPosition>(defaultPosition);

  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(300);
  const [startDimension, setStartDimension] = useState(0);
  const [startPosition, setStartPosition] = useState(0);

  // Add new listeners to the page when dragging starts
  // We need document level listeneers otherwise when the mouse leaves the element bounds,dragging would stop
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const clientValue = position === 'right' ? e.clientX : e.clientY;
      // Calculate how far we've moved from the start position
      const delta = startPosition - clientValue;
      // Update the appropriate dimension based on position
      if (position === 'right') {
        setWidth(startDimension + delta);
      } else {
        setHeight(startDimension + delta);
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', () => setIsDragging(false));
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', () => setIsDragging(false));
    };
  }, [isDragging, startPosition, startDimension, position]);

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;

    setIsDragging(true);
    setStartPosition(position === 'right' ? e.clientX : e.clientY);
    setStartDimension(
      position === 'right'
        ? target.parentElement!.clientWidth
        : target.parentElement!.clientHeight
    );
  };

  const changePosition = () => {
    const newPosition = position === 'right' ? 'bottom' : 'right';

    localStorage.setItem('drawerPosition', newPosition);
    setPosition(newPosition);
  };

  const drawerStyle = position === 'right' ? { width } : { height };

  return (
    <div
      className={`drawer ${position}`}
      style={drawerStyle as React.CSSProperties}
    >
      <div
        className={`drag-handle ${position}`}
        onMouseDown={handleDragStart}
      />
      <div className="drawer-content">
        <button type="button" onClick={changePosition}>
          {position === 'right' ? <ViewHorizontalIcon /> : <ViewVerticalIcon />}
        </button>
      </div>
    </div>
  );
};
