import React from 'react';
import Styles from './header.module.css';
import { usePods, Pod } from '../../services/pod.hook';
import { map } from 'rxjs/operators';

export default function ClHeader() {
    const mappedPodState = usePods(s => s.pipe(map(l => l.map(PodCard))));
    const rawPodState = usePods();

    
    setInterval(() => {
        mappedPodState.getPods();
    }, 1000);

    return (
        <div className={`${Styles.cardWrapper}`}>
            {...mappedPodState.pods}
        </div>
    )
}

function PodCard(box: Pod, index: number) {
    return <div key={index}>
        <div>{box.name}</div>
        <div>{box.status}</div>
    </div>
}