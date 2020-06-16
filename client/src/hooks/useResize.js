import { useState, useEffect } from 'react';

const useResize = (myRef) => {
    const [width, setWidth] = useState(400)
    const [height, setHeight] = useState(400)
  
    useEffect(() => {
      const handleResize = () => {
        setWidth(myRef.current.offsetWidth)
        setHeight(myRef.current.offsetHeight)
      }
      handleResize();
      window.addEventListener('resize', handleResize)
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }, [myRef])
  
    return { width, height }
  }

  export default useResize;