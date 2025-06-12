<script lang="ts">
	import { onMount } from 'svelte';
	import Search from 'lucide-svelte/icons/search';
	import { karyawanData } from '$lib/data/karyawanData';

	let dataKPI: any[] = [];
	let filteredKPI: any[] = [];
	let loading = true;
	let searchQuery = '';

	const supabaseUrl = import.meta.env.VITE_API_URL;
	const supabaseApiKey = import.meta.env.VITE_API_KEY;

	const fetchData = async () => {
		try {
			const res = await fetch(`${supabaseUrl}/table_kpi_marketing?select=*`, {
				headers: {
					apikey: supabaseApiKey,
					Authorization: `Bearer ${supabaseApiKey}`,
					'Content-Type': 'application/json'
				}
			});
			const json = await res.json();
			dataKPI = json;
			filteredKPI = json; 
		} catch (error) {
			console.error('Gagal fetch data KPI:', error);
			dataKPI = karyawanData;
		} finally {
			filteredKPI = dataKPI;
			loading = false;
		}
	};

	onMount(fetchData);

	const filterData = () => {
		filteredKPI = dataKPI.filter((item) =>
			item.karyawan.toLowerCase().includes(searchQuery.toLowerCase())
		);
	};
</script>

{#if loading}
	<p class="p-5 text-gray-500">Memuat data...</p>
{:else}
	<div class="p-5">
		<div class="flex items-center mb-4">
			<div class="flex border border-gray-300 rounded-md overflow-hidden">
				<input
					type="text"
					placeholder="Cari Nama"
					bind:value={searchQuery}
					on:input={filterData}
					class="px-4 py-2 text-sm focus:outline-none"
				/>
				<button class="px-3 flex items-center text-gray-500" on:click={filterData}>
					<Search class="w-4 h-4" />
				</button>
			</div>
		</div>

		<div class="bg-white h-[35rem] overflow-auto">
			<table class="min-w-full text-sm text-left border border-gray-200">
				<thead class="bg-gray-100 text-gray-700">
					<tr>
						<th class="px-4 py-2 border">ID</th>
						<th class="px-4 py-2 border">Tasklist</th>
						<th class="px-4 py-2 border">KPI</th>
						<th class="px-4 py-2 border">Karyawan</th>
						<th class="px-4 py-2 border">Deadline</th>
						<th class="px-4 py-2 border">Aktual</th>
					</tr>
				</thead>
				<tbody>
					{#each filteredKPI as item}
						<tr class="border-t hover:bg-gray-50">
							<td class="px-4 py-2 border">{item.id}</td>
							<td class="px-4 py-2 border">{item.tasklist}</td>
							<td class="px-4 py-2 border">{item.kpi}</td>
							<td class="px-4 py-2 border">{item.karyawan}</td>
							<td class="px-4 py-2 border">{item.deadline}</td>
							<td class="px-4 py-2 border">{item.aktual}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
{/if}
