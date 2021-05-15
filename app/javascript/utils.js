import React, { useEffect } from 'react';

export const getPriceLevel = (level) => {
  const dollars = ['$', '$$', '$$$', '$$$$', '$$$$$'];
  return dollars[level];
}

export const truncateText = (text) => {
  if (!text) {
    return ''
  } else {
    return text.split(',')[0];
  }
}

export const useViewport = () => {
  const [width, setWidth] = React.useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  // Return the width so we can use it in our components
  return { width };
}
