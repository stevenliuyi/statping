{{define "charts"}}
{{$start := .Start}}
{{$end := .End}}

const axisOptions = {
	labels: {
		show: false
	},
	crosshairs: {
		show: false
	},
	lines: {
		show: false
	},
	tooltip: {
		enabled: false
	},
	axisTicks: {
		show: false
	},
	grid: {
		show: false
	},
	marker: {
		show: false
	}
};

	const annotationColor = {
		strokeDashArray: 0,
		borderColor: "#d0222d",
		label: {
			show: false,
		}
	};

	let annotation = {
		annotations: {
			xaxis: [
				{
					// in a datetime series, the x value should be a timestamp, just like it is generated below
					x: new Date("01/29/2019").getTime(),
					...annotationColor
				}]
		}
	};

let options = {
	chart: {
		height: 210,
		width: "100%",
		type: "area",
		animations: {
			enabled: false,
			initialAnimation: {
				enabled: false
			}
		},
		selection: {
			enabled: false
		},
		zoom: {
			enabled: false
		},
		toolbar: {
			show: false
		}
	},
	grid: {
		show: false,
		padding: {
			top: 0,
			right: 0,
			bottom: 0,
			left: -10,
		},
	},
	tooltip: {
		enabled: false,
		marker: {
			show: false,
		},
		x: {
			show: false,
		}
	},
	legend: {
		show: false,
	},
	dataLabels: {
		enabled: false
	},
	floating: true,
	axisTicks: {
		show: false
	},
	axisBorder: {
		show: false
	},
	fill: {
		colors: ["#13b2ef"],
		opacity: 1,
		type: 'solid'
	},
	stroke: {
		show: true,
		curve: 'smooth',
		lineCap: 'butt',
		colors: ["#0d8aba"],
	},
	series: [
		{
			name: "Response Time",
			data: [],
		}
	],
	xaxis: {
		type: "datetime",
		...axisOptions
	},
	yaxis: {
		...axisOptions
	},
};

const startOn = UTCTime() - (86400 * 14);

async function RenderCharts() {
{{ range .Services }}
	options.fill.colors = {{if .Online}}["#13b2ef"]{{else}}["#aaa"]{{end}};
	options.stroke.colors = {{if .Online}}["#0d8aba"]{{else}}["#888"]{{end}};

	let chart{{.Id}} = new ApexCharts(document.querySelector("#service_{{js .Id}}"), options);

	await RenderChart(chart{{js .Id}}, {{js .Id}}, startOn);{{end}}
}

$( document ).ready(function() {
	RenderCharts()
});
{{end}}
