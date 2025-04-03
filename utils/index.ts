//导出下载svg
//使用原生 DOM API 和 Blob 对象将 DOM 转换为 SVG 并下载
function exportDomToSvg(element: HTMLElement, filename = 'export.svg') {
  // if (!element) return ElMessage.error('暂无数据,请先选择模板')
  // 1. 克隆元素以避免影响原DOM
  const clonedElement = element.cloneNode(true);

  // 2. 创建SVG包装器
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const xmlSerializer = new XMLSerializer();

  // 3. 设置SVG属性
  const { width, height } = element.getBoundingClientRect();
  svg.setAttribute('width', width.toString());
  svg.setAttribute('height', height.toString());
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

  // 4. 将DOM转换为foreignObject嵌入SVG
  const foreignObject = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
  foreignObject.setAttribute('width', '100%');
  foreignObject.setAttribute('height', '100%');
  foreignObject.appendChild(clonedElement);
  svg.appendChild(foreignObject);

  // 5. 序列化为SVG字符串
  const svgString = xmlSerializer.serializeToString(svg);

  // 6. 添加XML声明
  const preface = '<?xml version="1.0" standalone="no"?>';
  const svgBlob = new Blob([preface + svgString], { type: 'image/svg+xml;charset=utf-8' });

  // 7. 创建下载链接
  const svgUrl = URL.createObjectURL(svgBlob);
  const downloadLink = document.createElement('a');
  downloadLink.href = svgUrl;
  downloadLink.download = filename;

  // 8. 触发下载
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);

  // 9. 释放URL对象
  setTimeout(() => {
    URL.revokeObjectURL(svgUrl);
  }, 100);
}