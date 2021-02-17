
<script>
import {Line} from 'vue-chartjs'
  export default {
    extends: Line,
    props: ['chartdata', 'options'],
    mounted () {
      this.renderChart(this.chartdata, this.options)
    }
}
</script>

<style>
  .small {
    max-width: 600px;
    margin:  150px auto;
  }
</style>