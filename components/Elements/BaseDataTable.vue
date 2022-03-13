<template>
  <div class="table">
    <table class="styled-table fs--small-1">
      <thead>
        <slot name="header" :props="headers">
          <tr>
            <template v-for="header in headers">
              <slot
                :name="!!header.value ? `header.${header.value}` : ''"
                :header="header"
              >
                <th :key="header.value" :class="[header.align, header.width]">
                  <div
                    v-if="header.method"
                    class="pointer"
                    @click="header.method"
                  >
                    {{ header.text
                    }}<svg
                      class="icon-sort"
                      width="24"
                      height="35"
                      viewBox="0 0 24 35"
                      fill="none"
                    >
                      <path d="M7 14L12 9L17 14H7Z" fill="#fff"></path>
                      <path d="M17 21L12 26L7 21L17 21Z" fill="#fff"></path>
                    </svg>
                  </div>
                  <div v-else>{{ header.text }}</div>
                </th>
              </slot>
            </template>
          </tr>
        </slot>
      </thead>
      <tbody>
        <slot name="body" :props="items">
          <template v-for="(item, itemIndex) in items">
            <slot name="item" :props="item">
              <tr :key="`styled-table-item-row-${itemIndex}`">
                <td
                  v-for="(header, headerIndex) in sortedHeaders"
                  :key="`base-data-table-cell-${headerIndex}`"
                  :col="header.columnName"
                  class="base-data-table__cell"
                  :class="[header.align]"
                >
                  <slot
                    :name="!!header.value ? `item.${header.value}` : ''"
                    :item="item"
                    :header="header"
                  >
                    {{ header.value ? item[header.value] : '' }}
                  </slot>
                </td>
              </tr>
            </slot>
          </template>
        </slot>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'BaseDataTablePage',
  props: {
    headers: {
      type: Array,
      required: true,
      default: () => [],
      validator: (headers) => {
        return headers.findIndex((header) => header.value == null) < 0
      },
    },
    items: { type: Array, required: true, default: () => [] },
  },

  computed: {
    sortedHeaders() {
      const headers = [...this.headers]
      headers.sort((currentHeader, nextHeader) => {
        let currentHeaderOrder = 0
        let nextHeaderOrder = 0

        if (this.isMobile) {
          currentHeaderOrder = (currentHeader.mobile || {}).order || 0
          nextHeaderOrder = (nextHeader.mobile || {}).order || 0
        } else {
          currentHeaderOrder = currentHeader.order || 0
          nextHeaderOrder = nextHeader.order || 0
        }

        return currentHeaderOrder - nextHeaderOrder
      })

      return headers
    },
  },
}
</script>

<style lang="scss">
.table {
  overflow: auto;
}
.styled-table {
  border-collapse: collapse;

  font-family: sans-serif;
  width: 100%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}
.styled-table thead tr {
  background-color: #009879;
  color: #ffffff;
  text-align: left;
}
.styled-table thead .pointer {
  display: flex;
  align-items: center;
}
.styled-table thead .txt-center .pointer {
  justify-content: center;
}
.styled-table th,
.styled-table td {
  padding: 12px 15px;
}

.styled-table tbody tr {
  border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.styled-table tbody tr:last-of-type {
  border-bottom: 2px solid var(--primary03);
}
.styled-table tbody tr.active-row {
  font-weight: bold;
  color: var(--primary03);
}

.styled-table tbody tr td.image {
  width: 100px;
  height: auto;
  img {
    width: 100%;
  }
}

.styled-table .right {
    text-align: right;
}
.styled-table .center {
    text-align: center;
}
</style>
