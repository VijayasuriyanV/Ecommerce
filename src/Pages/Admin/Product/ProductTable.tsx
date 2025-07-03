// import { useCallback, useEffect, useMemo, useState } from "react";
// import {
// 	useReactTable,
// 	getCoreRowModel,
// 	flexRender,
// 	createColumnHelper,
// } from "@tanstack/react-table";
// import axios from "axios";
// import type { Product } from "../../Products/Product.types";

// const columnHelper = createColumnHelper<Product>();

// const EditableCell = ({
// 	rowId,
// 	field,
// 	initialValue,
// 	onChange,
// 	type = "text",
// }: {
// 	rowId: number;
// 	field: keyof Product;
// 	initialValue: string | number;
// 	onChange: (id: number, key: keyof Product, value: string | number) => void;
// 	type?: string;
// }) => {
// 	const [value, setValue] = useState(initialValue);

// 	useEffect(() => {
// 		setValue(initialValue);
// 	}, [initialValue]);

// 	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		const newVal = type === "number" ? Number(e.target.value) : e.target.value;
// 		setValue(newVal);
// 		onChange(rowId, field, newVal);
// 	};

// 	return (
// 		<input
// 			type={type}
// 			value={value}
// 			onChange={handleInputChange}
// 			className="border px-2 py-1 w-full"
// 		/>
// 	);
// };

// const ProductTable = () => {
// 	const [products, setProducts] = useState<Product[]>([]);
// 	const [editingRowId, setEditingRowId] = useState<number | null>(null);
// 	const [editCache, setEditCache] = useState<Record<number, Partial<Product>>>(
// 		{},
// 	);

// 	useEffect(() => {
// 		axios.get(import.meta.env.VITE_PRODUCTS_API).then((res) => {
// 			setProducts(res.data);
// 		});
// 	}, []);

// 	const handleEdit = useCallback(
// 		(id: number, key: keyof Product, value: string | number) => {
// 			setEditCache((prev) => ({
// 				...prev,
// 				[id]: {
// 					...prev[id],
// 					[key]: value,
// 				},
// 			}));
// 		},
// 		[],
// 	);

// 	const handleSave = useCallback(
// 		async (id: number) => {
// 			const updatedFields = editCache[id];
// 			if (!updatedFields) return;

// 			try {
// 				await axios.put(
// 					`${import.meta.env.VITE_PRODUCTS_API}/${id}`,
// 					updatedFields,
// 				);
// 				setProducts((prev) =>
// 					prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p)),
// 				);
// 				setEditCache((prev) => {
// 					const newCache = { ...prev };
// 					delete newCache[id];
// 					return newCache;
// 				});
// 				setEditingRowId(null);
// 			} catch (err) {
// 				console.error("Error saving:", err);
// 			}
// 		},
// 		[editCache],
// 	);

// 	const handleDelete = useCallback(async (id: number) => {
// 		try {
// 			await axios.delete(`${import.meta.env.VITE_PRODUCTS_API}/${id}`);
// 			setProducts((prev) => prev.filter((p) => p.id !== id));
// 		} catch (err) {
// 			console.error("Error deleting:", err);
// 		}
// 	}, []);

// 	const columns = useMemo(
// 		() => [
// 			columnHelper.accessor("id", {
// 				header: "ID",
// 				cell: (info) => info.getValue(),
// 			}),
// 			columnHelper.accessor("title", {
// 				header: "Title",
// 				cell: (info) => {
// 					const rowId = info.row.original.id;
// 					const initial = editCache[rowId]?.title ?? info.getValue();

// 					if (editingRowId === rowId) {
// 						return (
// 							<EditableCell
// 								rowId={rowId}
// 								field="title"
// 								initialValue={initial}
// 								onChange={handleEdit}
// 							/>
// 						);
// 					}

// 					return (
// 						<button
// 							type="button"
// 							onDoubleClick={() => setEditingRowId(rowId)}
// 							className="bg-transparent p-0 m-0 border-none text-left cursor-pointer text-inherit"
// 						>
// 							{initial}
// 						</button>
// 					);
// 				},
// 			}),
// 			columnHelper.accessor("price", {
// 				header: "Price",
// 				cell: (info) => {
// 					const rowId = info.row.original.id;
// 					const initial = editCache[rowId]?.price ?? info.getValue();

// 					if (editingRowId === rowId) {
// 						return (
// 							<EditableCell
// 								rowId={rowId}
// 								field="price"
// 								initialValue={initial}
// 								onChange={handleEdit}
// 								type="number"
// 							/>
// 						);
// 					}

// 					return (
// 						<button
// 							type="button"
// 							tabIndex={0}
// 							onDoubleClick={() => setEditingRowId(rowId)}
// 							onKeyDown={(e) => {
// 								if (e.key === "Enter" || e.key === " ") {
// 									setEditingRowId(rowId);
// 								}
// 							}}
// 							className="cursor-pointer"
// 							aria-label="Double-click to edit price"
// 						>
// 							${initial}
// 						</button>
// 					);
// 				},
// 			}),
// 			columnHelper.display({
// 				id: "actions",
// 				header: "Actions",
// 				cell: (info) => {
// 					const rowId = info.row.original.id;
// 					return (
// 						<div className="flex gap-2">
// 							{editingRowId === rowId ? (
// 								<button
// 									type="button"
// 									onClick={() => handleSave(rowId)}
// 									className="text-green-600"
// 								>
// 									Save
// 								</button>
// 							) : (
// 								<button
// 									type="button"
// 									onClick={() => setEditingRowId(rowId)}
// 									className="text-blue-600"
// 								>
// 									Edit
// 								</button>
// 							)}
// 							<button
// 								type="button"
// 								onClick={() => handleDelete(rowId)}
// 								className="text-red-600"
// 							>
// 								Delete
// 							</button>
// 						</div>
// 					);
// 				},
// 			}),
// 		],
// 		[editingRowId, editCache, handleDelete, handleEdit, handleSave],
// 	);

// 	const table = useReactTable({
// 		data: products,
// 		columns,
// 		getCoreRowModel: getCoreRowModel(),
// 	});

// 	return (
// 		<div className="max-w-6xl mx-auto p-4">
// 			<h1 className="text-2xl font-bold mb-4">Editable Product Table</h1>
// 			<table className="min-w-full border border-gray-300">
// 				<thead>
// 					{table.getHeaderGroups().map((headerGroup) => (
// 						<tr key={headerGroup.id} className="bg-gray-100">
// 							{headerGroup.headers.map((header) => (
// 								<th key={header.id} className="border px-4 py-2 text-left">
// 									{flexRender(
// 										header.column.columnDef.header,
// 										header.getContext(),
// 									)}
// 								</th>
// 							))}
// 						</tr>
// 					))}
// 				</thead>
// 				<tbody>
// 					{table.getRowModel().rows.map((row) => (
// 						<tr key={row.id} className="hover:bg-gray-50">
// 							{row.getVisibleCells().map((cell) => (
// 								<td key={cell.id} className="border px-4 py-2">
// 									{flexRender(cell.column.columnDef.cell, cell.getContext())}
// 								</td>
// 							))}
// 						</tr>
// 					))}
// 				</tbody>
// 			</table>
// 		</div>
// 	);
// };

// export default ProductTable;
