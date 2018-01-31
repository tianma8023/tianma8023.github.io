function render(template, context) {

    var tokenReg = /(\\)?\{([^\{\}\\]+)(\\)?\}/g;

    return template.replace(tokenReg, function(word, slash1, token, slash2) {
        if (slash1 || slash2) {
            return word.replace('\\', '');
        }

        var variables = token.replace(/\s/g, '').split('.');
        var currentObject = context;
        var i, length, variable;

        for (i = 0, length = variables.length; i < length; ++i) {
            variable = variables[i];
            currentObject = currentObject[variable];
            if (currentObject === undefined || currentObject === null) return '';
        }
        return currentObject;
    });
}
String.prototype.render = function(context) {
    return render(this, context);
};

var re = /x/;
console.log(re);
re.toString = function() {
    showMessage('哈哈，你打开了控制台，是想要看看我的秘密吗？', 5000);
    return '';
};

$(document).on('copy', function() {
    showMessage('你都复制了些什么呀，转载要记得加上出处哦', 5000);
});

$.ajax({
    cache: true,
    url: "/assets/json/waifu-tips.json",
    dataType: "json",
    success: function(result) {
        $.each(result.mouseover, function(index, tips) {
            $(document).on("mouseover", tips.selector, function() {
                var text = tips.text;
                if (Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1) - 1];
                text = text.render({ text: $(this).text() });
                showMessage(text, 3000);
            });
        });
        $.each(result.click, function(index, tips) {
            $(document).on("click", tips.selector, function() {
                var text = tips.text;
                if (Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1) - 1];
                text = text.render({ text: $(this).text() });
                showMessage(text, 3000);
            });
        });
    }
});

(function() {
    var text;
    if (window.location.pathname === '/') { //如果是主页
        var now = (new Date()).getHours();
        if (now > 23 || now <= 5) {
            text = '你是夜猫子呀？这么晚还不睡觉，明天起的来嘛';
        } else if (now > 5 && now <= 7) {
            text = '早上好！一日之计在于晨，美好的一天就要开始了';
        } else if (now > 7 && now <= 11) {
            text = '上午好！工作顺利嘛，不要久坐，多起来走动走动哦！';
        } else if (now > 11 && now <= 14) {
            text = '中午了，工作了一个上午，现在是午餐时间！';
        } else if (now > 14 && now <= 17) {
            text = '午后很容易犯困呢，今天的运动目标完成了吗？';
        } else if (now > 17 && now <= 19) {
            text = '傍晚了！窗外夕阳的景色很美丽呢，最美不过夕阳红~';
        } else if (now > 19 && now <= 21) {
            text = '晚上好，今天过得怎么样？';
        } else if (now > 21 && now <= 23) {
            text = '已经这么晚了呀，早点休息吧，晚安~';
        } else {
            text = '嗨~ 快来逗我玩吧！';
        }
    } else {
        text = '欢迎阅读<span style="color:#0099cc;">『' + document.title.split(' | ')[0] + '』</span>';
    }
    showMessage(text, 6000);
})();

function showHitokoto() {
    $.getJSON('http://api.hitokoto.cn?c=a&encode=json', function(result) {
        var msg = result.hitokoto.substring(0, 28) + '<br/><span style="float: right; padding-right: 10px;"><font color="#43A047">' + result.from + "</font></span>";
        showMessage(msg, 5000);
    });
}

function showMessage(text, timeout) {
    if (Array.isArray(text)) text = text[Math.floor(Math.random() * text.length + 1) - 1];
    console.log(text);
    $('.waifu-tips').stop();
    $('.waifu-tips').html(text).fadeTo(200, 1);
    if (timeout === null) timeout = 5000;
    hideMessage(timeout);
}

function hideMessage(timeout) {
    $('.waifu-tips').stop().css('opacity', 1);
    if (timeout === null) timeout = 5000;
    $('.waifu-tips').delay(timeout).fadeTo(200, 0);
}

// 获取浏览器支持的'hidden' 字段
function getHiddenProp() {
    var prefixes = ['webkit', 'moz', 'ms', 'o'];

    var prop = 'hidden';
    // if 'hidden' is natively supported just return it
    if (prop in document) return prop;

    // otherwise loop over all the known prefixes until we find one
    for (var i = 0; i < prefixes.length; i++) {
        if ((prop = prefixes[i] + 'Hidden') in document)
            return prop;
    }

    // otherwise it's not supported
    return null;
}

// 获取窗口可视性状态
function getVisibilityState() {
    var prefixes = ['webkit', 'moz', 'ms', 'o'];

    var visibilityState = 'visibilityState';
    // if 'visibilityState' is natively supported just return it
    if (visibilityState in document) return visibilityState;

    // otherwise loop over all the known prefixes until we find one
    for (var i = 0; i < prefixes.length; i++) {
        if ((visibilityState = prefixes[i] + 'VisibilityState') in document)
            return visibilityState;
    }

    // otherwise it's not suppoerted
    return null;
}

// Check whether window is hidden or not
function isHidden() {
    var prop = getHiddenProp();
    if (!prop) return false;

    return document[prop];
}

(function() {
    // 先默认执行轮询
    var intervalId = window.setInterval(showHitokoto, 60000);

    var hiddenProp = getHiddenProp();
    if (hiddenProp) {
        var eventname = hiddenProp.replace(/[H|h]idden/, '') + 'visibilitychange';
        document.addEventListener(eventname, function() {
            if (isHidden()) {
                window.clearInterval(intervalId);
            } else {
                intervalId = window.setInterval(showHitokoto, 60000);
            }
        });
    }
})();