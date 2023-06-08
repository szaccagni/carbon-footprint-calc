import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({zipCodeData}) {
    const chartData = {
        labels: ['transportation', 'housing', 'food', 'goods', 'services'],
        datasets: [
            {
                data: [zipCodeData.transport, zipCodeData.housing, zipCodeData.food, zipCodeData.goods, zipCodeData.services],
                backgroundColor: ['#AED581', '#FFD54F', '#81D4FA', '#FFB74D', '#BDBDBD'],
                hoverBorderColor: ['#AED581', '#FFD54F', '#81D4FA', '#FFB74D', '#BDBDBD']
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