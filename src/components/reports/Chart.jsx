/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import {Bar} from 'react-chartjs-2';
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip,} from 'chart.js';
import {useEffect, useState} from "react";

// Chart.js 설정
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const Chart = ({chart}) => {

    const labels = [];
    const initSales = {'1월' : 0, '2월' : 0, '3월' : 0, '4월' : 0, '5월' : 0, '6월' : 0, '7월' : 0, '8월' : 0, '9월' : 0, '10월' : 0, '11월' : 0, '12월' : 0};
    const [sales, setSales] = useState(initSales);
    const chartData = () => {
        const chartData = {...sales};
        chart.forEach(data => {
            if(data.month !== 0){
                chartData[data.month+'월'] = data.sales;
            }
        })
        setSales(chartData);
    }
    useEffect(() => {
        chartData();
    }, [chart]);


    const data = {
        labels: labels,
        datasets: [
            {
                label: '월별 매출',
                data: sales,
                backgroundColor: [
                    'rgba(0, 79, 72, 0.5)',
                    'rgba(0, 79, 72, 0.7)',
                    'rgba(56, 118, 112, 0.7)',
                    'rgba(97, 146, 141, 0.9)',
                    'rgba(97, 146, 141, 0.9)',
                    'rgba(108, 153, 149, 0.7)',
                    'rgba(108, 153, 149, 1.0)',
                    'rgba(108, 153, 149, 0.7)',
                    'rgba(149, 181, 178, 0.6)',
                    'rgba(185, 206, 204, 0.8)',
                    'rgba(108, 153, 149, 0.8)',
                    'rgba(149, 181, 178, 0.7)',

                ],
                borderColor: [
                    'rgb(107,152,148)',
                ],
                borderWidth: 0,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: '월별 매출 현황',
            },
        },
    };

    return <Bar data={data} options={options}/>;
};

export default Chart;
