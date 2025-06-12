<script lang="ts">
	import { onDestroy } from 'svelte';
	import Chart from 'chart.js/auto';

	export let kpiData: any[] = [];

	let canvasBar: HTMLCanvasElement;
	let chartBar: Chart;

	$: if (canvasBar && kpiData.length > 0) {
		const labels = kpiData.map((d) => d.karyawan);
		const bobotSales = kpiData.map((d) => parseFloat(d.total_bobot_sales.replace('%', '')));
		const bobotReport = kpiData.map((d) => parseFloat(d.total_bobot_report.replace('%', '')));
		const totalKpi = kpiData.map((d) => parseFloat(d.total_kpi.replace('%', '')));

		if (chartBar) chartBar.destroy();

		const ctx = canvasBar.getContext('2d');

		// Gradasi warna untuk tiap dataset
		const gradientSales = ctx.createLinearGradient(0, 0, 0, 400);
		gradientSales.addColorStop(0, '#3b82f6');  // blue-500
		gradientSales.addColorStop(1, '#60a5fa');  // blue-400

		const gradientReport = ctx.createLinearGradient(0, 0, 0, 400);
		gradientReport.addColorStop(0, '#10b981');  // emerald-500
		gradientReport.addColorStop(1, '#6ee7b7');  // emerald-300

		const gradientKpi = ctx.createLinearGradient(0, 0, 0, 400);
		gradientKpi.addColorStop(0, '#f97316');  // orange-500
		gradientKpi.addColorStop(1, '#fdba74');  // orange-300

		chartBar = new Chart(canvasBar, {
			type: 'bar',
			data: {
				labels,
				datasets: [
					{
						label: 'Bobot Sales',
						data: bobotSales,
						backgroundColor: gradientSales,
						borderRadius: 6
					},
					{
						label: 'Bobot Report',
						data: bobotReport,
						backgroundColor: gradientReport,
						borderRadius: 6
					},
					{
						label: 'Total KPI',
						data: totalKpi,
						backgroundColor: gradientKpi,
						borderRadius: 6
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					y: {
						beginAtZero: true,
						max: 100,
						ticks: {
							callback: (value: number) => value + '%',
							color: '#6b7280' // gray-500
						},
						grid: {
							color: '#e5e7eb' // gray-200
						}
					},
					x: {
						ticks: {
							color: '#374151' // gray-700
						},
						grid: {
							display: false
						}
					}
				},
				plugins: {
					title: {
						display: true,
						text: 'Ringkasan KPI per Karyawan',
						font: {
							size: 18,
							weight: 'bold'
						},
						color: '#111827' // gray-900
					},
					legend: {
						position: 'bottom',
						labels: {
							color: '#374151', // gray-700
							boxWidth: 14,
							padding: 20
						}
					},
					tooltip: {
						mode: 'index',
						intersect: false,
						callbacks: {
							label: function (context) {
								return `${context.dataset.label}: ${context.raw}%`;
							}
						}
					}
				}
			}
		});
	}

	onDestroy(() => {
		if (chartBar) chartBar.destroy();
	});
</script>

<canvas bind:this={canvasBar} class="w-full h-[400px] chart-fixed"></canvas>
