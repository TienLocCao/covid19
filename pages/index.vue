<template>
  <div>
    <page-container>
      <div class="d-flex justify-space-between mt-3 mb-3">
        <div></div>
        <div>
          <base-button
            color="success"
            :disabled="isDisableDetail"
            @click="showModalDetail()"
            >Details</base-button
          >
          <base-button
            color="error"
            :disabled="isDisableDelete"
            @click="showConfirmDelete"
            >Delelte</base-button
          >
        </div>
      </div>
      <base-data-table v-if="isLoadBaseTable" :headers="headers" :items="items">
        <template #header="{ props }">
          <tr class="header-table">
            <th class="w-50 center"></th>
            <th
              v-for="header in props"
              :key="header.text"
              :class="[header.align, header.width]"
            >
              <div>{{ header.text }}</div>
            </th>
          </tr>
        </template>
        <template #item="{ props }">
          <tr class="pointer"  @click="avatar(props.ID)">
            <td>
              <base-checkbox
                hide="true"
                :data="selected.some((val) => val === props.ID)"
              />
            </td>
            <td>
              {{ props.Country }}
            </td>
            <td class="right">
              {{ numberWithCommas(props.TotalConfirmed) }}
            </td>
            <td class="right">
              {{ numberWithCommas(props.TotalDeaths) }}
            </td>
            <td class="right">
              {{ numberWithCommas(props.TotalRecovered) }}
            </td>
          </tr>
        </template>
      </base-data-table>
      <dialog-item-summary :data.sync="dataSend" />
      <dialog-delete-item
        :loading-delete.sync="loadingDelete"
        @delete-item="deleteItem()"
      />
    </page-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BaseDataTable from '@/components/Elements/BaseDataTable.vue'
import BaseCheckbox from '@/components/Elements/BaseCheckbox.vue'
import DialogItemSummary from '@/components/Summary/DialogItemSummary.vue'
import PageContainer from '@/components/Containers/PageContainer.vue'
import BaseButton from '@/components/Elements/BaseButton.vue'
import DialogDeleteItem from '@/components/Common/Dialog/DialogDeleteItem.vue'

export default {
  name: 'IndexPage',
  components: {
    BaseDataTable,
    DialogItemSummary,
    PageContainer,
    BaseCheckbox,
    BaseButton,
    DialogDeleteItem,
  },
  layout: 'index',
  data() {
    return {
      showDialog: false,
      headers: [
        { text: 'Country', value: 'Country', width: 'w-100' },
        {
          text: 'TotalConfirmed',
          value: 'TotalConfirmed',
          align: 'right',
        },
        {
          text: 'TotalDeaths',
          value: 'TotalDeaths',
          align: 'right',
        },
        {
          text: 'TotalRecovered',
          value: 'TotalRecovered',
          align: 'right',
        },
      ],
      dataSend: null,
      selected: [],
      loadingDelete: false,
      items: [],
      isLoadBaseTable: true,
    }
  },
  computed: {
    ...mapGetters({
      itemsSummary: 'summary/items',
      itemCountry: 'country/itemCountry',
    }),
    isDisableDelete() {
      return this.selected.length === 0 || this.loadingDelete
    },
    isDisableDetail() {
      return this.selected.length !== 1;
    }
  },
  watch: {
    itemsSummary(val) {
      let data = val
      if (localStorage.getItem('country-hidden')) {
        const dataLocalStorage = localStorage.getItem('country-hidden')
        const getDataLocalStorage = dataLocalStorage.split(',')
        data = val.filter((item) => !getDataLocalStorage.includes(item.ID))
      }
      this.items = data
    },
    items(val) {
      this.selected = []
      this.isLoadBaseTable = false
      this.$nextTick(() => {
        this.isLoadBaseTable = true
      })
    },
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions({
      fetchSummary: 'summary/fetchSummary',
    }),
    init() {
      this.fetchSummary()
    },
    numberWithCommas(x) {
      return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, '.')
    },
    showModalDetail() {
      this.showDialog = true
      this.dataSend = this.items.filter(f=> f.ID === this.selected[0])[0];
      this.$modal.open({ name: 'summary' })
    },
    avatar(id) {
      if (this.selected.find((val) => val === id)) {
        this.selected = this.selected.filter((val) => val !== id)
      } else {
        this.selected.push(id)
      }
    },
    showConfirmDelete() {
      this.$modal.open({ name: 'delete-item' }, { loading: false })
    },
    deleteItem() {
      const dataLocalStorage = localStorage.getItem('country-hidden')
      if (dataLocalStorage) {
        const dataSendLocalStorage = dataLocalStorage.concat(
          `,${this.selected.toString()}`
        )
        localStorage.setItem('country-hidden', dataSendLocalStorage)
        const converToArray = dataSendLocalStorage.split(',')
        this.items = this.items.filter(
          (item) => !converToArray.includes(item.ID)
        )
      } else {
        const dataHide = this.selected
        localStorage.setItem('country-hidden', dataHide)
        this.items = this.items.filter((item) => !dataHide.includes(item.ID))
      }
      this.loadingDelete = false
    },
  },
}
</script>
