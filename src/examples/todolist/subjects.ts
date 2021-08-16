import { debounceTime, Subject } from "rxjs";

export const changeAction$ = new Subject<string>();
export const updateChangeAction$ = changeAction$.pipe(debounceTime(50));
export const clickAction$ = new Subject<object>();
