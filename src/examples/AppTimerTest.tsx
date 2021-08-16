import React, {useState, useEffect} from 'react';
import './styles/App.css';
import {concat, interval, scan, startWith, takeWhile, of, Subject, repeatWhen, share, filter, takeUntil} from "rxjs";

const countdown$ = interval(1000)
	.pipe(
		startWith(5),
		scan(time => time - 1),
		takeWhile(time => time > 0)
	)
	.pipe(share())

const action$ = new Subject();
const snooze$ = action$.pipe(filter(action => action === 'snooze'));
const dismiss$ = action$.pipe(filter(action => action === 'dismiss'));
const wakeUp$ = of('wake up!');
const snoozableAlarm$ = concat(countdown$, wakeUp$).pipe(repeatWhen(() => snooze$))

const observable$ = concat(
	snoozableAlarm$.pipe(takeUntil(dismiss$)),
	of('Have a nice day!')
);

function App() {
	const [state, setState] = useState();

	useEffect(() => {
		// @ts-ignore
		const sub = observable$.subscribe(setState);
		return () => sub.unsubscribe();
	}, [])

	return (
		<div className="App">
			<div>RxJs state manager</div>
			<p>{state}</p>
			<button className="snooze" onClick={() => action$.next('snooze')}>Snooze</button>
			<button className="dismiss" onClick={() => action$.next('dismiss')}>Dismiss</button>
			<button className="resetAlarm" onClick={() => action$.next('reset')}>Reset</button>
		</div>
	);
}

export default App;
