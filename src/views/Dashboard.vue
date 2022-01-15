<template>
    <div class="dashboard">
        <div class="charts">
            <div class="title">
                <h2>Chart</h2>
            </div>
            <div class="body">
                <div class="chart">
                    <LineChart :chartData="testData" :options="options"/>
                </div>
                <div class="chart">
                    <LineChart :chartData="testData" :options="options"/>
                </div>
            </div>
        </div>
        <h2>History</h2>
    </div>
</template>

<script>
import { LineChart } from "vue-chart-3";
import { Chart, LineElement, PointElement, LineController, CategoryScale, LinearScale, Filler } from "chart.js";

Chart.register(LineElement, PointElement, LineController, CategoryScale, LinearScale, Filler);

export default {
    name: "Dashboard",
    components: {
        LineChart
    },
    setup() {
        const testData = {
            labels: ["Paris", "Nîmes", "Toulon", "Perpignan", "Autre"],
            datasets: [
                {
                    data: [30, 40, 60, 70, 5],
                    backgroundColor: "#C9F4E8",
                    borderWidth: 2,
                    borderColor: "#855CF8",
                    pointBackgroundColor: "#855CF8",
                    pointRadius: 5.5,
                    pointHitRadius: 0,
                    pointBorderWidth: 1,
                    pointBorderColor: "#FFFFFF",
                    tension: 0.4,
                    fill: true,
                    drawActiveElementsOnTop: false,
                },
            ],
        };
        const options = {
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                },
                title: {
                    display: false,
                },
                tooltip: {
                    enabled: false
                },
            },
            scales: {
                x: {
                    display: false,
                },
                y: {
                    display: false,
                },
            },
        }

    return { testData, options };
  },
}
</script>

<style lang="scss">
body {
    color: white;
    background-color: white;
}

.charts {
    .body {
        display: flex;
        flex-direction: row;
        overflow-x: auto;
        max-height: 200px;
        .chart div {
            min-width: 250px;
            height: 200px;
        }
    }
}
</style>
