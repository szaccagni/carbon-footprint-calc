import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({zipCodeData}) {
    const chartData = {
        labels: ['transportation', 'housing', 'food', 'goods', 'services'],
        datasets: [
            {
                data: [zipCodeData.transport, zipCodeData.housing, zipCodeData.food, zipCodeData.goods, zipCodeData.services],
                backgroundColor: ['#2196F3', '#4CAF50', '#FF9800', '#9E9E9E', '#9C27B0'],
                hoverBorderColor: ['#2196F3', '#4CAF50', '#FF9800', '#9E9E9E', '#9C27B0']
            }
        ]
    }

    return (
        <div className="pie-chart-container">
        <Pie
            data={chartData}
            options={{
            responsive: true,
            maintainAspectRatio: false, 
            plugins: {
                legend: {
                    labels: {
                        font: {
                        size: 16
                        },
                        color: 'white'
                    },
                    position : 'right',
                    align: 'center'
                }, 
            }
            }}
        />
        </div>
    )

}