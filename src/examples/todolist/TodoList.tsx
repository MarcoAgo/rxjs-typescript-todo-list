import { useEffect, useMemo, useState } from "react";
import { arrayOfObjects, Item } from "./types";
import ListItem from "./ListItem";
import {changeAction$, clickAction$, updateChangeAction$} from "./subjects";
import { Container } from "./styled";
import Status from "../../constants/taskStatuses";

const TodoList = () => {
	const [value, setValue] = useState<string>('');
	const [items, setItems] = useState<object>({});
	const itemsArray = useMemo<arrayOfObjects>(() => Object.values(items), [items]);

	useEffect(() => {
		const changeSub = updateChangeAction$.subscribe(setValue);
		const clickSub = clickAction$.subscribe(setItems);

		return () => {
			changeSub.unsubscribe();
			clickSub.unsubscribe();
		}
	}, [])

	/** manage input change, destructuring of target */
	const handleInputChange = (event: { target: { value: string; }; }) => {
		const { target: { value: val } } = event;
		return changeAction$.next(val);
	}

	const handleButtonClick = () => {
		clickAction$.next({ ...items, [value]: { value, checked: false, status: Status.TODO } });
		changeAction$.next('');
	}

	const renderItems = (item: Item) => (
		<ListItem
			key={item.value}
			item={item}
			items={items}
		/>
	)

	const renderList = () => (
		<Container visible={itemsArray.length}>
			<p>List of fucking things to do:</p>
			<div>{itemsArray.map(renderItems)}</div>
		</Container>
	);

	const renderEmptyListState = () => (
		<Container visible={!itemsArray.length}>No items here dude</Container>
	);

	return (
		<div>
			<input type="text" value={value} onChange={handleInputChange} />
			<button disabled={!value.length} onClick={handleButtonClick}>Add</button>
			{renderList()}
			{renderEmptyListState()}
		</div>
	)
};

export default TodoList;
