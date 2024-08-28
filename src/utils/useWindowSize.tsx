import {useEffect, useState} from 'react';

export function useWindowSize() {
    const windowAvailabe = typeof window !== 'undefined';
    const [size, setSize] = useState(windowAvailabe ? {height: window.innerHeight, width: window.innerWidth} : null);
    useEffect(() => {
        function updateSize() {
            setSize({height: window.innerHeight, width: window.innerWidth});
        }
        if (windowAvailabe) {
            updateSize();
            window.addEventListener('resize', updateSize);
        }
        return window.removeEventListener('resize', () => {});
    }, []);
    return size;
}
