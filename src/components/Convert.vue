<template>
    <div>
        <div class="converter-wrap">
            <select v-model="convertTo">
                <option 
                    v-for="(currentCrypto,index) in crypto"
                    v-bind:key='index'
                    v-bind:value="currentCrypto"
                >{{crypto[index]}}</option>
            </select>
            <input 
                type="number" 
                v-model.number="titleTo"
                placeholder="Введите количество"
            >
            <select v-model="convertIn">
                <option 
                    v-for="(currentCrypto,index) in convertArr"
                    v-bind:key='index'
                >
                {{convertArr[index]}}
                </option>
            </select>
        </div>
            <p class="converter-wrap-p">{{titleTo + ' ' + convertTo + ' = ' + convertedAmount + ' ' + convertIn}}</p>
            <canvas 
                ref="canvas"
                class="canvas"
            ></canvas>
    </div>
</template>
<script>
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins
let moment = require('moment')
export default {
    extends: Line, 
    mixins: [reactiveProp],
    components: {
    },
    data() {
        return {
            chartdata: {
                labels: [],
                datasets: [
                    {
                    label: 'Bitcoin',
                    backgroundColor: '#FF9A3E',
                    data:[]
                    },
                    {
                    label: 'Ethereum ',
                    backgroundColor: '#FFFFFF',
                    data:[]
                    }
                ]
                },
            options: {
                responsive: false,
                maintainAspectRatio: false
            },
            prices:[],
            pricesBTC:[],
            pricesETH:[],
            graphicPrices:[],
            crypto:['Bitcoin','Ethereum'],
            convertArr:['Bitcoin','Ethereum','USD'],
            convertTo: 'Bitcoin',
            convertIn: 'Bitcoin',
            titleTo:1

        }
    },
    methods:{
        timeConverter(UNIX_timestamp){
            let time = moment(UNIX_timestamp).format("DD-MM-YYYY")
            return time;
        },
        chartUpdate: function() {
            this.renderChart(this.chartdata, this.options)
        }
    },
    mounted() {
        fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum&vs_currencies=usd')
        .then(response => response.json())
        .then(json => {
            this.prices = json
        })
        fetch('https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=14')
        .then(response => response.json())
        .then(json => {
            this.graphicPrices = json
            for (let i = 0; i < 14; i++) {
                this.chartdata.labels[i] = this.timeConverter(this.graphicPrices.prices[i*24][0])
                this.pricesETH[i] = this.graphicPrices.prices[i*24][1]
                this.chartdata.datasets[1].data[i] = this.pricesETH[i]
            }
        })
        fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=14')
        .then(response => response.json())
        .then(json => {
            this.graphicPrices = json
            for (let i = 0; i < 14; i++) {
                this.chartdata.labels[i] = this.timeConverter(this.graphicPrices.prices[i*24][0])
                this.pricesBTC[i] = this.graphicPrices.prices[i*24][1]
                this.chartdata.datasets[0].data[i] = this.pricesBTC[i]
            }
            this.chartUpdate()
        }) 
    },
    computed: {
        
        convertedAmount:function() {
            let to = this.convertTo
            let iN = this.convertIn
            let converted
            switch (iN) {
                case 'Bitcoin':
                    if (to == 'Bitcoin'){
                        converted = this.titleTo
                    }
                    if (to == 'Ethereum'){
                        converted = this.titleTo * this.prices.ethereum.usd / this.prices.bitcoin.usd
                    }
                    break;
                case 'Ethereum':
                    if (to == 'Bitcoin'){
                        converted = this.titleTo * this.prices.bitcoin.usd / this.prices.ethereum.usd
                    }
                    if (to == 'Ethereum'){
                        converted = this.titleTo
                    }
                    break;
                case 'USD':
                    if (to == 'Bitcoin'){
                        converted = this.titleTo * this.prices.bitcoin.usd
                    }
                    if (to == 'Ethereum'){
                        converted = this.titleTo * this.prices.ethereum.usd
                    }
                    break;
            }
            return Math.floor(converted*100) / 100
        }
    }
}

</script>
<style>
    .canvas {
        position: abscolute;
        padding-top: 550px;
        padding-left: 650px;
        height: 300px;

    }
    .converter-wrap{
        position: absolute;
        top: 322px;
        left: 606px;
    }
    .converter-wrap > input,select {
        border: none;
        width: 199px;
        height: 49px;

        background: #ECEDF1;
        box-shadow: 10px 10px 20px rgba(166, 171, 189, 0.4), -10px -10px 20px #FAFBFF;
        border-radius: 8px;
        margin: 35px;
        color: #5B5B5B;
        padding-left: 20px;
    }
    .converter-wrap > input {
        border: 1px solid;
    }
    .converter-wrap-p {
        position: absolute;
        top: 452px;
        left: 805px;
        color: #FF9A3E;
        font-family: Consolas;
        font-style: normal;
        font-weight: 500;
        font-size: 30px;
        line-height: 36px;
        /* identical to box height */

        text-transform: uppercase;
    }
</style>