import React, { useState, useEffect } from 'react';

export const useScroll = () => {

    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return scrollPosition
}


export const useDimension = () => {

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    function updateSize() {
        setHeight(window.innerHeight)
        setWidth(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return { height, width }
}

