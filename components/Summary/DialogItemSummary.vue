<template>
  <div>
    <v-modal name="summary" class="dialog-products">
      <div v-if="!!items">
        <p class="fs--heading-3 mb-3">DETAILS Country {{ data && data.Country }}</p>
        <table-country :items="items" />
        <apexchart v-if="isShowApexchart" height="200" type="line" :options="chartOptions" :series="series"/>
      </div>
    </v-modal>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
import VueApexCharts from "vue-apexcharts";
import Vue from "vue";
import TableCountry from '@/components/Summary/TableCountry.vue';
Vue.use(require("vue-moment"));

export default {
  components: {
      apexchart: VueApexCharts,
      TableCountry
  },
  props: {  
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      items: null,
      isShowApexchart: true,
      isShowTable: true,
      chartOptions: {
        xaxis: {
          type: "datetime",
          labels: {
            formatter(val, timestamp) {
              return Vue.moment(timestamp).format("YYYY/MM/DD");
            }
          },
          categories: [],
        },
        yaxis: {
          labels: {
            formatter (value) {
              return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            }
          },
        },
        tooltip: {
          x: {
            format: "yyyy/MM/dd",
            formatter: undefined
          }
        },
        colors:['#2983FF', '#00e396', '#D7263D'],
        noData: {
          text: "Please just a moment",
          align: "center",
          verticalAlign: "middle",
        },
      },
      series: [
        {
          name: "Confirmed",
          data: []
        },
        {
          name: "Recovered",
          data: []
        },
        {
          name: "Deaths",
          data: []
        },
      ]
    }
  },
  computed: {
    ...mapGetters({
      itemCountry: 'country/itemCountry',
    }),
    computedData: {
      get() {
        return this.data;
      },
      set(value) {
        this.$emit("update:data", value);
      }
    }
  },
  watch: {
    itemCountry(val) {
      setTimeout(this.handleDataChart(val), 500);
      this.isLoadChart();
    },
    data(val) {
      this.items = null;
      this.resetState();
      this.init();
    },
    items(val) {
      this.isLoadTable();
    }
  },
  methods: {
    ...mapActions({
      fetchListCountry: 'country/fetchListCountry',
      resetState: 'country/resetState',
    }),
    async init() {
      this.items = await axios
        .get(`https://restcountries.com/v3.1/name/${this.data.CountryCode}`)
        .then((response) => {
          return response.data.filter(f=>f.name.common === this.data.Country || f.name.official.toLowerCase().includes(this.data.Country.toLowerCase()) || f.name.common.toLowerCase().includes(this.data.Slug.toLowerCase()));
        }).catch((err)=> {
          // eslint-disable-next-line no-console
          console.error(err);
          this.$modal.loading(false);
        })

      setTimeout(() => {
        this.$modal.loading(false);
      }, 1500)
      this.fetchListCountry(this.data.Slug);
    },
    handleDataChart(data) {
      this.chartOptions.xaxis.categories = data.map(m => m.Date);
      this.series[0].data = data.map(m => m.Confirmed);
      this.series[1].data = data.map(m => m.Recovered);
      this.series[2].data = data.map(m => m.Deaths);
    },
    isLoadChart() {
      this.isShowApexchart = false;
      this.$nextTick(() => {
        this.isShowApexchart = true;
      });
    },
    isLoadTable() {
      this.isShowTable = false;
      this.$nextTick(() => {
        this.isShowTable = true;
      });
    },
    close() {
      this.computedData = null;
      this.items = null;
      this.$modal.close({ name: 'summary' })
    },
  },
}
</script>


<style lang="scss">
  .dialog-products {
    &__table {
      width: 100%;
      display: table;
      border: 1px solid #ccc;
      tr:nth-child(even) {
        background-color: #f3f3f3;
      }
      td {
        &:first-child {
          width: 140px;
        }
        padding: 6px;
      }
      .flags img {
        display: flex;
        align-items: center;
      }
    }
    @media screen and (max-width: 750px) {
      .modal__body {
        width: 94vw !important;
        margin: 0 auto;
      }
    }
  }
</style>
