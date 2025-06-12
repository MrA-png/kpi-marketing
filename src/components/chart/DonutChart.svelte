<script lang="ts">
	import { onDestroy } from 'svelte';
	import Chart from 'chart.js/auto';

	export let donutData: any;

	let canvasDonut: HTMLCanvasElement;
	let chartDonut: Chart;

	$: if (canvasDonut && donutData) {
		if (chartDonut) chartDonut.destroy();

		const ctx = canvasDonut.getContext('2d')!;

		const gradientOnTime = ctx.createLinearGradient(0, 0, 0, 200);
		gradientOnTime.addColorStop(0, '#10b981');
		gradientOnTime.addColorStop(1, '#6ee7b7'); 

		const gradientLate = ctx.createLinearGradient(0, 0, 0, 200);
		gradientLate.addColorStop(0, '#f43f5e'); 
		gradientLate.addColorStop(1, '#fda4af'); 

		const centerTextPlugin = {
			id: 'centerText',
			beforeDraw(chart: any) {
				const { width, height, ctx } = chart;
				const text = chart.config.data.totalTaskText || '';
				ctx.save();
				ctx.font = 'bold 18px sans-serif';
				ctx.fillStyle = '#1f2937';
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';
				ctx.fillText(text, width / 2, height / 2);
				ctx.restore();
			}
		};

		chartDonut = new Chart(canvasDonut, {
			type: 'doughnut',
			data: {
				labels: ['On Time', 'Late'],
				datasets: [
					{
						label: 'Task KPI',
						data: [donutData.total_ontime, donutData.total_late],
						backgroundColor: [gradientOnTime, gradientLate],
						borderColor: '#f9fafb',
						borderWidth: 2
					}
				],
				totalTaskText: `${donutData.total_task} Task`
			} as any,
			options: {
				responsive: true,
				maintainAspectRatio: false,
				cutout: '70%',
				plugins: {
					title: {
						display: true,
						text: ['Distribusi Task', `${donutData.persen_ontime} on-time`],
						font: {
							size: 16
						},
						color: '#111827',
						padding: {
							top: 10,
							bottom: 10
						}
					},
					legend: {
						position: 'bottom',
						labels: {
							color: '#374151', 
							padding: 16,
							boxWidth: 14
						}
					},
					tooltip: {
						callbacks: {
							label: function (context) {
								return `${context.label}: ${context.raw} task`;
							}
						}
					}
				}
			},
			plugins: [centerTextPlugin]
		});
	}

	onDestroy(() => {
		if (chartDonut) chartDonut.destroy();
	});
</script>

<canvas bind:this={canvasDonut} class="w-full h-[350px] chart-fixed"></canvas>
