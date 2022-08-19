///////////////////////////////////////
//            轉場href判斷             //
/////////////////////////////////////// 


const handlePageTransition = () => {
    console.log('Transition Scenes!!!!')

    cgPageDom();

    setTimeout(function(){
        $('.transition__bg').addClass('close');
    }, 1500);

    setTimeout(function(){
        $('.transition__bg').remove();
    }, 3000);
}

// handlePageTransition()


$('body')
.on('click', 'a.transition', function (e) {
    e.preventDefault();
    // 本地
    var x = window.location.pathname
    var xArr = x.split("/");
    xArr = lastArr(xArr)
    // 連結
    var y = $(this).attr("href");
    var yArr = y.split("/");
    yArr = lastArr(yArr)

    if (xArr[xArr.length - 1] == yArr[yArr.length - 1] && xArr[xArr.length - 2] == yArr[yArr.length - 2]) {
        // 自己那頁 啥事都不幹
    } else {
        pagechange.transition_animation($(this).attr("href"));
    }

})
.on('click', 'a.anchor', function (e) {
    e.preventDefault();
    var a = $(this).attr('href');
    cut_a = a.split('#');

    var target = cut_a[1];

    var jqTarget = '.' + target;

    if (target.length) {
        $('html, body').animate({ scrollTop: $(jqTarget).offset().top }, { duration: 900 });
    }
})
.on('click', 'a.ajax_open', function (e) {
    e.preventDefault();

    cgPageDom();

    setTimeout(function(){
        $('.transition__bg').addClass('close');
    }, 900);

    setTimeout(function(){
        $('.transition__bg').remove();
    }, 1600);
})
.on('click', 'a.ajax_close', function (e) {
    e.preventDefault();

    cgPageDom();

    setTimeout(function(){
        $('.transition__bg').addClass('close');
    }, 900);

    setTimeout(function(){
        $('.transition__bg').remove();
    }, 1600);
});

//補index.html上去
function lastArr(arr) {
    var last = arr.pop()
    if (last.indexOf("#") > -1) {
        arr.push(last)
    } else if (last.indexOf("html") > 0) {
        arr.push(last)
    } else if (last == "") {
        arr.push('index.html')
    } else {
        arr.push(last)
        arr.push('index.html')
    }
    return arr
}

// 轉場
var pagechange = {
    transition_animation: function (href) {

        cgPageDom();

        $("body").delay(2000).animate({ opacity: "1" }, {
            queue: true,
            duration: 500,
            easing: "easeOutQuad",
            complete: function () {
                window.sessionStorage["session"] = 'successCG';

                setTimeout(function () {
                    window.location.assign(href);
                }, 200);
            }
        });
    }
}

//動態曲線
jQuery.easing['jswing'] = jQuery.easing['swing'];
jQuery.extend(jQuery.easing, {
    def: 'easeOutQuad',

    easeOutQuad: function (x, t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    easeInOutCirc: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
});


function cgPageDom(){
    console.log('Transition Start!!!')

    var transition__scene = "<div class='transition__bg'><div class='transition__container'></div></div>",
    transition__wrap = `<div class='transition__wrap'> <img src="../assets/images/transition.gif"></img> </div>`;
    // transition__wrap = `<div class='wrap'></div>`;

    $("body").append(transition__scene);
    $('.transition__bg .transition__container').append(transition__wrap)

    // for (var index = 0; index < 5; index++) {
    //
    //     // $('.transition__bg .transition__container').append(transition__wrap)
    //
    // }

    setTimeout(function(){
        $('.transition__bg').addClass('active');
    }, 1000);
}


// Storage()

function saveToStorage() {
    window.localStorage["local"] = document.getElementById("local").value;
    window.sessionStorage["session"] = 'successCG';
}
function loadStorage() {
    document.getElementById("local").value = window.localStorage["local"];
    document.getElementById("session").value = window.sessionStorage["session"];
}

// document.ready(function() {
//     handlePageTransition()
// })