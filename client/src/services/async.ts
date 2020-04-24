import { Observable, BehaviorSubject } from 'rxjs';
import { useState, useEffect } from 'react';
export function async<T>(obs: Observable<T> | BehaviorSubject<T>) {
    const [val, setVal] = useState<T>();
    useEffect(() => {
        const sub = obs.subscribe(o => setVal(o));
        return () => {
            sub.unsubscribe();
        };
    }, []);
    return val;
}
