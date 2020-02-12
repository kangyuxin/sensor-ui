// 分页查询
export function findPage (params) {
  let findPageData = {
    'code': 200,
    'msg': 'success',
    'total': 5,
    'data': {}
  }
  let pageIndex = 1
  let pageSize = 5
  if (params !== null) {
    // pageIndex = params.pageIndex
  }
  if (params !== null) {
    // pageSize = params.pageSize
  }
  let content = this.getContent(pageIndex, pageSize)
  findPageData.data.pageIndex = pageIndex
  findPageData.data.pageSize = pageSize
  findPageData.data.totalSize = 50
  findPageData.data.content = content
  return {
    url: 'sensor/findPage',
    type: 'post',
    data: findPageData
  }
}
export function getContent (pageIndex, pageSize) {
  let content = []
  for (let i = 0; i < 3; i++) {
    let obj = {}
    let index = ((pageIndex - 1) * pageSize) + i + 1
    obj.id = 'TE0000' + index
    obj.brand = 'TE'
    obj.func = '光电传感器'
    obj.category = 'SMT 光电发射器'
    obj.env = '工组温度范围  -20 – 80 °C [ -4 – 176 °F ]'
    obj.lev = '工业级别（严苛1）'
    obj.app = 'ELM-5000 系列光电传感器专为医疗应用而设计，对于这些应用，峰值波长和回流可焊性的选择是关键要求。'
    obj.descri = 'ELM-5000'
    obj.adv = 'null'
    obj.sensorid = 'null'
    content.push(obj)
  }
  return content
}
