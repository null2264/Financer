<template>
    <div class="dashboard">
        <h2>Chart</h2>
        <LineChart :chart-data="datacollection"></LineChart>
        <h2>History</h2>
    </div>
</template>

<script>
import LineChart from "@/common/components/LineChart.js";

export default {
    name: "Dashboard",
    components: {
        LineChart
    },
    data() {
        return {
            datacollection: null
        }
    },
}
</script>

<style>
body {
    color: white;
    background-color: white;
}
</style>
