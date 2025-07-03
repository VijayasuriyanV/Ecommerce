import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useMemo } from "react";
import {
	type ColumnDef,
	useReactTable,
	getCoreRowModel,
	flexRender,
} from "@tanstack/react-table";

const AdminDashboard = () => {
	const orders = useSelector((state: RootState) => state.order.orders);

	const totalRevenue = useMemo(
		() => orders.reduce((sum, order) => sum + order.total, 0),
		[orders],
	);

	const columns: ColumnDef<(typeof orders)[0]>[] = [
		{
			header: "Order ID",
			accessorKey: "id",
		},
		{
			header: "Date",
			accessorKey: "date",
			cell: (info) =>
				new Date(info.getValue<string>()).toLocaleDateString("en-GB"),
		},
		{
			header: "Total ($)",
			accessorKey: "total",
		},
		{
			header: "Status",
			accessorKey: "status",
			cell: (info) => (
				<span
					className={
						info.getValue() === "Completed"
							? "text-green-600"
							: "text-yellow-600"
					}
				>
					{String(info.getValue())}
				</span>
			),
		},
	];

	const table = useReactTable({
		data: orders,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className="max-w-7xl mx-auto px-4 py-10">
			<h1 className="text-3xl font-bold mb-6 text-gray-800">
				📊 Admin Dashboard
			</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
				<div className="bg-white p-6 rounded-xl shadow-md shadow-blue-300 text-center">
					<h2 className="text-xl font-semibold text-gray-700">Total Orders</h2>
					<p className="text-2xl font-bold text-indigo-600 mt-2">
						{orders.length}
					</p>
				</div>
				<div className="bg-white p-6 rounded-xl shadow-md shadow-green-300 text-center">
					<h2 className="text-xl font-semibold text-gray-700">Total Revenue</h2>
					<p className="text-2xl font-bold text-green-600 mt-2">
						${totalRevenue.toFixed(2)}
					</p>
				</div>
			</div>

			<div className="bg-white shadow rounded-xl overflow-auto">
				<table className="min-w-full text-left">
					<thead className="bg-gray-100 text-gray-700">
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<th
										key={header.id}
										className="px-6 py-3 text-sm font-semibold"
									>
										{flexRender(
											header.column.columnDef.header,
											header.getContext(),
										)}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody>
						{table.getRowModel().rows.map((row) => (
							<tr key={row.id} className="border-t hover:bg-gray-50">
								{row.getVisibleCells().map((cell) => (
									<td key={cell.id} className="px-6 py-4 text-sm">
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default AdminDashboard;
