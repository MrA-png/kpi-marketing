<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';

	let canvasBar: HTMLCanvasElement;
	let canvasDonut: HTMLCanvasElement;
	let chartBar: Chart;
	let chartDonut: Chart;

	let kpiData: any[] = [];
	let donutData: any = null;

	onMount(async () => {
		// Fetch KPI summary (bar chart)
		const resBar = await fetch(
			'https://nwisjfpqbaghxkpunuyb.supabase.co/rest/v1/rpc/get_kpi_summary?select=*',
			{
				headers: {
					apikey:
						'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53aXNqZnBxYmFnaHhrcHVudXliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3MDY0MzEsImV4cCI6MjA2NTI4MjQzMX0.Z1qNSLDAaY1ZI_N5rhNSPhnNJzPpO1TxztKVKZmvDSU',
					Authorization:
						'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53aXNqZnBxYmFnaHhrcHVudXliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3MDY0MzEsImV4cCI6MjA2NTI4MjQzMX0.Z1qNSLDAaY1ZI_N5rhNSPhnNJzPpO1TxztKVKZmvDSU'
				}
			}
		);
		kpiData = await resBar.json();

		// Fetch KPI task summary (donut chart)
		const resDonut = await fetch(
			'https://nwisjfpqbaghxkpunuyb.supabase.co/rest/v1/rpc/get_kpi_task_summary?select=*',
			{
				headers: {
					apikey:
						'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53aXNqZnBxYmFnaHhrcHVudXliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3MDY0MzEsImV4cCI6MjA2NTI4MjQzMX0.Z1qNSLDAaY1ZI_N5rhNSPhnNJzPpO1TxztKVKZmvDSU',
					Authorization:
						'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53aXNqZnBxYmFnaHhrcHVudXliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3MDY0MzEsImV4cCI6MjA2NTI4MjQzMX0.Z1qNSLDAaY1ZI_N5rhNSPhnNJzPpO1TxztKVKZmvDSU'
				}
			}
		);
		const donutRaw = await resDonut.json();
		donutData = donutRaw[0]; // hanya satu item

		// Render Bar Chart
		const labels = kpiData.map((d) => d.karyawan);
		const bobotSales = kpiData.map((d) => parseFloat(d.total_bobot_sales.replace('%', '')));
		const bobotReport = kpiData.map((d) => parseFloat(d.total_bobot_report.replace('%', '')));
		const totalKpi = kpiData.map((d) => parseFloat(d.total_kpi.replace('%', '')));

		if (chartBar) chartBar.destroy();
		chartBar = new Chart(canvasBar, {
			type: 'bar',
			data: {
				labels,
				datasets: [
					{
						label: 'Bobot Sales',
						data: bobotSales,
						backgroundColor: 'rgba(59, 130, 246, 0.7)'
					},
					{
						label: 'Bobot Report',
						data: bobotReport,
						backgroundColor: 'rgba(34, 197, 94, 0.7)'
					},
					{
						label: 'Total KPI',
						data: totalKpi,
						backgroundColor: 'rgba(234, 88, 12, 0.7)'
					}
				]
			},
			options: {
				responsive: true,
				scales: {
					y: {
						beginAtZero: true,
						max: 100,
						ticks: {
							callback: (value: any) => value + '%'
						}
					}
				},
				plugins: {
					title: {
						display: true,
						text: 'Ringkasan KPI per Karyawan'
					},
					legend: {
						position: 'bottom'
					}
				}
			}
		});

		// Render Donut Chart
		if (chartDonut) chartDonut.destroy();
		chartDonut = new Chart(canvasDonut, {
			type: 'doughnut',
			data: {
				labels: ['On Time', 'Late'],
				datasets: [
					{
						label: 'Task KPI',
						data: [donutData.total_ontime, donutData.total_late],
						backgroundColor: ['#34d399', '#f87171'],
						borderColor: ['#059669', '#dc2626'],
						borderWidth: 1
					}
				]
			},
			options: {
				responsive: true,
				plugins: {
					title: {
						display: true,
						text: `Distribusi Task - ${donutData.persen_ontime} on-time`
					},
					legend: {
						position: 'bottom'
					}
				}
			}
		});
	});
</script>

<div class="bg-white p-6 rounded shadow">
	<!-- CHARTS -->
	<div class="chart-container">
		<canvas bind:this={canvasBar} class="chart-fixed"></canvas>
		<canvas bind:this={canvasDonut} class="chart-fixed"></canvas>
	</div>

	<!-- KPI Table -->
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
					<th>Target</th>
					<th>Actual</th>
					<th>Pencapaian</th>
					<th>Bobot</th>
					<th>Late</th>
					<th>Total</th>
					<th>Target</th>
					<th>Actual</th>
					<th>Pencapaian</th>
					<th>Bobot</th>
					<th>Late</th>
					<th>Total</th>
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
</div>

<style>
    @media (max-width: 768px) {
	.chart-container {
		flex-direction: column;
	}
}

	.chart-fixed {
		height: 400px; /* tinggi yang sama */
		width: 100%;
		max-width: 600px; /* opsional: batasi lebar */
	}
    .chart-container {
	display: flex;
	gap: 2rem;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
}
	canvas {
		max-width: 450px;
		width: 100%;
	}
	table {
		width: 100%;
		border-collapse: collapse;
		font-size: 14px;
	}
	th,
	td {
		border: 1px solid #ccc;
		padding: 4px 8px;
		text-align: center;
	}
	th {
		background-color: #f4f4f4;
	}
	.sales-header {
		background-color: #dbeafe;
	}
	.report-header {
		background-color: #fee2e2;
	}
	.kpi-header {
		background-color: #fef9c3;
	}
</style>
