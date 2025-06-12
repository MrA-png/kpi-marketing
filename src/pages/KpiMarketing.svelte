<script lang="ts">
	import DetailDevice from '../components/kpi-marketing/headerKPI.svelte';
	import BarChart from '../components/chart/BarChart.svelte';
	import DonutChart from '../components/chart/DonutChart.svelte';
	import KpiTable from '../components/chart/KpiTable.svelte';
	import { onMount } from 'svelte';
	import { taskPerformance, type DonutSummary } from '$lib/data/taskPerformance';
	import { kpiMarketing, type KpiItem } from '$lib/data/kpiMarketing';

	let kpiData: KpiItem[] = [];
	let donutData: {
		total_ontime: number;
		total_late: number;
		persen_ontime: string;
	} | null = null;

	const supabaseUrl = import.meta.env.VITE_API_URL;
	const supabaseApiKey = import.meta.env.VITE_API_KEY;

	onMount(async () => {
		const headers = {
			apikey: supabaseApiKey,
			Authorization: `Bearer ${supabaseApiKey}`
		};

		try {
			const resBar = await fetch(`${supabaseUrl}/rpc/get_kpi_summary?select=*`, { headers });
			const data = await resBar.json();
			kpiData = Array.isArray(data) && data.length ? data : kpiMarketing;
		} catch (error) {
			kpiData = kpiMarketing;
		}

		try {
			const resDonut = await fetch(`${supabaseUrl}/rpc/get_kpi_task_summary?select=*`, { headers });
			const donutRaw = await resDonut.json();
			donutData = donutRaw && donutRaw.length ? donutRaw[0] : taskPerformance;
		} catch (error) {
			donutData = taskPerformance;
		}
	});
</script>

<DetailDevice />
<hr class="border-t border-gray-200" />

<div class="p-6 h-[40rem] overflow-hidden hover:overflow-auto">
	<div class="flex flex-row flex-wrap md:flex-nowrap items-start gap-6 p-4">
		<div class="w-full md:w-2/3">
			<BarChart {kpiData} />
		</div>

		<div class="w-full md:w-1/3">
			<DonutChart {donutData} />
		</div>
	</div>
	<div class="px-4 pb-4">
		<KpiTable {kpiData} />
	</div>
</div>

<style>
	.chart-container {
		display: flex;
		gap: 2rem;
		flex-wrap: wrap;
		justify-content: center;
	}
</style>
