<template>
  <div>
    <Upload
      ref="upload"
      :action="improtUrl"
      style="display: none"
      :on-success="uploadSuccess"
      :on-error="uploadFail"
      :format="['xlsx','xls','csv']"
      :on-format-error="handleFormatError"
    />
    <div class="query-c">
      <Row :gutter="12">
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
            v-model="searchData.projectNum"
            prefix="icon iconfont icon-xiangmu1"
            placeholder="请输项目编号"
            clearable
            style="width: auto"
            @keyup.enter.native="search"
          />
        </Col>
        <Col span="4">
          <Input
            v-model="searchData.deviceName"
            prefix="icon iconfont icon-shebei"
            placeholder="请输入设备名称"
            clearable
            style="width: auto"
            @keyup.enter.native="search"
          />
        </Col>
        <Col span="4">
          <Input
            v-model="searchData.processEngineer"
            prefix="icon iconfont icon-huaban-"
            placeholder="请输入负责工程师"
            clearable
            style="width: auto"
            @keyup.enter.native="search"
          />
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
      v-model="procedure.modal"
      :closable="false"
      :title="procedure.title"
      :loading="procedure.fromLoading"
      width="600px"
      @on-ok="ok"
    >
      <Form
        ref="baseFrom"
        :model="procedure.from"
        label-position="left"
        :label-width="100"
        :rules="fromValidate"
      >
        <FormItem label="工号" prop="processNum">
          <Input
            v-model="procedure.from.processNum"
            clearable
            placeholder="请输入工号!"
            prefix="icon iconfont icon-gonghao"
          />
        </FormItem>
        <FormItem label="所属项目:" prop="selectPproject">
          <Select
            v-model="procedure.from.selectPproject"
            prefix="icon iconfont icon-xiangmu1"
            clearable
            filterable
            placeholder="请选择所属项目!"
            style="width:200px"
          >
            <Option
              v-for="(item,index) in projectList"
              :value="item.projectNum +'#'+item.projectName "
              :key="index"
            >{{ item.projectNum+'-'+item.projectName }}</Option>
          </Select>
        </FormItem>
        <FormItem label="设备名称:" prop="deviceName">
          <Input
            v-model="procedure.from.deviceName"
            clearable
            placeholder="请输入设备名称!"
            prefix="icon iconfont icon-shebei"
          />
        </FormItem>
        <FormItem label="负责工程师:" prop="processEngineer">
          <Input
            v-model="procedure.from.processEngineer"
            clearable
            placeholder="请输入工程师名字!"
            prefix="icon iconfont icon-huaban-"
          />
        </FormItem>
        <FormItem label="备注" prop="remark">
          <Input
            v-model="procedure.from.remark"
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
import {
  addProcedure,
  updateProcedure,
  deleteProcedure
} from '@/api/procedure.js'
import { exportWinOpen } from '@/utils/tools.js'
import { getProjects } from '@/api/project.js'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'processData',
  components: { TTable },
  beforeMount() {
    this.setBtnEvent({
      //刷新
      t3g3vhm6: () => {
        this.search()
      },
      //增加
      '9txpu5u2': () => {
        this.procedure.title = '增加工号信息'
        this.procedure.operation = 'Add'
        this.procedure.fromLoading = true
        this.getProjectList()
      },
      //修改
      s4hf40up: () => {
        let selectData = this.$refs.baseTable.selectData
        if (selectData === undefined || selectData.length === 0) {
          return this.$Message.warning('请选择一项进行修改!')
        }
        this.procedure.title = '修改工号信息'
        this.procedure.operation = 'Update'
        this.procedure.from = selectData[0]
        this.procedure.fromLoading = true
        this.getProjectList()
      },
      //删除
      zgbmxbjz: () => {
        let selectData = this.$refs.baseTable.selectData
        if (selectData === undefined || selectData.length === 0) {
          return this.$Message.warning('请选择一项进行删除!')
        }
        this.$Modal.confirm({
          title: '提示',
          content:
            '您确定要删除工号为<' +
            '<span style="color:red"> <strong>' +
            selectData[0].processNum +
            ' </strong></span>' +
            '>的工号信息?',
          loading: true,
          onOk: () => {
            deleteProcedure({ id: selectData[0].id }).then(res => {
              this.$Message.info('删除工号信息成功!')
              this.search()
              this.$Modal.remove()
            })
          }
        })
      },
      //导入
      zz66avww: () => {
        this.$refs.upload.handleClick()
      },
      //导出
      hh47xyq8: () => {
        exportWinOpen(this.searchData, 'mrp/procedure/export')
      },
      //导出模板
      '51v2eepc': () => {
        exportWinOpen(null, 'mrp/procedure/exportTemplate')
      }
    })
  },
  computed: {
    ...mapGetters(['token']),
    improtUrl() {
      return (
        process.env.VUE_APP_BASE_API +
        'mrp/procedure/upload?API-Token=' +
        this.token
      )
    }
  },
  mounted() {
    this.search()
  },
  data() {
    return {
      searchData: {
        processNum: '',
        projectNum: '',
        deviceName: '',
        processEngineer: ''
      },
      tableProperty: {
        selectType: 'Single',
        queryParams: null,
        serverUrl: '/mrp/procedure/getProcedures',
        tableColumns: [
          {
            title: '工号',
            key: 'processNum',
            width: 150
          },
          {
            title: '项目编号',
            key: 'projectNum',
            width: 150
          },
          {
            title: '项目名称',
            key: 'projectName',
            width: 150
          },
          {
            title: '设备名称',
            key: 'deviceName',
            width: 150
          },
          {
            title: '负责工程师',
            key: 'processEngineer',
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
      procedure: {
        modal: false,
        title: '',
        operation: 'Add',
        fromLoading: true,
        from: {
          id: '',
          processNum: '',
          deviceName: '',
          projectNum: '',
          processEngineer: '',
          createTime: '',
          remark: '',
          projectName: '',
          selectPproject: ''
        }
      },
      fromValidate: {
        processNum: [
          {
            required: true,
            message: '请输入工号',
            trigger: 'blur'
          }
        ],
        selectPproject: [
          {
            required: true,
            message: '请选择所属项目!',
            trigger: 'change'
          }
        ],
        deviceName: [
          {
            required: true,
            message: '请输入设备名称',
            trigger: 'blur'
          }
        ],
        processEngineer: [
          {
            required: true,
            message: '请输入负责工程师名字',
            trigger: 'blur'
          }
        ]
      },
      projectList: []
    }
  },
  methods: {
    ...mapActions({
      setBtnEvent: 'btnsetting/setBtnEvent'
    }),
    search() {
      this.tableProperty.queryParams = this.searchData
      this.$refs.baseTable.serverGet()
    },
    /**
     * 获取项目编号
     */
    async getProjectList() {
      let res = await getProjects({
        pageNo: 1,
        pageSize: 500
      })
      this.projectList = res.data
      this.procedure.modal = true
      this.procedure.from.selectPproject =
        this.procedure.from.projectNum + '#' + this.procedure.from.projectName
    },
    ok() {
      this.$refs.baseFrom.validate(valid => {
        if (valid) {
          if (this.procedure.operation == 'Add') {
            addProcedure(this.createProcedure()).then(res => {
              this.$Message.info('增加项目信息成功!')
              this.procedure.modal = false
              this.search()
              this.$refs.baseFrom.resetFields()
              this.procedure.from.id = ''
            })
          } else if (this.procedure.operation == 'Update') {
            updateProcedure(this.createProcedure()).then(res => {
              this.$Message.info('修改项目信息成功!')
              this.procedure.modal = false
              this.search()
              this.$refs.baseFrom.resetFields()
              this.procedure.from.id = ''
            })
          } else {
            this.$Message.error('无法识别的操作!')
          }
        } else {
          this.$Message.error('请输入必填项!')
          this.procedure.fromLoading = false
        }
      })
    },
    createProcedure() {
      if (
        this.procedure.from.selectPproject !== ' ' &&
        this.procedure.from.selectPproject !== null
      ) {
        this.procedure.from.projectNum = this.procedure.from.selectPproject.split(
          '#'
        )[0]
        this.procedure.from.projectName = this.procedure.from.selectPproject.split(
          '#'
        )[1]
      }
      return this.procedure.from
    },
    uploadSuccess(res, file, fileList) {
      if (res.code == 0) {
        this.search()
        this.$Message.success('文件上传成功!')
      } else {
        this.$Message.error('文件上传失败!' + res.message)
      }
    },
    uploadFail(error, file, fileList) {
      this.$Message.error('系统异常:' + error)
    },
    handleFormatError(file, fileList) {
      this.$Notice.error({
        title: '上传文件格式错误',
        desc:
          '文件名为 ' + file.name + '的文件格式错误, 请选择.xlsx、xls或者csv!'
      })
    }
  }
}
</script>

<style scoped>
</style>