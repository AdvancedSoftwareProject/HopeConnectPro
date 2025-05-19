const axios = require("axios");
const Revenue = require("../models/revenue");

const generateRevenueChart = async () => {
  try {
    
    const revenueData = await Revenue.findAll({
      attributes: ["source", "amount"],
    });

    
    const chartMap = {};

    for (const row of revenueData) {
      const source = row.source;
      const amount = parseFloat(row.amount);
      chartMap[source] = (chartMap[source] || 0) + amount;
    }

    const labels = Object.keys(chartMap);
    const values = Object.values(chartMap);

    
    const chartConfig = {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Revenue by Source",
            data: values,
            backgroundColor: "rgba(75,192,192,0.6)",
          },
        ],
      },
    };

    
    const response = await axios.post("https://quickchart.io/chart/create", {
      chart: chartConfig,
    });

    
    const chartUrl = response.data.url;
    return { success: true, chartUrl };

  } catch (error) {
    console.error("❌ Error generating revenue chart:", error.message);
    return { success: false, error: error.message };
  }
};

module.exports = { generateRevenueChart };
