<template>
  <div>
    <div class="query-c">
      <Row :gutter="12">
        <Col span="4">
          <Input
            v-model="searchData.projectNum"
            prefix="icon iconfont icon-xiangmu"
            placeholder="请输入项目编号"
            clearable
            style="width: auto"
            @keyup.enter.native="search"
          />
        </Col>
        <Col span="4">
          <Input
            v-model="searchData.processNum"
            prefix="icon iconfont icon-gonghao"
            placeholder="请输入工号"
            clearable
            style="width: auto"
            @keyup.enter.native="search"
          />
        </Col>
        <Col span="4">
          <Input
            v-model="searchData.projectName"
            prefix="icon iconfont icon-xiangmu"
            placeholder="请输入项目名称"
            clearable
            style="width: auto"
            @keyup.enter.native="search"
          />
        </Col>
        <Col span="4">
          <Select v-model="searchData.urgentLevel" filterable clearable>
            <Option
              v-for="item in urgentLevelList"
              :value="item.value"
              :key="item.value"
            >{{ item.label }}</Option>
          </Select>
        </Col>
        <Col span="4">
          <Button type="primary" shape="circle" icon="ios-search" @click="search">查询</Button>
        </Col>
      </Row>
    </div>
    <br />
    <TTable
      ref="baseTable"
      :selectType="tableProperty.selectType"
      :tableColumns="tableProperty.tableColumns"
      :datas="tableProperty.datas"
      :serverUrl="tableProperty.serverUrl"
      :queryParams="tableProperty.queryParams"
    ></TTable>
    <Modal
      v-model="afterSaleOrder.modal"
      :closable="false"
      :title="afterSaleOrder.title"
      :loading="afterSaleOrder.fromLoading"
      width="600px"
      @on-ok="ok"
    >
      <Form
        ref="baseFrom"
        :model="afterSaleOrder.from"
        label-position="left"
        :label-width="120"
        :rules="fromValidate"
      >
        <div v-if="afterSaleOrder.operation == 'Add' ">
          <FormItem label="请选择工号:" prop="processNum">
            <Select
              v-model="afterSaleOrder.from.processNum"
              prefix="icon iconfont icon-xiangmu1"
              clearable
              filterable
              placeholder="请选择工号!"
              style="width:200px"
              @on-change="selectProcedure"
            >
              <Option
                v-for="(item,index) in procedureList"
                :value="item.processNum"
                :key="index"
              >{{ item.processNum}}</Option>
            </Select>
          </FormItem>
          <FormItem label="项目编号:" prop="projectNum">
            <Input
              v-model="afterSaleOrder.from.projectNum"
              placeholder="项目编号"
              prefix="icon iconfont icon-xiangmu"
              disabled
            />
          </FormItem>
          <FormItem label="项目名称:" prop="projectName">
            <Input
              v-model="afterSaleOrder.from.projectName"
              placeholder="项目名称"
              prefix="icon iconfont icon-xiangmu1"
              disabled
            />
          </FormItem>
          <FormItem label="问题描述:" prop="problemDescription">
            <Input
              v-model="afterSaleOrder.from.problemDescription"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 5}"
              placeholder="请输入问题描述!"
            />
          </FormItem>
          <FormItem label="紧急程度:" prop="urgentLevel">
            <Select
              v-model="afterSaleOrder.from.urgentLevel"
              prefix="icon iconfont icon-xiangmu1"
              clearable
              filterable
              placeholder="请选择跟踪单紧急程度!"
              style="width:200px"
            >
              <Option
                v-for="(item,index) in urgentLevelList"
                :value="item.value"
                :key="index"
              >{{ item.label}}</Option>
            </Select>
          </FormItem>
          <FormItem label="跟踪单完成时间:" prop="orderFinishTime">
            <DatePicker
              v-model="afterSaleOrder.from.orderFinishTime"
              type="datetime"
              placeholder="请选择跟踪单完成时间"
              style="width: 200px"
            ></DatePicker>
          </FormItem>
          <FormItem label="是否质保期:" prop="overdueQa">
            <RadioGroup v-model="afterSaleOrder.from.overdueQa">
              <Radio v-for="(item,index) in deliverList" :label="item.value" :key="index">
                <span>{{item.label}}</span>
              </Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="是否缴费:" prop="orderCharge">
            <RadioGroup v-model="afterSaleOrder.from.orderCharge">
              <Radio v-for="(item,index) in deliverList" :label="item.value" :key="index">
                <span>{{item.label}}</span>
              </Radio>
            </RadioGroup>
          </FormItem>
        </div>
        <div v-if="afterSaleOrder.operation == 'Update'">
          <FormItem label="请选择工号:" prop="processNum">
            <Select
              v-model="afterSaleOrder.from.processNum"
              prefix="icon iconfont icon-xiangmu1"
              clearable
              filterable
              placeholder="请选择工号!"
              style="width:200px"
              @on-change="selectProcedure"
              :disabled="createEdited()"
            >
              <Option
                v-for="(item,index) in procedureList"
                :value="item.processNum"
                :key="index"
              >{{ item.processNum}}</Option>
            </Select>
          </FormItem>
          <FormItem label="项目编号:" prop="projectNum">
            <Input
              v-model="afterSaleOrder.from.projectNum"
              placeholder="项目编号"
              prefix="icon iconfont icon-xiangmu"
              disabled
            />
          </FormItem>
          <FormItem label="项目名称:" prop="projectName">
            <Input
              v-model="afterSaleOrder.from.projectName"
              placeholder="项目名称"
              prefix="icon iconfont icon-xiangmu1"
              disabled
            />
          </FormItem>
          <FormItem label="问题描述:" prop="problemDescription">
            <Input
              v-model="afterSaleOrder.from.problemDescription"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 5}"
              placeholder="请输入问题描述!"
              :disabled="createEdited()"
            />
          </FormItem>
          <FormItem label="紧急程度:" prop="urgentLevel">
            <Select
              v-model="afterSaleOrder.from.urgentLevel"
              prefix="icon iconfont icon-xiangmu1"
              clearable
              filterable
              placeholder="请选择跟踪单紧急程度!"
              style="width:200px"
              :disabled="!edited('售后')"
            >
              <Option
                v-for="(item,index) in urgentLevelList"
                :value="item.value"
                :key="index"
              >{{ item.label}}</Option>
            </Select>
          </FormItem>
          <FormItem label="跟踪单完成时间:" prop="orderFinishTime">
            <DatePicker
              v-model="afterSaleOrder.from.orderFinishTime"
              type="datetime"
              placeholder="请选择跟踪单完成时间"
              style="width: 200px"
              :disabled="!edited('售后')"
            ></DatePicker>
          </FormItem>
          <FormItem label="是否质保期:" prop="overdueQa">
            <RadioGroup v-model="afterSaleOrder.from.overdueQa">
              <Radio
                v-for="(item,index) in deliverList"
                :label="item.value"
                :key="index"
                :disabled="!edited('售后')"
              >
                <span>{{item.label}}</span>
              </Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="是否缴费:" prop="orderCharge">
            <RadioGroup v-model="afterSaleOrder.from.orderCharge">
              <Radio
                v-for="(item,index) in deliverList"
                :label="item.value"
                :key="index"
                :disabled="!edited('售后')"
              >
                <span>{{item.label}}</span>
              </Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="问题分析:" prop="problemAnalysis">
            <Input
              v-model="afterSaleOrder.from.problemAnalysis"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 5}"
              placeholder="请输入问题分析!"
              :disabled="!edited('技术')"
            />
          </FormItem>
          <FormItem label="物料报备:" prop="materielPrepared">
            <Input
              v-model="afterSaleOrder.from.materielPrepared"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 5}"
              placeholder="请输入物料报备!"
              :disabled="!edited('技术')"
            />
          </FormItem>
          <FormItem label="生产物料反馈:" prop="productionMaterialFeedback">
            <Input
              v-model="afterSaleOrder.from.productionMaterialFeedback"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 5}"
              placeholder="请输入生产物料反馈!"
              :disabled="!edited(['制造','生产管理'])"
            />
          </FormItem>
          <FormItem label="生产物料完成时间:" prop="productionMaterialFinishTime">
            <DatePicker
              v-model="afterSaleOrder.from.productionMaterialFinishTime"
              type="datetime"
              placeholder="请选择生产物料完成时间"
              style="width: 200px"
              :disabled="!edited(['制造','生产管理'])"
            ></DatePicker>
          </FormItem>
          <FormItem label="采购物料反馈:" prop="purchaseMaterialFeedback">
            <Input
              v-model="afterSaleOrder.from.purchaseMaterialFeedback"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 5}"
              placeholder="请输入采购物料反馈!"
              :disabled="!edited(['采购','生产管理'])"
            />
          </FormItem>
          <FormItem label="采购物料完成时间:" prop="purchaseMaterialFinishTime">
            <DatePicker
              v-model="afterSaleOrder.from.purchaseMaterialFinishTime"
              type="datetime"
              placeholder="请选择采购物料完成时间"
              style="width: 200px"
              :disabled="!edited(['采购','生产管理'])"
            ></DatePicker>
          </FormItem>
          <FormItem label="是否已发货:" prop="delivered">
            <RadioGroup v-model="afterSaleOrder.from.delivered">
              <Radio
                v-for="(item,index) in deliverList"
                :label="item.value"
                :key="index"
                :disabled="!edited('仓库')"
              >
                <span>{{item.label}}</span>
              </Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="售后跟踪单状态:" prop="orderStatus">
            <RadioGroup v-model="afterSaleOrder.from.orderStatus">
              <Radio
                v-for="(item,index) in orderStatusList"
                :label="item.value"
                :key="index"
                :disabled="item.disabled || !edited('售后')"
              >
                <span>{{item.label}}</span>
              </Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="跟踪单处理结果:" prop="orderResult">
            <Input
              v-model="afterSaleOrder.from.orderResult"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 5}"
              placeholder="请输入跟踪单处理结果!"
              :disabled="!edited('售后')"
            />
          </FormItem>
        </div>
        <FormItem label="备注:" prop="remark">
          <Input
            v-model="afterSaleOrder.from.remark"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="请输入备注!"
          />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import TTable from '@/components/common/TTable'
import { mapActions, mapGetters } from 'vuex'
import { getProcedures } from '@/api/procedure.js'
import { isContained, exportWinOpen } from '@/utils/tools.js'
import {
  addAfterSaleOrder,
  updateAfterSaleOrder,
  deleteAfterSaleOrder
} from '@/api/afterSaleOrder.js'
export default {
  name: 'afterSaleOrder',
  components: { TTable },
  beforeMount() {
    this.setBtnEvent({
      //刷新
      zn2lbh4r: () => {
        this.search()
      },
      //新增
      c813cr71: () => {
        this.afterSaleOrder.title = '创建售后跟踪单信息'
        this.afterSaleOrder.operation = 'Add'
        this.afterSaleOrder.fromLoading = true
        this.getProcedureList()
      },
      //修改
      o1a8e4dq: () => {
        let selectData = this.$refs.baseTable.selectData
        if (selectData === undefined || selectData.length === 0) {
          return this.$Message.warning('请选择一项进行修改!')
        }
        this.afterSaleOrder.title = '修改售后跟踪单信息'
        this.afterSaleOrder.operation = 'Update'
        this.afterSaleOrder.fromLoading = true
        this.getProcedureList(selectData[0])
      },
      //删除
      iqiau5va: () => {
        let selectData = this.$refs.baseTable.selectData
        if (selectData === undefined || selectData.length === 0) {
          return this.$Message.warning('请选择一项进行删除!')
        }
        if (selectData[0].orderStatus > 0) {
          return this.$Message.error('该售后跟踪单正在进行处理中,无法删除!')
        }
        this.$Modal.confirm({
          title: '提示',
          content:
            '您确定要删除单号号为<' +
            '<span style="color:red"> <strong>' +
            selectData[0].orderNo +
            ' </strong></span>' +
            '>的售后跟踪单信息?',
          loading: true,
          onOk: () => {
            deleteAfterSaleOrder({
              id: selectData[0].id,
              orderNo: selectData[0].orderNo
            }).then(res => {
              this.$Message.info('删除售后跟踪单信息成功!')
              this.$refs.baseFrom.resetFields()
              this.afterSaleOrder.from.id = ''
              this.search()
              this.$Modal.remove()
            })
          }
        })
      },
      //导出
      '98spd38b': () => {
        exportWinOpen(this.searchData, 'mrp/afterSaleOrder/export')
      }
    })
  },
  mounted() {
    this.search()
  },
  data() {
    const validateMessage = (rule, value, callback) => {
      switch (rule.fullField) {
        case 'productionMaterialFeedback':
          if (value === '' && this.edited(['制造', '生产管理'])) {
            callback(new Error('请输入生产物料反馈!'))
          } else {
            callback()
          }
          break
        case 'purchaseMaterialFeedback':
          if (value === '' && this.edited(['采购', '生产管理'])) {
            callback(new Error('请输入采购物料反馈!'))
          } else {
            callback()
          }
          break
        case 'problemAnalysis':
          if (value === '' && this.edited('技术')) {
            callback(new Error('请输入问题分析!'))
          } else {
            callback()
          }
          break
        case 'materielPrepared':
          if (value === '' && this.edited('技术')) {
            callback(new Error('请输入物料报备!'))
          } else {
            callback()
          }
          break
        case 'productionMaterialFinishTime':
          if (
            (value === null || value === '') &&
            this.edited(['制造', '生产管理'])
          ) {
            callback(new Error('请输入生产物料反馈完成时间!'))
          } else if (value > this.afterSaleOrder.from.orderFinishTime) {
            callback(
              new Error('请输入少于跟踪单完成时间的生产物料反馈完成时间!')
            )
          } else {
            callback()
          }
          break
        case 'purchaseMaterialFinishTime':
          if (
            (value === null || value === '') &&
            this.edited(['采购', '生产管理'])
          ) {
            callback(new Error('请输入采购物料反馈完成时间!'))
          } else if (value > this.afterSaleOrder.from.orderFinishTime) {
            callback(
              new Error('请输入少于跟踪单完成时间的采购物料反馈完成时间!')
            )
          } else {
            callback()
          }
          break
      }
    }
    return {
      searchData: {
        projectNum: '',
        projectName: '',
        processNum: '',
        orderNo: '',
        orderStatus: null,
        urgentLevel: null
      },
      tableProperty: {
        selectType: 'Single',
        queryParams: null,
        serverUrl: '/mrp/afterSaleOrder/getAfterSaleOrders',
        tableColumns: [
          {
            title: '售后单号',
            key: 'orderNo',
            width: 180
          },
          {
            title: '项目名称',
            key: 'projectName',
            width: 150
          },
          {
            title: '项目编号',
            key: 'projectNum',
            width: 150
          },
          {
            title: '工号',
            key: 'processNum',
            width: 150
          },
          {
            title: '问题描述',
            key: 'problemDescription',
            minWidth: 150
          },
          {
            title: '问题分析',
            key: 'problemAnalysis',
            minWidth: 150
          },
          {
            title: '紧急程度',
            key: 'urgentLevel',
            width: 100,
            render: (h, params) =>
              h(
                'Tag',
                {
                  props: {
                    color:
                      params.row.urgentLevel == 0
                        ? '#92D14E'
                        : params.row.urgentLevel == 1
                        ? '#EB4E3D'
                        : params.row.urgentLevel == 2
                        ? '#E20304'
                        : '#2D8CF0'
                  }
                },
                params.row.urgentLevel == 0
                  ? '一般'
                  : params.row.urgentLevel == 1
                  ? '急'
                  : '特急'
              )
          },
          {
            title: '物料报备',
            key: 'materielPrepared',
            minWidth: 150
          },
          {
            title: '订单状态',
            key: 'orderStatus',
            width: 100,
            render: (h, params) =>
              h(
                'Tag',
                {
                  props: {
                    color:
                      params.row.orderStatus == 0
                        ? '#2D8CF0'
                        : params.row.orderStatus == 1
                        ? '#F2B74F'
                        : params.row.orderStatus == 2
                        ? '#92D14E'
                        : '#2D8CF0'
                  }
                },
                params.row.orderStatus == 0
                  ? '创建'
                  : params.row.orderStatus == 1
                  ? '处理中'
                  : params.row.orderStatus == 2
                  ? '已完成'
                  : '未知'
              )
          },
          {
            title: '处理结果',
            key: 'orderResult',
            minWidth: 150
          },
          {
            title: '质保期',
            key: 'overdueQa',
            width: 100,
            render: (h, params) =>
              h(
                'Tag',
                {
                  props: {
                    color:
                      params.row.overdueQa == 0
                        ? '#EB4E3D'
                        : params.row.overdueQa == 1
                        ? '#92D14E'
                        : '#92D14E'
                  }
                },
                params.row.overdueQa == 0
                  ? '已过期'
                  : params.row.overdueQa == 1
                  ? '未过期'
                  : '未知'
              )
          },
          {
            title: '是否收费',
            key: 'orderCharge',
            width: 80,
            render: (h, params) =>
              h(
                'Tag',
                {
                  props: {
                    color:
                      params.row.orderCharge == 0
                        ? '#EB4E3D'
                        : params.row.orderCharge == 1
                        ? '#92D14E'
                        : '#92D14E'
                  }
                },
                params.row.orderCharge == 0
                  ? '否'
                  : params.row.orderCharge == 1
                  ? '是'
                  : '未知'
              )
          },
          {
            title: '是否已发货',
            key: 'delivered',
            width: 80,
            render: (h, params) =>
              h(
                'Tag',
                {
                  props: {
                    color:
                      params.row.delivered == 0
                        ? '#EB4E3D'
                        : params.row.delivered == 1
                        ? '#92D14E'
                        : '#EB4E3D'
                  }
                },
                params.row.delivered == 0
                  ? '否'
                  : params.row.delivered == 1
                  ? '是'
                  : '未知'
              )
          },
          {
            title: '生产物料反馈',
            key: 'productionMaterialFeedback',
            minWidth: 150
          },
          {
            title: '采购物料反馈',
            key: 'purchaseMaterialFeedback',
            minWidth: 150
          },
          {
            title: '订单完成时间',
            key: 'orderFinishTime',
            width: 150
          },
          {
            title: '生产物料完成时间',
            key: 'productionMaterialFinishTime',
            width: 150
          },
          {
            title: '采购物料完成花间',
            key: 'purchaseMaterialFinishTime',
            width: 150
          },
          {
            title: '创建时间',
            key: 'createTime',
            width: 150
          },
          {
            title: '备注',
            key: 'remark',
            minWidth: 150
          }
        ],
        datas: []
      },
      afterSaleOrder: {
        modal: false,
        title: '',
        operation: 'Add',
        fromLoading: true,
        from: {
          id: '',
          projectNum: '',
          projectName: '',
          processNum: '',
          problemDescription: '',
          problemAnalysis: '',
          urgentLevel: 0,
          materielPrepared: '',
          orderResult: '',
          overdueQa: 0,
          orderCharge: 0,
          delivered: 0,
          orderStatus: 0,
          productionMaterialFeedback: '',
          purchaseMaterialFeedback: '',
          orderFinishTime: null,
          productionMaterialFinishTime: null,
          purchaseMaterialFinishTime: null,
          createTime: null,
          remark: ''
        }
      },
      fromValidate: {
        processNum: [
          {
            required: true,
            message: '请选择工号!',
            trigger: 'change'
          }
        ],
        urgentLevel: [
          {
            required: true,
            type: 'number',
            message: '请选择紧急程度!',
            trigger: 'change'
          }
        ],
        problemDescription: [
          {
            required: true,
            message: '请输入问题描述',
            trigger: 'blur'
          }
        ],
        orderFinishTime: [
          {
            required: true,
            type: 'date',
            message: '请选择跟踪单完成时间!',
            trigger: 'change'
          }
        ],
        productionMaterialFeedback: [
          {
            required: true,
            validator: validateMessage,
            trigger: 'blur'
          }
        ],
        problemAnalysis: [
          { required: true, validator: validateMessage, trigger: 'blur' }
        ],
        productionMaterialFinishTime: [
          {
            required: true,
            validator: validateMessage,
            trigger: 'change'
          }
        ],
        purchaseMaterialFeedback: [
          {
            required: true,
            validator: validateMessage,
            trigger: 'blur'
          }
        ],
        purchaseMaterialFinishTime: [
          {
            required: true,
            validator: validateMessage,
            trigger: 'change'
          }
        ],
        materielPrepared: [
          {
            required: true,
            validator: validateMessage,
            trigger: 'blur'
          }
        ]
      },
      procedureList: [],
      urgentLevelList: [
        {
          label: '一般',
          value: 0
        },
        {
          label: '急',
          value: 1
        },
        {
          label: '特急',
          value: 2
        }
      ],
      deliverList: [{ label: '是', value: 1 }, { label: '否', value: 0 }],
      orderStatusList: [
        { label: '创建中', value: 0, disabled: true },
        { label: '处理中', value: 1 },
        { label: '已完成', value: 2 }
      ]
    }
  },
  methods: {
    ...mapActions({
      setBtnEvent: 'btnsetting/setBtnEvent'
    }),
    ok() {
      this.$refs.baseFrom.validate(valid => {
        if (valid) {
          if (this.afterSaleOrder.operation == 'Add') {
            addAfterSaleOrder(this.createOrder()).then(res => {
              this.$Message.info('增加售后跟踪单信息成功!')
              this.afterSaleOrder.modal = false
              this.search()
              this.$refs.baseFrom.resetFields()
              this.afterSaleOrder.from.id = ''
            })
          } else if (this.afterSaleOrder.operation == 'Update') {
            updateAfterSaleOrder(this.createOrder()).then(res => {
              this.$Message.info('修改售后跟踪信息成功!')
              this.afterSaleOrder.modal = false
              this.search()
              this.$refs.baseFrom.resetFields()
              this.afterSaleOrder.from.id = ''
            })
          } else {
            this.$Message.error('无法识别的操作!')
          }
        } else {
          this.$Message.error('请输入必填项!')
          this.afterSaleOrder.fromLoading = false
        }
      })
    },
    /**
     * 创建订单数据
     */
    createOrder() {
      let order = Object.assign({}, this.afterSaleOrder.from)
      order.orderFinishTime = this.formatTime(
        this.afterSaleOrder.from.orderFinishTime
      )
      order.productionMaterialFinishTime = this.formatTime(
        this.afterSaleOrder.from.productionMaterialFinishTime
      )
      order.purchaseMaterialFinishTime = this.formatTime(
        this.afterSaleOrder.from.purchaseMaterialFinishTime
      )
      order.createTime = this.formatTime(this.afterSaleOrder.from.createTime)
      return order
    },
    formatTime(sorceTime) {
      if (sorceTime != null) {
        return this.$moment(sorceTime).format('YYYY-MM-DD HH:MM:SS')
      }
      return null
    },
    search() {
      this.tableProperty.queryParams = this.searchData
      this.$refs.baseTable.serverGet()
    },
    /**
     * 获取项目编号
     */
    async getProcedureList(selectData) {
      let res = await getProcedures({
        pageNo: 1,
        pageSize: 500
      })
      this.procedureList = res.data
      if (selectData != null) {
        this.afterSaleOrder.from = selectData
      }
      this.afterSaleOrder.modal = true
    },
    selectProcedure(processNum) {
      if (processNum != null) {
        let procedure = this.procedureList.find(p => p.processNum == processNum)
        if (procedure != null) {
          this.afterSaleOrder.from.projectNum = procedure.projectNum
          this.afterSaleOrder.from.projectName = procedure.projectName
        }
      } else {
        this.afterSaleOrder.from.projectNum = ''
        this.afterSaleOrder.from.projectName = ''
      }
    },
    /**
     * 根据角色选择显示内容
     */
    edited(roles) {
      //TODO:判断登录用户是否管理员用户
      if (this.userInfo.userLevel <= 1) {
        return true
      }
      let display = false
      if (roles instanceof Array) {
        display = isContained(roles, this.roleList, null, true)
      } else {
        display = this.getRoleEdited(roles)
      }
      return display
    },
    getRoleEdited(roleName) {
      let display = false
      let role = this.roleList.find(r => r.indexOf(roleName) != -1)
      if (role != null) {
        display = true
      } else {
        display = false
      }
      return display
    },
    createEdited() {
      let edited = true
      edited = this.edited('售后')
      if (edited) {
        //TODO:跟踪单必须创建状态才可编辑
        edited = this.afterSaleOrder.from.orderStatus == 0
      }
      return !edited
    }
  },
  computed: {
    ...mapGetters(['token', 'roleList', 'userInfo'])
  }
}
</script>

<style scoped>
</style>