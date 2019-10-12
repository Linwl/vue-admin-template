<template>
  <div>
    <Table
      border
      tooltip
      :columns="newcolumns"
      :data="bindDatas"
      :row-class-name="rowClassName"
      @on-selection-change="select"
      width="100%"
    ></Table>
    <br />
    <Page
      :total="total"
      :current="pageNo"
      :page-size="newPageSize"
      :page-size-opts="pageSizeOpts"
      show-sizer
      show-total
      show-elevator
      @on-change="pageChange"
      @on-page-size-change="pageSizeChange"
    />
  </div>
</template>

<script>
export default {
  name: 'TTable',
  props: {
    tableColumns: {
      type: Array,
      default: () => {
        return []
      }
    },
    rowClassName: {
      type: Function
    },
    datas: {
      type: Array,
      default: () => {
        return []
      }
    },
    selectType: {
      type: String,
      default: 'Single'
    },
    page: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageSizeOpts: {
      type: Array,
      default: () => {
        return [10, 20, 30, 40]
      }
    },
    serverUrl: {
      type: String,
      default: ''
    },
    queryParams: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      selectData: [],
      columns: [],
      single: true,
      bindDatas: [],
      pageNo: 1,
      newPageSize: 10,
      total: 0,
      tableWidth: 100
    }
  },
  computed: {
    newcolumns: function() {
      this.columns = Object.assign([], this.tableColumns)
      if (this.selectType == 'Single') {
        this.columns.unshift({
          title: '选中',
          align: 'center',
          key: 'checkBox',
          width: 60,
          render: (h, params) => {
            return h('div', [
              h('Checkbox', {
                props: {
                  value: params.row.checkBox
                },
                on: {
                  'on-change': e => {
                    this.bindDatas.forEach(items => {
                      //先取消所有对象的勾选，checkBox设置为false
                      this.$set(items, 'checkBox', false)
                    })
                    this.bindDatas[params.index].checkBox = e //再将勾选的对象的checkBox设置为true
                    this.selectData = []
                    if (e) {
                      let data = Object.assign({}, this.bindDatas[params.index])
                      delete data.checkBox
                      this.selectData.push(data)
                    }
                  }
                }
              })
            ])
          }
        })
      } else if (this.selectType == 'Multiple') {
        this.columns.unshift({
          type: 'selection',
          width: 60,
          align: 'center'
        })
      }
      return this.columns
    }
  },
  methods: {
    /**
     * 选中行
     */
    select(selection) {
      this.selectData = selection
    },
    pageChange(page) {
      this.pageNo = page
      this.serverGet()
    },
    pageSizeChange(pageSize) {
      this.newPageSize = pageSize
      this.serverGet()
    },
    serverGet(params) {
      let allParams = null
      allParams = Object.assign(
        {
          pageNo: this.pageNo,
          pageSize: this.newPageSize
        },
        this.queryParams
      )
      this.$axios({
        url: this.serverUrl,
        method: 'get',
        params: Object.assign(allParams, params)
      }).then(res => {
        this.bindDatas = res.data
        this.selectData = []
        this.total = res.count
      })
    }
  },
  watch: {
    datas(newVal, oldVal) {
      this.bindDatas = newVal
    },
    page(newVal, oldVal) {
      this.pageNo = newVal
    },
    pageSize(newVal, oldVal) {
      this.newPageSize = newVal
    }
  }
}
</script>

<style scoped>
.ivu-table .demo-table-info-row td {
  background-color: #2db7f5;
  color: #fff;
}
.ivu-table .demo-table-error-row td {
  background-color: #ff6600;
  color: #fff;
}
.ivu-table td.demo-table-info-column {
  background-color: #2db7f5;
  color: #fff;
}
.ivu-table .demo-table-info-cell-name {
  background-color: #2db7f5;
  color: #fff;
}
.ivu-table .demo-table-info-cell-age {
  background-color: #ff6600;
  color: #fff;
}
.ivu-table .demo-table-info-cell-address {
  background-color: #187;
  color: #fff;
}
</style>