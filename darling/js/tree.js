!function(){var canvas=$("#canvas");if(!canvas[0].getContext)return $("#error").show(),!1;var width=canvas.width(),height=canvas.height();canvas.attr("width",width),canvas.attr("height",height);var opts={seed:{x:width/2-20,color:"rgb(190, 26, 37)",scale:2},branch:[[535,680,570,250,500,200,30,100,[[540,500,455,417,340,400,13,100,[[450,435,434,430,394,395,2,40]]],[550,445,600,356,680,345,12,100,[[578,400,648,409,661,426,3,80]]],[539,281,537,248,534,217,3,40],[546,397,413,247,328,244,9,80,[[427,286,383,253,371,205,2,40],[498,345,435,315,395,330,4,60]]],[546,357,608,252,678,221,6,100,[[590,293,646,277,648,271,2,80]]]]]],bloom:{num:1e3,width:1080,height:650},footer:{width:1200,height:5,speed:10}},tree=new Tree(canvas[0],width,height,opts),seed=tree.seed,foot=tree.footer,hold=1,seedAnimate=eval(Jscex.compile("async",function(){for(seed.draw();hold;)$await(Jscex.Async.sleep(3e3)),hold=0;for(;seed.canScale();)seed.scale(.95),$await(Jscex.Async.sleep(10));for(;seed.canMove();)seed.move(0,2),foot.draw(),$await(Jscex.Async.sleep(10))})),growAnimate=eval(Jscex.compile("async",function(){do{tree.grow(),$await(Jscex.Async.sleep(10))}while(tree.canGrow())})),flowAnimate=eval(Jscex.compile("async",function(){do{tree.flower(2),$await(Jscex.Async.sleep(10))}while(tree.canFlower())})),moveAnimate=eval(Jscex.compile("async",function(){for(tree.snapshot("p1",240,0,610,680);tree.move("p1",500,0);)foot.draw(),$await(Jscex.Async.sleep(10));foot.draw(),tree.snapshot("p2",500,0,610,680),canvas.parent().css("background","url("+tree.toDataURL("image/png")+")"),$await(Jscex.Async.sleep(300)),canvas.css("background","none")})),jumpAnimate=eval(Jscex.compile("async",function(){for(tree.ctx;;)tree.ctx.clearRect(0,0,width,height),tree.jump(),foot.draw(),$await(Jscex.Async.sleep(25))})),clockAnimate=eval(Jscex.compile("async",function(){var e=new Date;for(e.setFullYear(2018,1,25),e.setHours(5),e.setMinutes(0),e.setSeconds(0),e.setMilliseconds(0),$("#clock-box").fadeIn(2e3);;)timeElapse(e),$await(Jscex.Async.sleep(1e3))})),showPeopleAnimate=eval(Jscex.compile("async",function(){$("#we").fadeIn(5e3)})),isBirthday=isBirthdayOrNot(),isDay520=isDay520OrNot();isBirthday?document.title="Happy Birthday!":isDay520&&(document.title="I ❤ U");var showTypewriterAnimate=eval(Jscex.compile("async",function(){var e="To Jasmin:<br><br>";isBirthday?(e+='<span style="color:#FF4081">Happy 18th birthday<br>',e+=getRandomBirthdayWishes()+"</span><br><br>"):e+=isDay520?getRandomDay520Wishes()+"<br/><br/>":getRandomWord()+"<br><br>";for(var a=0;a<10;a++)e+=" ";e+=" --- From Tianma.",$("#words").html(e),$("#words").show().typewriter()})),runAsync=eval(Jscex.compile("async",function(){$await(seedAnimate()),$await(growAnimate()),$await(flowAnimate()),$await(moveAnimate()),clockAnimate().start(),$await(showPeopleAnimate()),$await(Jscex.Async.sleep(1e3)),$await(showTypewriterAnimate()),$await(jumpAnimate())}));runAsync().start()}();