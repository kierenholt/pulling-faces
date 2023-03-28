import React, { RefObject, useEffect, useRef } from 'react';
import './Slider.css';

interface SliderParams {
    setWidth: (n: number) => void
}

export default function Slider({ setWidth }: SliderParams) {
    const maxWidth = 0.75 * document.body.clientWidth;
    const minWidth = 0.25 * document.body.clientWidth;
    const dragItem: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
    
    const dragStart = (e:React.DragEvent<HTMLDivElement>) => {
      dragItem.current?.classList.add("dragging");
    };
  
    const drop = (e: React.DragEvent<HTMLDivElement>) => {
      if ((e.clientX < maxWidth) && (e.clientX > minWidth)) setWidth(e.clientX);
      dragItem.current?.classList.remove("dragging");
    }
  
    useEffect(() => {
      const handleDrag = ((e: DragEvent) => {
        if ((e.clientX < maxWidth) && (e.clientX > minWidth)) setWidth(e.clientX)
      });
      dragItem.current?.addEventListener("drag", handleDrag);
  
      return () => {
        dragItem.current?.removeEventListener("drag", handleDrag);
      }
    })

    return (
        <div ref={dragItem} className='gutter'
                onDragStart={dragStart}
                onDragEnd={drop}
                draggable>
        </div>
    )
}