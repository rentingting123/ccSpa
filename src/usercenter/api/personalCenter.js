import network from '../utils/request'

export async function getUserInfo (param) {
  console.log('getUserInfo')
  return network.get({
    url: '/usercenter/user',
    data: param
  })
}
