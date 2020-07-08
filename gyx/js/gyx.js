// 判断PC登录跳转到另一个页面
if (!(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent))) {
    window.location.href = "http://www.baidu.com";
}


$(".hw_img").css("opacity","1");
$("#show").css("opacity","1");
//实例化swiper
var swiper = new Swiper(".swiper-container", {  
	direction: "vertical", 
	on: {
	    slideChangeTransitionEnd: function(){//切换结束时，告诉我现在是第几个slide
		    //赋值第几个slide的下标
			var sweiperNum = (this.activeIndex)+1;  
			//判断滑动到第几屏时触发函数
		    if(sweiperNum==1){
		    	$(".plan").css("width","20%");
		    }
		    if(sweiperNum==2){
		      	$(".plan").css("width","40%");
		      	typing.start()
		    }
		    if(sweiperNum==3){
		        $(".plan").css("width","60%");
		    }
		    if(sweiperNum==4){
		        $(".plan").css("width","80%");
		    }
		    if(sweiperNum==5){
		        $(".plan").css("width","100%");
		    }
	    },
	},
});  


//3D旋转
var swiper = new Swiper('.swiper-3D', {
  	effect: 'cube',
  	loop:true,
  	grabCursor: true,
  	cubeEffect: {
    shadow: true,
    slideShadows: true,
    shadowOffset: 20,
    shadowScale: 0.94,
  },
});



//音乐图标旋转
var music = document.getElementsByClassName("music")[0];
var oA = document.getElementsByClassName("audio")[0];

//设置旋转初始值
var musicNum = 0;

//封装旋转函数
var musicRotate = function(){
	musicNum+=5;
	music.style.transform = "rotate("+musicNum+"deg)";
}

//定时器
var musicTimer = setInterval(musicRotate,100);


//定义音乐开关
var musicIsoff=true;

//点击开关
music.onclick = function(){
	if(musicIsoff==true){
		clearInterval(musicTimer); 
		musicIsoff=false;
		oA.pause();
	}else{ 
		musicTimer = setInterval(musicRotate,100);
		musicIsoff=true;
		oA.play();
	}
}



//页面打印文字效果
class Typing {
	constructor(opts) {
		this.opts = opts || {};
		this.source = opts.source;
		this.output = opts.output;
		this.delay = opts.delay || 120;
		this.chain = {
			parent: null,
			dom: this.output,
			val: []
		};
		if(!(typeof this.opts.done === 'function')) this.opts.done = function() {};
	}

	init() {
		//初始化函数
		this.chain.val = this.convert(this.source, this.chain.val);
	}

	convert(dom, arr) {
		//将dom节点的子节点转换成数组，
		let children = Array.from(dom.childNodes)
		for(let i = 0; i < children.length; i++) {
			let node = children[i]
			if(node.nodeType === 3) {
				arr = arr.concat(node.nodeValue.split('')) //将字符串转换成字符串数组，后面打印时才会一个一个的打印
			} else if(node.nodeType === 1) {
				let val = []
				val = this.convert(node, val)
				arr.push({
					'dom': node,
					'val': val
				})
			}
		}
		return arr
	}

	print(dom, val, callback) {
		setTimeout(function() {
			dom.appendChild(document.createTextNode(val));
			callback();
		}, this.delay);
	}

	play(ele) {
		//当打印最后一个字符时，动画完毕，执行done
		if(!ele.val.length) {
			if(ele.parent) this.play(ele.parent);
			else this.opts.done();
			return;
		}
		let current = ele.val.shift() //获取第一个元素，同时删除数组中的第一个元素
		if(typeof current === 'string') {
			this.print(ele.dom, current, () => {
				this.play(ele); //继续打印下一个字符
			})
		} else {
			let dom = current.dom.cloneNode() //克隆节点，不克隆节点的子节点，所以不用加参数true
			ele.dom.appendChild(dom)
			this.play({
				parent: ele,
				dom,
				val: current.val
			})
		}
	}

	start() {
		this.init();
		this.play(this.chain);
	}
}

let source = document.getElementById('source')
let output = document.getElementById('output')
let typing = new Typing({
	source,
	output
})




//渲染时间


function count_down(o) {
	var datatime = /^[\d]{4}-[\d]{1,2}-[\d]{1,2}( [\d]{1,2}:[\d]{1,2}(:[\d]{1,2})?)?$/ig,
		str = '',
		conn, s;
	if(!o.match(datatime)) {
		alert('参数格式为2020-01-01[ 01:01[:01]].\r其中[]内的内容可省略');
		return false;
	}
	var sec = (new Date(o.replace(/-/ig, '/')).getTime() - new Date().getTime()) / 1000;
	if(sec > 0) {
		conn = '还有';
	} else {
		conn = '已过去';
		sec *= -1;
	}
	s = {
		'天': sec / 24 / 3600,
		'小时': sec / 3600 % 24,
		'分': sec / 60 % 60,
		'秒': sec % 60
	};
	for(i in s) {
		if(Math.floor(s[i]) > 0) str += Math.floor(s[i]) + i;
	}
	if(Math.floor(sec) == 0) {
		str = '0秒';
	}
	document.getElementById('show').innerHTML = '我们相识于<div class="date_1">' + o + '</div><div class="date_3">' + conn + '</div><div class="date_2">' + str + '</div>';
	setTimeout(function() {
		count_down(o)
	}, 1000);
}
count_down('2019-7-25 19:54:30');


//花瓣


$(function() {
    var snowflakeURl = [
        './img/icon_petal_1.png',
        './img/icon_petal_2.png',
        './img/icon_petal_3.png',
        './img/icon_petal_4.png',
        './img/icon_petal_5.png',
        './img/icon_petal_6.png',
        './img/icon_petal_7.png',
        './img/icon_petal_8.png'
    ]  
    var container = $("#content");
       visualWidth = container.width();
       visualHeight = container.height();
　　//获取content的宽高
    function snowflake() {
        // 雪花容器
        var $flakeContainer = $('#snowflake');
　　　　　　
        // 随机六张图
        function getImagesName() {
            return snowflakeURl[[Math.floor(Math.random() * 8)]];
        }
        // 创建一个雪花元素
        function createSnowBox() {
            var url = getImagesName();
            return $('<div class="snowbox" />').css({
                'width': 25,
                'height': 26,
                'position': 'absolute',
                'backgroundRepeat':'no-repeat',
                'zIndex': 100000,
                'top': '-41px',
                'backgroundImage': 'url(' + url + ')'
            }).addClass('snowRoll');
        }
        // 开始飘花
        setInterval(function() {
            // 运动的轨迹
            var startPositionLeft = Math.random() * visualWidth - 100,
                startOpacity    = 1,
                endPositionTop  = visualHeight - 40,
                endPositionLeft = startPositionLeft - 100 + Math.random() * 500,
                duration        = visualHeight * 10 + Math.random() * 5000;
            // 随机透明度，不小于0.5
            var randomStart = Math.random();
            randomStart = randomStart < 0.5 ? startOpacity : randomStart;
            // 创建一个雪花
            var $flake = createSnowBox();
            // 设计起点位置
            $flake.css({
                left: startPositionLeft,
                opacity : randomStart
            });
            // 加入到容器
            $flakeContainer.append($flake);
            // 开始执行动画
            $flake.transition({
                top: endPositionTop,
                left: endPositionLeft,
                opacity: 0.7
            }, duration, 'ease-out', function() {
                $(this).remove() //结束后删除
            });
        }, 500);
    }
     snowflake()
　　　//执行函数
})
