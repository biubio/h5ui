// 解决移动端click 300 毫秒延迟 (http://github.com/ftlabs/fastclick)
$(function() {
    FastClick.attach(document.body);
});

// 图片lazy加载
$('img.lazyload').lazyload();

// tab
$(".tab-item a").click(function (e) {
    e.preventDefault();
    $(this).tab('show');
});

// activate tabs for lazyload
$(".tab-item a").on('shown.bs.tab', function () {
    $(window).trigger('scroll');
});