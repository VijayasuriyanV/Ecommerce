// import { useEffect, useState } from "react";

// type EditableCellProps = {
// 	rowId: string | number;
// 	field: string;
// 	initialValue: string | number;
// 	onChange: (
// 		rowId: string | number,
// 		field: string,
// 		value: string | number,
// 	) => void;
// 	type?: string;
// };

// const EditableCell = ({
// 	rowId,
// 	field,
// 	initialValue,
// 	onChange,
// 	type = "text",
// }: EditableCellProps) => {
// 	const [value, setValue] = useState(initialValue);

// 	// Debugging: Log when component re-renders or initialValue changes
// 	useEffect(() => {
// 		console.log(
// 			`EditableCell [${rowId}-${field}] re-rendered. Initial Value: ${initialValue}`,
// 		);
// 		setValue(initialValue);
// 	}, [initialValue, rowId, field]); // Added rowId, field for better logging context

// 	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		const newVal = type === "number" ? Number(e.target.value) : e.target.value;
// 		setValue(newVal);
// 		console.log(
// 			`EditableCell [${rowId}-${field}] local value changed to: ${newVal}`,
// 		);
// 		// console.log("WARNING: onChange (to parent) should NOT be here!"); // Keep this commented or remove
// 	};

// 	const handleBlur = () => {
// 		console.log(
// 			`EditableCell [${rowId}-${field}] BLURRED. Calling parent onChange with: ${value}`,
// 		);
// 		onChange(rowId, field, value);
// 	};

// 	return (
// 		<input
// 			type={type}
// 			value={value}
// 			onChange={handleInputChange}
// 			onBlur={handleBlur}
// 			className="border px-2 py-1 w-full"
// 		/>
// 	);
// };

// export default EditableCell;
