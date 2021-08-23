/**
 * 获取版本 retrun 对应环境域名
 * develop: '开发版', trial: '体验版', release: '正式版'
 * 支持扩展 - 思路 可通过 process.env.NODE_ENV 判断当前打包是 生产模式或工厂模式 进而判断 适合多环境 dev -> beta -> uat -> pro
 * @returns 域名
 */
 const getVersion = () => {
    // @ts-ignore
    switch (__wxConfig.envVersion)
    {
      case 'develop':
        return 'https://develop.gavinpeng.cn'

      case 'trial':
        return 'https://trial.gavinpeng.cn'

      case 'release':
        return 'https://release.gavinpeng.cn'

      default:
        return 'https://develop.gavinpeng.cn'
    }
}

export {
    getVersion
}