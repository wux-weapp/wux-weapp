import { miniprogramThis } from '../internals/global'
import { getSystemInfoSync } from '../hooks/useNativeAPI'
import { compareVersion } from './compareVersion'

const libVersion = '2.6.6'

// check SDKVersion
export function warningUnChecked() {
    const { platform, SDKVersion } = getSystemInfoSync()
    if (platform === 'devtools' && compareVersion(SDKVersion, libVersion) < 0) {
        if (miniprogramThis.showModal) {
            miniprogramThis.showModal({
                title: '提示',
                content: `当前基础库版本（${SDKVersion}）过低，无法使用 Wux Weapp 组件库，请更新基础库版本 >=${libVersion} 后重试。`,
            })
        }
    }
}
