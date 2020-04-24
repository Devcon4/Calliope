import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { async } from './async';

export interface Pod {
    name: string;
    status: string;
}

// TODO: Work on a better way to create state hooks.

export type pipeFuncType<T, U> = (obs: BehaviorSubject<T>) => Observable<U> | BehaviorSubject<U>;

export function usePods<U extends Array<unknown> = Pod[]>(pipeFunc?: pipeFuncType<Pod[], U>) {
    const podObs = new BehaviorSubject<Pod[]>([]);
    let pods: U;

    if(!!pipeFunc) {
        pods = async(pipeFunc(podObs));
    } else {
        pods = async(podObs) as U;
    }

    // const pods = async<U | Pod[]>(!!pipeFunc ? pipeFunc(podObs) : podObs);

    function getPods() {
        podObs.next([...podObs.getValue(), randomPod()]);
    }

    return { pods, getPods };
}

function randomPod() {
    const list = [
        {
            name: 'Pod-1',
            status: 'OK'
        },
        {
            name: 'Pod-2',
            status: 'UNAVAILABLE'
        },
        {
            name: 'Pod-3',
            status: 'OK'
        },
        {
            name: 'Pod-4',
            status: 'UNAVAILABLE'
        },
        {
            name: 'Pod-5',
            status: 'OK'
        },
        {
            name: 'Pod-6',
            status: 'UNAVAILABLE'
        },
    ];
    const index = Math.floor(Math.random() * list.length);
    return list[index];
}


// export type hookFuncType<T, U, V extends (obs: BehaviorSubject<T>, values: U | T) => W, W> = W;
// export function stateHookCreator<T, V, U extends Array<unknown> = Array<T>>(hookFunc: (obs: BehaviorSubject<Array<T>>, values: U | Array<T>) => V) {
    
//     return (pipeFunc?: pipeFuncType<Array<T>, U>) => {
//         const obs = new BehaviorSubject<Array<T>>([] as Array<T>);
//         const values = async<U | Array<T>>(!!pipeFunc ? pipeFunc(obs) : obs);
//         return hookFunc(obs, values);
//     }
// }

// export function stateCreator2() {

// }

// export function hookCreator<T, U>(hookFunc: (obs: BehaviorSubject<U>, values: U) => T) {
//     return () => {
//         const obs = new BehaviorSubject<U>(undefined);
//         return hookFunc(obs);
//     }
// }



// const boxer = hookCreator(<U>(obs: BehaviorSubject<Box[]>) => {
    
//     function getValue(pipeFunc?: pipeFuncType<Box[], U>){
//         return async<U | Box[]>(!!pipeFunc ? pipeFunc(obs) : obs);
//     }
// });

// export interface Box {
//     id: number;
//     content: string;
// }

// const { getBoxes } = boxer()

// export const useBoxes = stateHookCreator((obs, values: Box[]) => {

//     function getBoxes() {
//         obs.next([{
//             id: 1,
//             content: 'stuff!'
//         }]);
//     }

//     return {
//         values,
//         getBoxes
//     };
// });