import plugin from '../../lib/plugins/plugin.js'
import fetch from 'node-fetch'

export class example extends plugin {
  constructor () {
    super({
      /** 功能名称 */
      name: '爱荧',
      /** 功能描述 */
      dsc: 'AO3镜像地址',
      /** https://oicqjs.github.io/oicq/#events */
      event: 'message',
      /** 优先级，数字越小等级越高 */
      priority: 5000,
      rule: [
        {
          /** 命令正则匹配 */
          reg: '^#AO3镜像$',
          /** 执行方法 */
          fnc: 'lovelumine'
        }
      ]
    })
  }

  /**
   * #爱荧
   * @param e oicq传递的事件参数e
   */
  async lovelumine (e) {
    /** e.msg 用户的命令消息 */
    logger.info('[用户命令]', e.msg)

    /** 一言接口地址 */
    let url = 'https://api.lovelumine.com/ao3'
    /** 调用接口获取数据 */
    let res = await fetch(url).catch((err) => logger.error(err))

    /** 判断接口是否请求成功 */
    if (!res) {
      logger.error('[爱荧] 接口请求失败')
      return await this.reply('爱荧接口请求失败')
    }

    /** 接口结果，json字符串转对象 */
    res = await res.json()
    /** 输入日志 */
    logger.info(`[接口结果] ao3镜像：${res.address}`)

    /** 最后回复消息 */
    await this.reply(`ao3镜像：${res.address}`)
  }
}

