import { Item } from "./types";
import { clickAction$ } from "./subjects";
import Status from "../../constants/taskStatuses";

type propTypes = {
	item: Item,
	items: object,
};

const ListItem = (props: propTypes) => {
	const { item, items } = props;

	const handleClick = () => {
		const status = item.checked ? Status.COMPLETED : Status.TODO;

		clickAction$.next({
			...items,
			[item.value]: { ...item, status, checked: !item.checked },
		});
	}

	return (
		<label htmlFor={item.value}>
			<input
				type="checkbox"
				name={item.value}
				id={item.value}
				onChange={handleClick}
				checked={item.checked}
			/>
			{item.value}
		</label>
	)
} 

export default ListItem
