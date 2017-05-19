/**
 * Created by lll on 2017/5/6.
 */
/*加载时动画*/
var currentShowPageIndex = 0,
    animateTimeout = null,
    isWheelAnimating = false;
var isWheelUp = function(event){
    event = event || window.event;
    var up = true;
    if(event.wheelDelta){            //火狐以外浏览器
        up = event.wheelDelta / 120 == 1 ? true:false;
    }
    else {                           //火狐浏览器
        up = event.detail / 3 == 1 ? false:true;
    }
    return up;
};

var changeBar = function(prevIndex,index){
    var barUl = document.getElementById("navBar");
    var barLiList = barUl.getElementsByTagName("li");
    barLiList[prevIndex].className = '';
    barLiList[index].className = "active";
};

var changePage = function(pageIndex){
    var showPageUl = document.getElementById("cvList"),
        showPageLiList = showPageUl.getElementsByTagName("li");
    changeBar(currentShowPageIndex,pageIndex);
    if(pageIndex > currentShowPageIndex){
        animate(showPageUl,"top",-(currentShowPageIndex) * 1000, -(pageIndex) * 1000);
        alphaPlay(showPageLiList[pageIndex].getElementsByTagName("div")[0],"show");
    }
    else{
        animate(showPageUl,"bottom",-(currentShowPageIndex) * 1000, -(pageIndex) * 1000);
        alphaPlay(showPageLiList[pageIndex].getElementsByTagName("div")[0],"show");
    }
    currentShowPageIndex = pageIndex;
    return;
};

var animate = function(obj,mode,from,to){
    if(animateTimeout){
        clearTimeout(animateTimeout);
    }
   if(mode == "top"){
        if(from > to){                       //向上
            from -= 100;


            var showPageUl = document.getElementById("cvList"),
                showPageLiList = showPageUl.getElementsByTagName("li");

            obj.style.marginTop = (to) + "px";

            setTimeout(function(){
                animate(obj,mode,from,to);
            },10);
        }
        else{
            isWheelAnimating = false;
        }
        return;
   }
   else{
       if(from < to ){                          //向下
           from += 100;


           var showPageUl = document.getElementById("cvList"),
               showPageLiList = showPageUl.getElementsByTagName("li");

           obj.style.marginTop = (to) + "px";
           setTimeout(function(){
               animate(obj,mode,from,to);
           },10);
       }
       else{
           isWheelAnimating = false;
       }
   }
};

var mouseWheel = function(event){
    if(isWheelAnimating){
        return;
    }
    isWheelAnimating = true;
    var wheelUp = isWheelUp(event),
        showPageUl = document.getElementById("cvList"),
        showPageLiList = showPageUl.getElementsByTagName("li"),
        showPageLiListLength = showPageLiList.length;
    if(wheelUp){
        if(currentShowPageIndex >= 1 ){
            changeBar( currentShowPageIndex,currentShowPageIndex-1 );
            currentShowPageIndex -=1;
            var from = -(currentShowPageIndex+1) * 1000;
            var to = -(currentShowPageIndex) * 1000;
            animate(showPageUl,"bottom",from,to);

            alphaPlay(showPageLiList[currentShowPageIndex].getElementsByTagName("div")[0],"show");
            return;
        }
        else {
            changeBar( currentShowPageIndex,showPageLiListLength-1 );
            currentShowPageIndex = showPageLiListLength;

            currentShowPageIndex -=1;
            var from = -(currentShowPageIndex+1) * 1000;
            var to = -(currentShowPageIndex) * 1000;
            animate(showPageUl,"bottom",from,to);

            alphaPlay(showPageLiList[currentShowPageIndex].getElementsByTagName("div")[0],"show");
            return;
        }

    }
    if(!wheelUp){
        if(currentShowPageIndex < showPageLiListLength -1){
            changeBar(currentShowPageIndex,currentShowPageIndex+1);
            currentShowPageIndex +=1;
            var from = -(currentShowPageIndex-1) * 1000;
            var to = -(currentShowPageIndex) * 1000;
            animate(showPageUl,"top",from,to);

            alphaPlay(showPageLiList[currentShowPageIndex].getElementsByTagName("div")[0],"show");
            return;
        }
        else{
            changeBar(currentShowPageIndex,0);
            currentShowPageIndex = -1;
            currentShowPageIndex +=1;
            var from = -(currentShowPageIndex-1) * 1000;
            var to = -(currentShowPageIndex) * 1000;
            animate(showPageUl,"top",from,to);

            alphaPlay(showPageLiList[currentShowPageIndex].getElementsByTagName("div")[0],"show");

            return;
        }
        }

    isWheelAnimating = false;
};

if(document.addEventListener){
    document.addEventListener('DOMMouseScroll', function(event){
        mouseWheel(event);
    },false);
}
document.onmousewheel = function(event){
        mouseWheel(event);

}
window.onload = function(){
    var introduce =document.getElementById("introduce");
    var cvBasicInformation = document.getElementsByClassName("cvBasicInformation")[0];
    var close = document.getElementsByClassName("close")[0];
    var cvPersonalInformation = document.getElementsByClassName("cvPersonalInformation")[0];
    var navBar = document.getElementById("navBar");
    var navbarLi = navBar.getElementsByTagName("li");
    var wechat = document.getElementById("wechat");
    var wechatBox = document.getElementById("wechatBox");
    var wechatClose = document.getElementsByClassName("wechat-close")[0];
    var maskLayer = document.getElementById("maskLayer");
    var cancelAuto = document.getElementById("cancelAuto");


    for(var i = 0 ; i < navbarLi.length ; i++ ){
        (function(index){
            navbarLi[index].onclick = function(){
                changePage(index);
            }
        })(i);
    }
    alphaPlay(cvPersonalInformation,"show");
    alphaPlay(navBar,"show");


    introduce.onclick = function(e){
        alphaPlay(cvBasicInformation,"show");
        stopBubble(e);
        document.onclick = function(){
            alphaPlay(cvBasicInformation,"hidden");
            document.onclick = null;
        };

    };
    cvBasicInformation.onclick = function(e){
        stopBubble(e);
    }
    close.onclick = function(){
        alphaPlay(cvBasicInformation,"hidden");

    };
    wechat.onclick = function(e){
        alphaPlay(wechatBox,"show");
        maskLayer.style.display = "block";
    };
    wechatBox.onclick = function(e){
        stopBubble(e);
    }
    wechatClose.onclick = function(){
        alphaPlay(wechatBox,"hidden");
        maskLayer.style.display = "none";
    };
    var index = 0;
    var time =setInterval(function(){
        if(index >= 5){
            index = -1;
        }
        index += 1;
        changePage(index);
        return index;
    },3000);
    cancelAuto.onclick = function(){
        if(cancelAuto.innerHTML == "取消自动播放"){
            cancelAuto.innerHTML = "恢复自动播放";
            clearInterval(time);
        }
        else{
            cancelAuto.innerHTML = "取消自动播放";
            time = setInterval(function(){
                if(index >= 5){
                    index = -1;
                }
                index += 1;
                changePage(index);
                return index;
            },3000);
        }
    };
};


function alphaPlay(obj,method){ //method有两个值show或hiden
    var n = (method == "show") ? 0 : 100,
        ie = (window.ActiveXObject) ? true : false;
    var time = setInterval(function(){
        if(method == "show"){
            if(n < 100){
                n+=10;
                if(ie){
                    obj.style.cssText = "filter:alpha(opacity="+n+")";
                }else{
                    (n==100) ? obj.style.opacity = 1 : obj.style.opacity = "0."+n;
                }
            }else{
                clearTimeout(time);
            }
        }else{
            if(n > 0){
                n-=10;
                if(ie){
                    obj.style.cssText = "filter:alpha(opacity="+n+")";
                }else{
                    obj.style.opacity = "0."+n;
                }
            }else{
                clearTimeout(time);
            }
        }
    },30);
}

//阻止冒泡
function stopBubble(e){
    if(e && e.stopPropagation()){
        e.stopPropagation();         //w3c
    }
    else{
        window.event.cancelBubble = true;     //IE
    }
}
