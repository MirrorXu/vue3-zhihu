// 其他常见 MIME 类型
type MIMEType =
    "text/plain" |
    "text/html" |
    "application/json" | 'image/jpg' | 'image/jpeg' | 'image/png' | 'image/*';

interface Options {
    multiple?: boolean
    accept?: MIMEType | Array<MIMEType>,
}

interface Listener {
    (e: Event): void
}


/**
 * 文件选择
 * @param options
 */
export const selectFiles = (options: Options) => {
    return new Promise<Array<File>>((resolve, reject) => {
        try {
            const input = document.createElement('input')
            input.type = 'file'
            if (options.multiple) input.multiple = true
            if (options.accept) {
                // input.accept = 'text/plain'
                if (typeof options.accept === 'string') {
                    input.accept = options.accept
                }
                if (Array.isArray(options.accept)) {
                    input.accept = options.accept.join(',')
                }
            }
            const changeListener: Listener = (e: Event) => {
                const target = e.target as HTMLInputElement
                const files = []
                if (target && target.files && target.files.length) {
                    let i = 0;
                    while (i < target.files.length) {
                        files.push(target.files[i]);
                        i++
                    }
                }
                resolve(files)
            }
            input.addEventListener('change', changeListener)
            input.click()
        } catch (err) {
            reject(err)
        }
    })
}

/**
 * 创建DataURL
 * @param file Blob对象
 */
export const createDataURL = (file: Blob) => new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.onloadend = () => {
        resolve(fileReader.result)
    }
    fileReader.readAsDataURL(file)
    fileReader.onerror = reject
})

/**
 * 下载
 * @param url 资源地址
 * @param fileName 下载后的文件名
 */
export const download =  (url: string, fileName: string) => {
    return  import('axios').then(({default: axios}) => {
        return axios.request({
            method: 'get',
            url: url,
            responseType: 'blob'
        })
    }).then(res =>{
        const a = document.createElement('a')
        const file = res.data
        const url = URL.createObjectURL(file)
        a.download = fileName
        a.href = url
        a.click()
        URL.revokeObjectURL(url)
    })
}



