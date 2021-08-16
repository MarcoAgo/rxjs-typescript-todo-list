import {useEffect, useState} from "react";

type typeAny = any;

const useObservable = (observable$: typeAny) => {
	const [state, setState] = useState();

	const effect = () => {
		const subscriber = observable$.subscribe(setState);
		return () => subscriber.unsubscribe;
	}

	useEffect(effect, []);

	return state;
}

export default useObservable;
