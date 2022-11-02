import { useEffect, useRef } from "react";

export const useListener = (listener, timeout, dp) => {
    const timer = useRef();
    const unwatch = useRef();

    useEffect(() => {
        if (unwatch.current) {
            unwatch.current();
        }
        clearTimeout(timer.current);

        timer.current = setTimeout(() => {
            unwatch.current = listener();
        }, timeout);

        return () => {
            unwatch.current && unwatch.current();
            clearTimeout(timer.current);
        };
    }, dp);
};
