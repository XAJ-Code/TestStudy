export interface Options {
    file: File,
    quality?: number,
    success?: (base64: string) => void
}

export class compressImage {
    options: Options;
    fileReader = new FileReader()
    constructor(options: Options) {
        this.options = options;
        this.createBase64();
    }
    //将file对象转换为base64
    createBase64() {
        //未压缩1.0MB
        this.fileReader.readAsDataURL(this.options.file)//放回该file对象的base64
        this.fileReader.onload = (e: ProgressEvent<FileReader>) => {
            this.compressImage(e.target?.result as string)
        }
    }
    //压缩图片
    //注意这里传入的url也是通过fileReader转换后的base64Url
    compressImage(url: string) {
        //图像大小
        const img = new Image();
        img.src = url;
        img.onload = () => {
            // console.log(img.width, img.height);
            const canvas:HTMLCanvasElement = document.createElement("canvas"); 
            const ctx = canvas.getContext("2d")

            ctx?.drawImage(img, 0, 0,img.width,img.height);//将图像绘制到canvas上
            const newBase64Url = canvas.toDataURL(this.options.file.type, this.options.quality)//将canvas转换为新的base64
            //console.log(newBase64Url);//此时图片质量默认为1.转换后的大小为39.6kb
            //将新的图片url回传出去
            this.options.success?.apply(null, [newBase64Url])
        }
    }
}
// window.requestAnimationFrame

const file = document.querySelector("#file") as HTMLInputElement
file.addEventListener("change", (e: Event) => {
    const target = e.target as HTMLInputElement
    const filesObj = target.files?.[0]
    if (filesObj) {
        new compressImage({ 
            file: filesObj,
            success:(base64Url: string)=>{
                // console.log('555'+base64Url);
                //将压缩后的图片显示在页面上
                //注意这里需要将base64Url转换为图片格式
                const img = document.createElement("img")
                img.setAttribute("src", base64Url)
                document.body.appendChild(img)
            },
            quality: 0.5
        })
    }
})
