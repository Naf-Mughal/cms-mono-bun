import { useEffect, useRef } from 'react';

export const useTaskHighlight = (currentTask?: string) => {
  const elementRefs = useRef<{[key: string]: HTMLElement | null}>({});
  
  useEffect(() => {
    if (!currentTask) return;
    
    const element = elementRefs.current[currentTask];
    if (element) {
      // Add highlight style
      element.style.border = '2px solid red';
      element.style.transition = 'border 0.3s ease';
      
      // Scroll to the element
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Remove highlight after 3 seconds
      // const timer = setTimeout(() => {
      //   element.style.border = '';
      // }, 3000);
      
      return () => {
        // clearTimeout(timer);
        // element.style.border = '';
      };
    }
  }, [currentTask]);
  
  return { elementRefs };
};

// Helper function to create a ref callback for task elements
export const createTaskRef = (elementRefs: React.MutableRefObject<{[key: string]: HTMLElement | null}>, taskName: string) => {
  return (el: HTMLElement | null) => {
    if (el) {
      elementRefs.current[taskName] = el;
    }
  };
};
