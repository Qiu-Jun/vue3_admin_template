import { ElLoading } from 'element-plus';
import Pdf2Image from './pdf2img.js';
import tinymce from 'tinymce/tinymce';

// `设置常量，分别定义canvas的dpi, pdf的dpi以及图片缩放比例`
const CANVASDPI = 72;
const PDFDPI = 96;
const SCALE = 2;
function concatContent(addContent = '', wrap = true) {
  const activeEditor = tinymce.activeEditor;
  const char = wrap ? '\n' : '';
  activeEditor.insertContent([addContent].join(char));
}
async function pdfHandler(file, path) {
  const pdf2img = await Pdf2Image.open(path);
  const page = pdf2img.numPages();
  for (let i = 1; i <= page; i++) {
    let c;
    const url = await pdf2img.getImageDataUrl(i, {
      scale: (PDFDPI / CANVASDPI) * SCALE,
      callback: ({ canvas }) => {
        c = canvas;
      },
    });
    console.log(url);
    concatContent(
      `<img width="${c.width / 2}" height="${
        c.height / 2
      }"  data-pdf="pdf" src="${url}" ></img>`,
    );
  }
}

//`以服务的方式调用，引入loading服务``传送门： https://element.eleme.cn/2.13/#/zh-CN/component/loading`;
function loadingHandler(option = { fullscreen: true }) {
  const loadingInstance = ElLoading.service(option);
  return function () {
    loadingInstance.close();
  };
}

//`阿里云服务器无法识别名称带有+号的图片，因此需要对+号进行特殊处理，将其转换为%2B``该方法接受一个字符串参数src，并将其编码为URI格式，并替换其中的+号字符为%2B`;
function parseImgSrc(src) {
  return encodeURI(src).replace(/\+/g, '%2B');
}

// `$uploadOSSPics是挂载到全局的变量，用于将文件上传到阿里云上，在此不予以赘述``该方法接收一个文件对象参数file，上传成功返回[false, url], 上传失败则返回[true, null]`;

// `创建自定义accept属性的input框`;
function createInput(accept) {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', accept);
  return input;
}

// `为上传pdf、word以及视频文件，创建自定义插件的公共方法，并以svg进行展示``name: 按钮名称`;

export function createPlugin(name, svg, accept, callback) {
  return function (editor, url) {
    editor.ui.registry.addIcon(
      'edit',
      `<svg width="2em" height="2em" xmlns="http://www.w3.org/2000/svg"><path d="M106.133 67.2a4.797 4.797 0 0 0-4.8 4.8c0 .187.014.36.027.533h-.027V118.4H9.6V26.667h50.133c2.654 0 4.8-2.147 4.8-4.8 0-2.654-2.146-4.8-4.8-4.8H9.6a9.594 9.594 0 0 0-9.6 9.6V118.4c0 5.307 4.293 9.6 9.6 9.6h91.733c5.307 0 9.6-4.293 9.6-9.6V72.533h-.026c.013-.173.026-.346.026-.533 0-2.653-2.146-4.8-4.8-4.8z"/><path d="M125.16 13.373L114.587 2.8c-3.747-3.747-9.854-3.72-13.6.027l-52.96 52.96a4.264 4.264 0 0 0-.907 1.36L33.813 88.533c-.746 1.76-.226 3.534.907 4.68 1.133 1.147 2.92 1.667 4.693.92l31.4-13.293c.507-.213.96-.52 1.36-.907l52.96-52.96c3.747-3.746 3.774-9.853.027-13.6zM66.107 72.4l-18.32 7.76 7.76-18.32L92.72 24.667l10.56 10.56L66.107 72.4zm52.226-52.227l-8.266 8.267-10.56-10.56 8.266-8.267.027-.026 10.56 10.56-.027.026z"/></svg>`,
    );

    editor.ui.registry.addButton(name, {
      text: 'pdf',
      icon: `edit`,
      onAction: function () {
        console.log('sss');
        const input = createInput(accept);
        input.click();
        input.onchange = async function () {
          const file = this.files[0];
          const close = loadingHandler();
          console.log(file);
          //   const [err, url] = await uploadToOss(file);
          close();

          callback(file, url);
        };
      },
    });
  };
}

export const uploadPdfPlugin = createPlugin(
  'uploadPdf',
  '<svg width="128" height="128" xmlns="http://www.w3.org/2000/svg"><path d="M106.133 67.2a4.797 4.797 0 0 0-4.8 4.8c0 .187.014.36.027.533h-.027V118.4H9.6V26.667h50.133c2.654 0 4.8-2.147 4.8-4.8 0-2.654-2.146-4.8-4.8-4.8H9.6a9.594 9.594 0 0 0-9.6 9.6V118.4c0 5.307 4.293 9.6 9.6 9.6h91.733c5.307 0 9.6-4.293 9.6-9.6V72.533h-.026c.013-.173.026-.346.026-.533 0-2.653-2.146-4.8-4.8-4.8z"/><path d="M125.16 13.373L114.587 2.8c-3.747-3.747-9.854-3.72-13.6.027l-52.96 52.96a4.264 4.264 0 0 0-.907 1.36L33.813 88.533c-.746 1.76-.226 3.534.907 4.68 1.133 1.147 2.92 1.667 4.693.92l31.4-13.293c.507-.213.96-.52 1.36-.907l52.96-52.96c3.747-3.746 3.774-9.853.027-13.6zM66.107 72.4l-18.32 7.76 7.76-18.32L92.72 24.667l10.56 10.56L66.107 72.4zm52.226-52.227l-8.266 8.267-10.56-10.56 8.266-8.267.027-.026 10.56 10.56-.027.026z"/></svg>',
  '.pdf',
  pdfHandler,
);
