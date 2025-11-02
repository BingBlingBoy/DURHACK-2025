import { useEffect, useState, type RefObject } from "react";

const useIsVisible = (ref: RefObject<HTMLElement | null>) => {
    const [isIntersecting, setIntersecting] = useState(false);
    
    useEffect(() => {
        if (!ref.current) return;
        
        const observer = new IntersectionObserver(([entry]) => {
            setIntersecting(entry.isIntersecting)
        });
        
        observer.observe(ref.current);
        
        return () => {
            observer.disconnect();
        };
    }, [ref]);
    
    return isIntersecting;
}

export default useIsVisible