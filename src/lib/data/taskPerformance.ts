export interface DonutSummary {
	total_task: number;
	total_ontime: number;
	total_late: number;
	persen_ontime: string;
	persen_late: string;
}

export const taskPerformance: DonutSummary = {
	total_task: 13,
	total_ontime: 8,
	total_late: 5,
	persen_ontime: "61.54%",
	persen_late: "38.46%"
};
