<script lang="ts">
	export let kpiData: any[] = [];
</script>

{#if kpiData.length}
	<table>
		<thead>
			<tr>
				<th rowspan="2">Nama</th>
				<th colspan="6" class="sales-header">Sales</th>
				<th colspan="6" class="report-header">Report</th>
				<th rowspan="2" class="kpi-header">KPI</th>
			</tr>
			<tr>
				<th>Target</th><th>Actual</th><th>Pencapaian</th><th>Bobot</th><th>Late</th><th>Total</th>
				<th>Target</th><th>Actual</th><th>Pencapaian</th><th>Bobot</th><th>Late</th><th>Total</th>
			</tr>
		</thead>
		<tbody>
			{#each kpiData as item}
				<tr>
					<td>{item.karyawan}</td>
					<td>{item.target_sales}</td>
					<td>{item.actual_sales}</td>
					<td>{item.sales_pencapaian}</td>
					<td>{item.bobot_sales}</td>
					<td>{item.late_sales}</td>
					<td>{item.total_bobot_sales}</td>
					<td>{item.target_report}</td>
					<td>{item.actual_report}</td>
					<td>{item.report_pencapaian}</td>
					<td>{item.bobot_report}</td>
					<td>{item.late_report}</td>
					<td>{item.total_bobot_report}</td>
					<td>{item.total_kpi}</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}

<style>
	table {
		width: 100%;
		border-collapse: collapse;
		font-size: 14px;
	}
	th, td {
		border: 1px solid #ccc;
		padding: 4px 8px;
		text-align: center;
	}
	th { background-color: #f4f4f4; }
	.sales-header { background-color: #dbeafe; }
	.report-header { background-color: #fee2e2; }
	.kpi-header { background-color: #fef9c3; }
</style>
