<template>
    <div class="dashboard">
        <h2>Chart</h2>
        <LineChart :chartData="testData" :options="options"/>
        <h2>History</h2>
    </div>
</template>

<script>
import { LineChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

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
                    backgroundColor: ["#77CEFF", "#0079AF", "#123E6B", "#97B0C4", "#A5C8ED"],
                    borderColor: "rgb(75, 192, 192)",
                    tension: 0.2,
                    fill: true,
                    showLine: false,
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

<style>
body {
    color: white;
    background-color: white;
}
</style>
