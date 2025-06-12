export interface KpiItem {
	karyawan: string;
	target_sales: number;
	actual_sales: number;
	sales_pencapaian: string;
	bobot_sales: string;
	late_sales_count: number;
	late_sales: string;
	late_sales_minus: string;
	total_bobot_sales: string;
	target_report: number;
	actual_report: number;
	report_pencapaian: string;
	bobot_report: string;
	late_report_count: number;
	late_report: string;
	late_report_minus: string;
	total_bobot_report: string;
	total_kpi: string;
}

export const kpiMarketing: KpiItem[] = [
	{
		karyawan: "Budi",
		target_sales: 2,
		actual_sales: 2,
		sales_pencapaian: "100%",
		bobot_sales: "50%",
		late_sales_count: 0,
		late_sales: "0%",
		late_sales_minus: "-0%",
		total_bobot_sales: "50%",
		target_report: 2,
		actual_report: 2,
		report_pencapaian: "100%",
		bobot_report: "50%",
		late_report_count: 1,
		late_report: "50%",
		late_report_minus: "-5%",
		total_bobot_report: "45%",
		total_kpi: "95%"
	},
	{
		karyawan: "Rara",
		target_sales: 2,
		actual_sales: 2,
		sales_pencapaian: "100%",
		bobot_sales: "50%",
		late_sales_count: 1,
		late_sales: "50%",
		late_sales_minus: "-7%",
		total_bobot_sales: "43%",
		target_report: 1,
		actual_report: 1,
		report_pencapaian: "100%",
		bobot_report: "50%",
		late_report_count: 1,
		late_report: "100%",
		late_report_minus: "-5%",
		total_bobot_report: "45%",
		total_kpi: "88%"
	},
	{
		karyawan: "Adi",
		target_sales: 2,
		actual_sales: 2,
		sales_pencapaian: "100%",
		bobot_sales: "50%",
		late_sales_count: 1,
		late_sales: "50%",
		late_sales_minus: "-7%",
		total_bobot_sales: "43%",
		target_report: 2,
		actual_report: 2,
		report_pencapaian: "100%",
		bobot_report: "50%",
		late_report_count: 0,
		late_report: "0%",
		late_report_minus: "-0%",
		total_bobot_report: "50%",
		total_kpi: "93%"
	},
	{
		karyawan: "Doni",
		target_sales: 1,
		actual_sales: 1,
		sales_pencapaian: "100%",
		bobot_sales: "50%",
		late_sales_count: 1,
		late_sales: "100%",
		late_sales_minus: "-7%",
		total_bobot_sales: "43%",
		target_report: 1,
		actual_report: 1,
		report_pencapaian: "100%",
		bobot_report: "50%",
		late_report_count: 0,
		late_report: "0%",
		late_report_minus: "-0%",
		total_bobot_report: "50%",
		total_kpi: "93%"
	}
];
