<script lang="ts">
	import { page } from '$app/stores';

	$: currentPath = $page.url.pathname;
</script>

<div class="flex h-screen font-inter">
	<aside class="w-64 bg-white border-r flex flex-col justify-between">
		<div>
			<div class="p-4">
				<span class="text-sm text-gray-800">Admin Dashboard</span>
			</div>

			<div class="border-y border-gray-200 bg-gray-100">
				<div class="px-4 py-4 flex justify-between items-center relative">
					<span class="text-sm font-semibold text-gray-800">Kelola Karyawan</span>
					<img
						src="/assets/icons/pin-button.svg"
						alt="Pin Icon"
						class="w-6 h-6 absolute -right-3 top-1/2 transform -translate-y-1/2"
					/>
				</div>
			</div>

			<nav class="space-y-1 px-4 pb-3 mt-6">
				<a
					href="/data-kpi"
					class="px-3 py-2 rounded-lg text-sm font-medium block text-gray-800 hover:bg-gray-100"
					class:bg-gray-100={currentPath === '/data-kpi'}
					class:text-gray-900={currentPath === '/data-kpi'}
				>
					Data KPI Marketing
				</a>

				<a
					href="/data-karyawan"
					class="px-3 py-2 rounded-lg text-sm font-medium block text-gray-800 hover:bg-gray-100"
					class:bg-gray-100={currentPath === '/data-karyawan'}
					class:text-gray-900={currentPath === '/data-karyawan'}
				>
					Karyawan
				</a>
			</nav>
		</div>

		<div class="py-4 px-4"></div>
	</aside>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

	:global(html) {
		font-family: 'Inter', sans-serif;
	}
</style>
