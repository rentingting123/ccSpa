import network from '@@/utils/network'


export default {
    delPoolReportInfoList: params => network.put('review/resource/delPoolReportInfoList', params),
}