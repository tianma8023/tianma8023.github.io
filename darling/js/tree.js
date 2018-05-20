(function() {
    var canvas = $('#canvas');
    if (!canvas[0].getContext) {
        $("#error").show();
        return false;
    }
    var width = canvas.width();
    var height = canvas.height();
    canvas.attr("width", width);
    canvas.attr("height", height);
    var opts = {
        seed: {
            x: width / 2 - 20,
            color: "rgb(190, 26, 37)",
            scale: 2
        },
        branch: [
            [535, 680, 570, 250, 500, 200, 30, 100, [
                [540, 500, 455, 417, 340, 400, 13, 100, [
                    [450, 435, 434, 430, 394, 395, 2, 40]
                ]],
                [550, 445, 600, 356, 680, 345, 12, 100, [
                    [578, 400, 648, 409, 661, 426, 3, 80]
                ]],
                [539, 281, 537, 248, 534, 217, 3, 40],
                [546, 397, 413, 247, 328, 244, 9, 80, [
                    [427, 286, 383, 253, 371, 205, 2, 40],
                    [498, 345, 435, 315, 395, 330, 4, 60]
                ]],
                [546, 357, 608, 252, 678, 221, 6, 100, [
                    [590, 293, 646, 277, 648, 271, 2, 80]
                ]]
            ]]
        ],
        bloom: {
            num: 1000,
            width: 1080,
            height: 650,
        },
        footer: {
            width: 1200,
            height: 5,
            speed: 10,
        }
    }
    var tree = new Tree(canvas[0], width, height, opts);
    var seed = tree.seed;
    var foot = tree.footer;
    var hold = 1;
    var seedAnimate = eval(Jscex.compile("async", function() {
        seed.draw();
        while (hold) {
            $await(Jscex.Async.sleep(3000));
            hold = 0;
        }
        while (seed.canScale()) {
            seed.scale(0.95);
            $await(Jscex.Async.sleep(10));
        }
        while (seed.canMove()) {
            seed.move(0, 2);
            foot.draw();
            $await(Jscex.Async.sleep(10));
        }
    }));
    var growAnimate = eval(Jscex.compile("async", function() {
        do {
            tree.grow();
            $await(Jscex.Async.sleep(10));
        } while (tree.canGrow());
    }));
    var flowAnimate = eval(Jscex.compile("async", function() {
        do {
            tree.flower(2);
            $await(Jscex.Async.sleep(10));
        } while (tree.canFlower());
    }));
    var moveAnimate = eval(Jscex.compile("async", function() {
        tree.snapshot("p1", 240, 0, 610, 680);
        while (tree.move("p1", 500, 0)) {
            foot.draw();
            $await(Jscex.Async.sleep(10));
        }
        foot.draw();
        tree.snapshot("p2", 500, 0, 610, 680);
        canvas.parent().css("background", "url(" + tree.toDataURL('image/png') + ")");
        $await(Jscex.Async.sleep(300));
        canvas.css("background", "none");
    }));
    var jumpAnimate = eval(Jscex.compile("async", function() {
        var ctx = tree.ctx;
        while (true) {
            tree.ctx.clearRect(0, 0, width, height);
            tree.jump();
            foot.draw();
            $await(Jscex.Async.sleep(25));
        }
    }));
    var clockAnimate = eval(Jscex.compile("async", function() {
        var together = new Date();
        together.setFullYear(2018, 1, 25);
        together.setHours(5);
        together.setMinutes(0);
        together.setSeconds(0);
        together.setMilliseconds(0);
        $("#clock-box").fadeIn(2000);
        while (true) {
            timeElapse(together);
            $await(Jscex.Async.sleep(1000));
        }
    }));

    var showPeopleAnimate = eval(Jscex.compile("async", function() {
        $("#we").fadeIn(5000);
    }));

    var isBirthday = isBirthdayOrNot();
    var isDay520 = isDay520OrNot();
    if (isBirthday) {
        document.title = "Happy Birthday!";
    } else if (isDay520) {
        document.title = "I ❤ U";
    }
    var showTypewriterAnimate = eval(Jscex.compile("async", function() {
        var word = 'To Jasmin:<br><br>';
        if (isBirthday) {
            word += '<span style="color:#FF4081">Happy 18th birthday<br>'
            word += getRandomBirthdayWishes() + '</span><br><br>';
        } else if (isDay520) {
            word += getRandomDay520Wishes() + '<br/><br/>'
        } else {
            word += getRandomWord() + '<br><br>';
        }
        for (var i = 0; i < 10; i++) {
            word += ' ';
        }
        word += ' --- From Tianma.';
        $('#words').html(word);
        $('#words').show().typewriter();
    }));

    var runAsync = eval(Jscex.compile("async", function() {
        // $await(seedAnimate());
        // $await(growAnimate());
        // $await(flowAnimate());
        // $await(moveAnimate());
        clockAnimate().start();
        $await(showPeopleAnimate());
        $await(Jscex.Async.sleep(1000));
        $await(showTypewriterAnimate());
        $await(jumpAnimate());
    }));
    runAsync().start();
})();