export default function setFontSize() {
  // 基准设置
  const baseWidth = 1920; // 设计的基准宽度
  const baseFontSize = 17;
  const ratio = window.innerWidth / baseWidth; // 计算当前视窗与基准宽度的比例

  // 计算字号并约束在最小和最大字号之间
  let currentFontSize = ratio * baseFontSize;

  // 设置根元素的字号
  document.documentElement.style.fontSize = `${currentFontSize}px`;
}
