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
            v-model="searchData.projectNum"
            prefix="icon iconfont icon-xiangmu"
            placeholder="请输入项目编号"
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
      v-model="project.modal"
      :closable="false"
      :title="project.title"
      :loading="project.fromLoading"
      width="600px"
      @on-ok="ok"
    >
      <Form
        ref="baseFrom"
        :model="project.from"
        label-position="left"
        :label-width="100"
        :rules="fromValidate"
      >
        <FormItem label="项目编号" prop="projectNum">
          <Input
            v-model="project.from.projectNum"
            placeholder="请输入项目编号!"
            prefix="icon iconfont icon-xiangmu"
          />
        </FormItem>
        <FormItem label="项目名称" prop="projectName">
          <Input
            v-model="project.from.projectName"
            placeholder="请输入项目名称!"
            prefix="icon iconfont icon-xiangmu1"
            clearable
          />
        </FormItem>
        <FormItem label="客户名称" prop="customerName">
          <Input
            v-model="project.from.customerName"
            placeholder="请输入客户名称!"
            clearable
            prefix="icon iconfont icon-wulumuqishigongandashujuguanlipingtai-ico-"
          />
        </FormItem>
        <FormItem label="业务员名称" prop="salesMan">
          <Input
            v-model="project.from.salesMan"
            placeholder="请输入业务员名称!"
            clearable
            prefix="icon iconfont icon-iconfontzhizuobiaozhun0250"
          />
        </FormItem>
        <FormItem label="备注" prop="remark">
          <Input
            v-model="project.from.remark"
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
import { addProject, updateProject, deleteProject } from '@/api/project.js'
import { mapActions, mapGetters } from 'vuex'
import { exportWinOpen } from '@/utils/tools.js'
export default {
  name: 'project',
  components: { TTable },
  beforeMount() {
    this.setBtnEvent({
      //增加
      '6yujw764': () => {
        this.project.modal = true
        this.project.title = '增加项目信息'
        this.project.operation = 'Add'
        this.project.fromLoading = true
      },
      //刷新
      '0v6fupn3': () => {
        this.search()
      },
      //删除
      '0ke6ked5': () => {
        let selectData = this.$refs.baseTable.selectData
        if (selectData === undefined || selectData.length === 0) {
          return this.$Message.warning('请选择一项进行删除!')
        }
        this.$Modal.confirm({
          title: '提示',
          content:
            '您确定要删除名为<' +
            '<span style="color:red"> <strong>' +
            selectData[0].projectName +
            ' </strong></span>' +
            '>的项目信息?',
          loading: true,
          onOk: () => {
            deleteProject({ id: selectData[0].id }).then(res => {
              this.$Message.info('删除项目信息成功!')
              this.search()
              this.$Modal.remove()
            })
          }
        })
      },
      //导入
      p6gjul63: () => {
        this.$refs.upload.handleClick()
      },
      //修改
      '9max3ujm': () => {
        let selectData = this.$refs.baseTable.selectData
        if (selectData === undefined || selectData.length === 0) {
          return this.$Message.warning('请选择一项进行修改!')
        }
        this.project.title = '修改项目信息'
        this.project.operation = 'Update'
        this.project.from = selectData[0]
        this.project.modal = true
        this.project.fromLoading = true
      },
      //导出
      va1w9tw3: () => {
        exportWinOpen(this.searchData, 'mrp/project/export')
      },
      //导出模板
      y4m9wc80: () => {
        exportWinOpen(null, 'mrp/project/exportTemplate')
      }
    })
  },
  mounted() {
    this.search()
  },
  computed: {
    ...mapGetters(['token']),
    improtUrl() {
      return (
        process.env.VUE_APP_BASE_API +
        'mrp/project/upload?API-Token=' +
        this.token
      )
    }
  },
  data() {
    return {
      searchData: {
        projectNum: ''
      },
      tableProperty: {
        selectType: 'Single',
        queryParams: null,
        serverUrl: '/mrp/project/getProjects',
        tableColumns: [
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
            title: '客户名称',
            key: 'customerName',
            width: 150
          },
          {
            title: '业务员',
            key: 'salesMan',
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
      project: {
        modal: false,
        title: '',
        operation: 'Add',
        fromLoading: true,
        from: {
          id: '',
          projectNum: '',
          projectName: '',
          customerName: '',
          salesMan: '',
          remark: ''
        }
      },
      fromValidate: {
        projectNum: [
          {
            required: true,
            message: '请输入项目编号',
            trigger: 'blur'
          }
        ],
        projectName: [
          {
            required: true,
            message: '请输入项目名称',
            trigger: 'blur'
          }
        ],
        customerName: [
          {
            required: true,
            message: '请输入客户名称',
            trigger: 'blur'
          }
        ],
        salesMan: [
          {
            required: true,
            message: '请输入业务名称',
            trigger: 'blur'
          }
        ]
      },
      improtData: {}
    }
  },
  methods: {
    ...mapActions({
      setBtnEvent: 'btnsetting/setBtnEvent'
    }),
    ok() {
      this.$refs.baseFrom.validate(valid => {
        if (valid) {
          if (this.project.operation == 'Add') {
            addProject(this.project.from).then(res => {
              this.$Message.info('增加项目信息成功!')
              this.project.modal = false
              this.search()
              this.$refs.baseFrom.resetFields()
              this.project.from.id = ''
            })
          } else if (this.project.operation == 'Update') {
            updateProject(this.project.from).then(res => {
              this.$Message.info('修改项目信息成功!')
              this.project.modal = false
              this.search()
              this.$refs.baseFrom.resetFields()
              this.project.from.id = ''
            })
          } else {
            this.$Message.error('无法识别的操作!')
          }
        } else {
          this.$Message.error('请输入必填项!')
          this.project.fromLoading = false
        }
      })
    },
    search() {
      this.tableProperty.queryParams = this.searchData
      this.$refs.baseTable.serverGet()
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