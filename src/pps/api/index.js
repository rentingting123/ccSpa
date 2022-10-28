import user from './user'
import pps from './pps'
import tag from './tag'
import content from './content'
import onepush from './onepush'

export default{
    ...user,
    ...tag,
    ...pps,
    ...content,
    ...onepush
}