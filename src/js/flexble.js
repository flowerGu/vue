//动态调整rem值,除以50
function setsize() {
  var winW = document.documentElement.clientWidth,
  	  winH = document.documentElement.clientHeight,
	  baseFontSize = 50,
	  baseWidth = 750,
	  winWidthSize = Math.min(winW, winH);
  if (winWidthSize > 560) {
	winWidthSize = 560;
  }
  if (winWidthSize < 270) {
	winWidthSize = 270;
  }
  var _html = document.getElementsByTagName('html')[0];
  _html.style.fontSize =winWidthSize / baseWidth * baseFontSize + 'px';
}
setsize();
