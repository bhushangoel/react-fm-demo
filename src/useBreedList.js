// custom hook
import { useEffect, useState } from 'react';

const localCache = {};

export default function useBreedList(animal) {
    const [breedList, setBreedList] = useState([]);

    useEffect(() => {
        if(!animal) {
            setBreedList([]);
        } else if(localCache[animal]) {
            setBreedList(localCache[animal]);
        } else {
            requestBreedList();
        }
    })
}