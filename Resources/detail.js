function triggerAction(action, value) {
    var href = "webview-callback://" + action;
    if (value != undefined) {
        href += "/" + value;
    }
    execute(href);
}

function execute(url) {
    var iframe = document.createElement("IFRAME");
    iframe.setAttribute("src", url);
    document.documentElement.appendChild(iframe);
    iframe.parentNode.removeChild(iframe);
    iframe = null;
}

function bindCommentClickEvent(){
    $(".comment-item").click(function () {

        if (event.target.nodeName == 'IMG') {
            return;
        }
        if (event.target.nodeName == 'A') {
            return;
        }

        if (event.target.className == 'sendFLower') {
            return;
        }

        if (/link-card/gi.test(event.target.className)) {
            return;
        }
        if (/link-img/gi.test(event.target.className)) {
            return;
        }
        if (/link-txt/gi.test(event.target.className)) {
            return;
        }
        var id = $(this).attr('id');
        triggerAction('clickOnComment', id);
    });
    
    $(".sendFLower").click(function (event) {
        var index = $(this).attr('index');
        triggerAction('sendFlower', index);
    });
    
    $(".commentImage").click(function (event) {
           if (!/http/g.test($(this).prop('src'))) {
               this.src = $(this).attr('data-path');
               return;
           }
           var index = $(this).attr('index');
           triggerAction('clickOnCommentImage', index);
       });
    
    $(".avater_img").click(function (event) {
        var index = $(this).attr('index');
        triggerAction('clickOnAvatar', index);
    });
    
    $(".link-card").click(function (event) {
        var data = $(this).attr("tid");
        triggerAction('clickOnLinkCard', data);
    });
}
function unbindCommentClickEvent() {
    $(".comment-item").unbind('click');
    $(".sendFLower").unbind('click');
    $(".commentImage").unbind('click');
    $(".avater_img").unbind('click');
    $(".link-card").unbind('click');
}

function bindDetailClickEvent(){
    $(".contentImage").click(function (event) {
        if (event.target.parentNode.nodeName == 'A') {
            return;
        }
        if (!/http/g.test($(this).prop('src'))) {
            var path = $(this).attr('data-path');
            if (path) {
                this.src = $(this).attr('data-path');
                return;
            }
        }
        var index = $(this).attr('index');
        triggerAction('clickOnContentImage', index);
    });

    $("#addFriend").click(function (event) {
        triggerAction('clickOnAddFriend', "");
    });

    $("#topic").click(function (event) {
        triggerAction('clickOnTopic', "");
    });

    $("#tag").click(function (event) {
        var index = $(this).attr('index');
        triggerAction('showTag', index);
    });
    $("#tagMore").click(function (event) {
        var index = $(this).attr('index');
        triggerAction('showTagMore', index);
    });
    
    $(".videoPlay").click(function (event) {
        var id = $(this).attr('id');
        triggerAction('clickOnVedio', id);
    });
    $("#videoadv-mask").click(function (event) {
        var videoplayer = document.getElementById("videoadv-player");
        var percent = videoplayer.currentTime / videoplayer.duration;
        triggerAction('clickOnVideoadv', percent);
    });

    $("#reply_sort").click(function (event) {
        triggerAction('reply_sort', "");
    });
    $("#lz_change").click(function (event) {
        triggerAction('reply_lz', "");
    });
    $("#reply_number").click(function (event) {
        triggerAction('reply_number', "");
    });
    
    $(".thread_goodReward").click(function (event) {
        triggerAction('clickOnHaoWenReward', "");
    });

    
}
function unbindDetailClickEvent() {
    $(".contentImage").unbind('click');
    $("#addFriend").unbind('click');
    $("#topic").unbind('click');
    $("#tag").unbind('click');
    $("#tagMore").unbind('click');
    
    $(".videoPlay").unbind('click');
    $("#videoadv-mask").unbind('click');
    
    $("#reply_sort").unbind('click');
    $("#lz_change").unbind('click');
    $("#reply_number").unbind('click');
    
    $(".thread_goodReward").unbind('click');
}

//调用方法
function floweredComment(id, count, flag) {
    var flowerImageId = "flowerImage" + id;
    var flowerImageCountId = "flowerImageCount" + id;
    var imageNode = $("#" + flowerImageId);
    var countNode = $("#" + flowerImageCountId);
    if (imageNode) {
        if (flag == 1) {
            imageNode.prop("src", "flower-light.png");
            countNode.css("color", "#FF7800 ")
        } else {
            imageNode.prop("src", "flower.png");
        }
    }
    if (countNode) {
        if (count == 0) {
            countNode.text("");
        } else {
            countNode.text(count);
        }
    }
}


function deleteMorebr() {
    $('.myhr').wrap('<div style="overflow:hidden;"></div>');
    $('.atext').each(function (idx, item) {
        var txt = $(item).text().replace(/\s/g, '');
        if (!txt.length) {
            $(item).remove();
        }
    });
    $('.nl2p').each(function (idx, item) {
        //文字自带的换行
        if (item.previousSibling && (item.previousSibling.nodeType == 3 || item.previousSibling.nodeName == 'FONT')) {
            $(item).css('height', 0)
        }
        //图片下无内容的换行
        if (item.previousSibling && item.previousSibling.className == 'atext') {
            $(item).css('height', 0)
        }
        if (item.previousSibling && item.previousSibling.className == 'atext' && item.nextSibling && item.nextSibling.className == 'nl2p') {
            $(item.nextSibling).css('height', 0)
        }
        //段落之间空行删除
        if (item.previousSibling && item.previousSibling.className == 'box' && item.nextSibling && item.nextSibling.className == 'box') {
            $(item).remove();
        }
        //段落标题和图片直接空行删除
        if (item.previousSibling && item.previousSibling.className == 'box' && $(item.nextElementSibling).prop('class') == 'contentImage') {
            $(item).remove();
        }
        //图片之间的换行标签
        if (item.previousSibling &&
            item.previousSibling.className == 'nl2p' &&
            item.previousSibling.previousSibling &&
            item.previousSibling.previousSibling.className == 'contentImage') {
            $(item).css('height', 0);
            $(item).prev().css('height', 0);
        }
    });
}

function commentBottomAdShow(flag){
    if (flag == '1') {
        $("#comment_bottom_adv").show();
    } else {
        $("#comment_bottom_adv").hide();
    }
}
function getCommentBottomAdFrame() {
    var top = $(".comment_bottom_ad_place").offset().top;
    var left = $(".comment_bottom_ad_place").offset().left;
    var width = $(".comment_bottom_ad_place").width();
    var height = $(".comment_bottom_ad_place").height();
    triggerAction('commentBottomAdFrame', left + "_" + top + "_" + width + "_" + height);
}

function relateRecommendShow(flag) {
    if (flag == '1') {
        $(".recommend").show();
    } else {
        $(".recommend").hide();
    }
}

//滚动方法
function HTMLLabelScroll(label, offset) {
    var top = $(label).offset().top + parseFloat(offset);
    $('html, body').animate({
        scrollTop: top,
    }, 200);
}
function HTMLLabelHeight(label, height) {
    $(label).height(height);
}

//详情广告
$("#comment_bottom_adv").click(function () {
    var title = $('#comment_bottom_adv [data-title]').data('title');
    triggerAction('clickOnCommentAdv', title);
});



//tool
//随机数
function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}
