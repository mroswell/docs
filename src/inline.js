(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga')

ga('create', 'UA-75262397-3', 'auto')
ga('send', 'pageview')

var loadDeferredStyles = function() {
  var d = [
    'https://fonts.googleapis.com/css?family=Roboto:300,400,700|Material+Icons',
  ]
  
  var l = document.getElementsByTagName('style')[0]
  for(var i = 0, length = d.length; i < length; i++) {
      var el = document.createElement('link')
      el.href = d[i]
      el.rel = 'stylesheet'
      el.type = 'text/css'
      el.property = 'stylesheet'
      el.media = 'all'
      l.parentNode.insertBefore(el, l)
  }
}
var raf = requestAnimationFrame || mozRequestAnimationFrame ||
    webkitRequestAnimationFrame || msRequestAnimationFrame
if (raf) raf(function() { window.setTimeout(loadDeferredStyles, 0) })
else window.addEventListener('load', loadDeferredStyles)