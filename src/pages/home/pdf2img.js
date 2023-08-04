class Pdf2Image {
  constructor(pdfDoc) {
    this.pdfDoc = pdfDoc;
  }

  static async open(url) {
    const PdfJs = await import('pdfjs-dist/legacy/build/pdf');
    const Pdfworker = await import('pdfjs-dist/build/pdf.worker.entry');
    PdfJs.GlobalWorkerOptions.workerSrc = Pdfworker;
    const pdfDoc = await PdfJs.getDocument({
      url: 'http://127.0.0.1:5173/test.pdf',
    }).promise;
    console.log('---------------');
    console.log(pdfDoc);
    return new Pdf2Image(pdfDoc);
  }

  // 计算缩放比例
  static calcScale(page, option) {
    if (option.scale !== undefined) {
      return option.scale;
    }
    if (option.width === undefined || option.height === undefined) {
      return 1.0;
    }
    const viewport = page.getViewport({ scale: 1.0 });
    return Math.min(
      option.width / viewport.width,
      option.height / viewport.height,
    );
  }

  numPages() {
    return this.pdfDoc.numPages;
  }

  //`将第pageNo页的pdf转换为指定格式的图片，option用于添加一些配置`
  //`比如设置图片导出格式，设置缩放比例、执行回调函数等`
  async getImageDataUrl(pageNo, option) {
    const page = await this.pdfDoc.getPage(pageNo);
    let scale = 1;

    if (option) {
      scale = Pdf2Image.calcScale(page, option);
    }
    option = option || {};
    if (!option.image) {
      //   `默认导出图片格式为jpeg`
      option.image = 'jpeg';
    }
    //  `指定pdf页面的视口大小`
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement('canvas');
    const canvasContext = canvas.getContext('2d');
    // `设置画布的大小`
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    // `设置画布上下文的大小, 决定了在画布上下文中绘制的图形大小`
    canvasContext.height = viewport.height;
    canvasContext.width = viewport.width;

    const renderContext = {
      canvasContext,
      viewport,
    };

    // `将pdf页面渲染为图片并返回promise`
    await page.render(renderContext).promise;
    // `相比原作者封装的方法，增加了一个回调函数，获取canvas的大小，对后续的图片缩放有帮助
    if (option.callback) option.callback({ canvas });
    // `将canvas导出为指定格式的图片`
    switch (option.image) {
      case 'jpeg':
        return canvas.toDataURL('image/jpeg');
      case 'webp':
        return canvas.toDataURL('image/webp');
      default:
        return canvas.toDataURL();
    }
  }

  //`将整个pdf转换为指定格式的图片`
  async getAllImageDataUrl(option) {
    const pages = [];
    const numPages = this.numPages();
    for (let i = 1; i <= numPages; i += 1) {
      const img = await this.getImageDataUrl(i, option);
      pages.push(img);
    }
    return pages;
  }
}

export default Pdf2Image;
