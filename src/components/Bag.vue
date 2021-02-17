<template>
    <div>
        <div class="inputs-wrapper">
            <div class="first-inputs">
                <p>Bitcoin</p>
                <input
                    type="number"
                    placeholder="Bitcoin"
                    v-model.number="btcAmount"
                >
                <p>Plus/Minus amount</p>
                <input
                    type="number"
                    placeholder="Plus value"
                    v-model.number="plusBTC"
                >
                <p>Total amount: {{finalBTC}} BTC</p>
            </div>
            <div class="second-inputs">
                 <p>Ethereum</p>
                <input
                    type="number"
                    placeholder="Bitcoin"
                    v-model.number="ethAmount"
                >
                <p>Plus/Minus amount</p>
                <input
                    type="number"
                    placeholder="Plus value"
                    v-model.number="plusETH"
                >
                <p>Total amount: {{finalETH}} ETH</p>
            </div>
            <div class="total"> Total In USD = {{(this.btcAmount + this.plusBTC)*this.btcPrice}}$(BTC) + {{(this.ethAmount + this.plusETH)*this.ethPrice}}$(ETH) = {{Math.floor(finalUSD*100)/100}} $</div>
        </div>
        <canvas ref="canvas" class="pie"></canvas>
    </div>
</template>
<script>
import { Pie, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins
export default {
    extends: Pie, 
    mixins: [reactiveProp],
    data() {
        return {
            btcAmount:1,
            ethAmount:1,
            plusBTC:0,
            plusETH:0,
            btcPrice:0,
            ethPrice:0,
            Final:2,
            chartdata: {
                labels: ['Ethereum','Bitcoin'],
                datasets: [{
                    label: '# of Votes',
                    data: [],
                    backgroundColor: [
                        'rgba(255, 255, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 255, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: false,
                responsiveAnimationDuration: 0,
                animation: {
                    duration: 0
                },
                devicePixelRatio:1
            }
        }
    },
    mounted() {
        fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum&vs_currencies=usd')
        .then(response => response.json())
        .then(json => {
            this.prices = json
            this.btcPrice = this.prices.bitcoin.usd
            this.ethPrice = this.prices.ethereum.usd
            this.inUSD = this.btcPrice + this.ethPrice
            this.chartdata.datasets[0].data[0] = this.ethAmount
            this.chartdata.datasets[0].data[1] = this.btcAmount
            this.renderChart(this.chartdata, this.options)
        })
    },
    watch: {
        btcAmount: function(){
            this.chartdata.datasets[0].data[1] = this.finalBTC
            this.renderChart(this.chartdata, this.options)
        },
        ethAmount: function(){
            this.chartdata.datasets[0].data[0] = this.finalETH
            this.renderChart(this.chartdata, this.options)
        },
        plusBTC: function(){
            this.chartdata.datasets[0].data[1] = this.finalBTC
            this.renderChart(this.chartdata, this.options)
        },
        plusETH: function(){
            this.chartdata.datasets[0].data[0] = this.finalETH
            this.renderChart(this.chartdata, this.options)
        }
    },
    computed: {
        finalBTC: function() {
            
            return this.btcAmount + this.plusBTC
        },
        finalETH: function() {
            return this.ethAmount + this.plusETH
        },
        finalUSD: function() {
            return (this.btcAmount + this.plusBTC)*this.btcPrice + (this.ethAmount + this.plusETH)*this.ethPrice
        }
    }
}
</script>
<style>
    .first-inputs {
        position: absolute;
        top: 300px;
        left: 400px;
    }
    .first-inputs > p, input {
        margin: 15px;
        color: #5B5B5B;
    }
    .first-inputs >  input {
        width: 199px;
        height: 49px;
        border: 1px solid;
        font-family: Consolas;
        font-style: normal;
        font-weight: 500;
        background: #ECEDF1;
        box-shadow: 10px 10px 20px rgba(166, 171, 189, 0.4), -10px -10px 20px #FAFBFF;
        border-radius: 8px;
        color: #5B5B5B;
        padding-left: 20px;
    }
    .first-inputs > p {
        font-family: Consolas;
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 36px;
        /* identical to box height */

        text-transform: uppercase;
    }
    .second-inputs {
        position: absolute;
        top: 300px;
        left: 1300px;
    }
    .second-inputs > p, input {
        margin: 15px;
        color: #5B5B5B;
    }
    .second-inputs >  input {
        border: 1px solid;
        width: 199px;
        height: 49px;
        
        font-family: Consolas;
        font-style: normal;
        font-weight: 500;
        background: #ECEDF1;
        box-shadow: 10px 10px 20px rgba(166, 171, 189, 0.4), -10px -10px 20px #FAFBFF;
        border-radius: 8px;
        color: #5B5B5B;
        padding-left: 20px;
    }
    .second-inputs > p {
        font-family: Consolas;
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 36px;
        /* identical to box height */

        text-transform: uppercase;
    }
    .total {
        position: absolute;
        top: 752px;
        left: 525px;
        color: #FF9A3E;
        font-family: Consolas;
        font-style: normal;
        font-weight: 500;
        font-size: 30px;
        line-height: 36px;
        /* identical to box height */

        text-transform: uppercase;
    }
    .pie {
        width: 300px;
        position: absolute;
        top: 400px;
        left: 800px;
        padding: 10px;
        box-shadow: inset 10px 10px 20px rgba(166, 171, 189, 0.2), inset -10px -10px 20px rgba(166, 171, 189, 0.2);
        border-radius: 8px;
    }
</style>