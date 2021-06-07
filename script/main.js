let x,y,gameTime,count,saveCount,menu=document.querySelector(".menu"),table=document.querySelector(".contain__table"),startBool=!1,sec=0,flagArr=[],fastStart=!0;function lastBomb(){let e=saveCount;return document.querySelectorAll(".item_bomb").forEach((function(t){(t.classList.contains("item_block")||flagArr.includes("at"+t.getAttribute("data-pos")))&&e--})),0===e&&(victory(),!0)}function flagLogic(e){if(document.getElementById("getFlag").classList.contains("toggle")&&!e.classList.contains("open")){let t="at"+e.getAttribute("data-pos");return e.classList.contains("item_flag")&&flagArr.length>0?(e.classList.remove("item_flag"),flagArr.splice(flagArr.indexOf(t),1)):(e.classList.add("item_flag"),flagArr.push(t)),lastBomb(),!0}}function checkBomb(e,t){let n,o=0;for(let s=e-1;s<e+2;s++)for(let e=t-1;e<t+2;e++)n=getItem(e,s),n&&n.classList.contains("item_bomb")&&o++;return o}function getItem(e,t){return document.querySelector(`.item[data-pos="${e}-${t}"]`)}function openZeroOn(e,t){let n=getItem(e,t-1),o=getItem(e+1,t),s=getItem(e,t+1),a=getItem(e-1,t);getItem(e,t).classList.add("open");for(let n=e-1;n<e+2;n++)for(let e=t-1;e<t+2;e++)elemPos=getItem(n,e),!elemPos||elemPos.classList.contains("item_bomb")||elemPos.classList.contains("item_zero")||elemPos.classList.add("open");n&&n.classList.contains("item_zero")&&!n.classList.contains("open")&&openZeroOn(e,t-1),o&&o.classList.contains("item_zero")&&!o.classList.contains("open")&&openZeroOn(e+1,t),s&&s.classList.contains("item_zero")&&!s.classList.contains("open")&&openZeroOn(e,t+1),a&&a.classList.contains("item_zero")&&!a.classList.contains("open")&&openZeroOn(e-1,t)}function gameOver(){clearInterval(gameTime),document.querySelectorAll(".item").forEach((function(e){e.classList.add("open")})),document.querySelectorAll(".item img").forEach((function(e){e.getElementsByClassName.display="none"})),document.getElementById("killed").innerText="0",document.querySelector(".contain__table-alert span").innerText="Игра Окончена",document.querySelector(".contain__table-alert").classList.add("show"),document.querySelector(".header__smile").src="images/icons/bad.png"}function victory(){clearInterval(gameTime),document.querySelectorAll(".item").forEach((function(e){e.classList.add("open"),e.classList.remove("item_flag")})),document.querySelectorAll(".item img").forEach((function(e){e.getElementsByClassName.display="none"})),document.getElementById("killed").innerText="0",document.querySelector(".contain__table-alert span").innerText="Победа!",document.querySelector(".contain__table-alert").classList.add("show")}document.getElementById("in").addEventListener("input",(function(){document.getElementById("bombs").innerText=this.value,this.value>130?document.getElementById("size").innerText="35 : 40":document.getElementById("size").innerText="20 : 25"})),localStorage.getItem("fastStart")&&("true"===localStorage.getItem("fastStart")?(document.getElementById("fastStart").setAttribute("checked","checked"),document.querySelector(".menu__fake").classList.remove("menu__fake_unchecked"),fastStart=!0):(document.getElementById("fastStart").removeAttribute("checked"),document.querySelector(".menu__fake").classList.add("menu__fake_unchecked"),fastStart=!1)),document.getElementById("fastStart").addEventListener("change",(function(){fastStart=this.checked,fastStart?document.querySelector(".menu__fake").classList.remove("menu__fake_unchecked"):document.querySelector(".menu__fake").classList.add("menu__fake_unchecked")})),document.getElementById("btn").addEventListener("click",(function(){if(!this.classList.contains("block")){this.classList.add("block"),saveCount=count=+document.getElementById("in").value,count>130?(x=35,y=40,table.classList.add("bigger")):(x=20,y=25);for(let e=0;e<x;e++)for(let t=0;t<y;t++)table.innerHTML+=`<button class="contain__item item" data-pos="${t}-${e}" title="${t+1}-${e+1}"></button>`;setTimeout((function(){let e,t=0;for(;t!==count;)e=document.querySelector(`.item[data-pos="${Math.floor(Math.random()*y)}-${Math.floor(Math.random()*x)}"]`),e&&!e.classList.contains("item_bomb")&&(e.innerHTML='<img class="item__info" src="images/icons/bomb.svg" alt="B">',e.classList.add("item_bomb"),t++);for(let t=0;t<x;t++)for(let n=0;n<y;n++)if(e=document.querySelector(`.item[data-pos="${n}-${t}"]`),!e.classList.contains("item_bomb")){let o=checkBomb(t,n);0!==o?(e.innerText=o,e.classList.add("item"+o)):e.classList.add("item_zero")}if(document.querySelectorAll(".item").forEach((function(e){e.addEventListener("click",(function(){if(startBool||(startBool=!0,gameTime=setInterval((function(){sec++,document.getElementById("time").innerText=`${Math.floor(sec/3600)}:${Math.floor(sec/60)%60}:${sec%60}`}),1e3)),!(flagLogic(e)||e.classList.contains("item_block")||e.classList.contains("item_flag"))){if(flagArr.length>0&&!e.classList.contains("item_open")&&!document.getElementById("getFlag").classList.contains("toggle")){flagArr.forEach((function(e){let t=e.substr(2,e.length-1),n=document.querySelector(`.item[data-pos="${t}"`);n&&n.classList.contains("item_bomb")?(count--,document.getElementById("killed").innerText=count,n.classList.add("item_block"),0===count&&victory()):gameOver()}));let e=flagArr.length;for(let t=0;t<e;t++)flagArr.pop()}e.classList.add("open"),e.classList.contains("item_bomb")&&gameOver()}}))})),fastStart){let e,t=document.querySelectorAll(".item_zero");if(t){e=t[Math.floor(Math.random()*t.length)],e.classList.add("open");let n=e.getAttribute("data-pos").split("-");openZeroOn(+n[0],+n[1])}else alert("Ошибка существования пустой ячейки. Пожалуйста, порезагрузите страницу")}document.querySelectorAll(".item_zero").forEach((function(e){e.addEventListener("click",(function(){if(document.getElementById("getFlag").classList.contains("toggle"))return;let t=e.getAttribute("data-pos").split("-");openZeroOn(+t[0],+t[1])}))})),document.body.classList.remove("lock"),menu.classList.add("delete")}),200),document.getElementById("killed").innerText=count}})),document.getElementById("getFlag").addEventListener("click",(function(){this.classList.toggle("toggle")})),document.getElementById("reload").addEventListener("click",(function(){confirm("Вы уверены, что хотите перезагрузить страницу? Прохождение этой игры будет утеряно.")&&window.location.reload(!1)})),document.body.addEventListener("keydown",(function(e){e.ctrlKey&&document.getElementById("getFlag").classList.add("toggle")})),document.body.addEventListener("keyup",(function(e){document.getElementById("getFlag").classList.remove("toggle")})),document.querySelectorAll(".footer__link").forEach((function(e){e.target="_blank"}));let bombs=40;null!==localStorage.getItem("bombs")&&(bombs=+localStorage.getItem("bombs")),document.getElementById("in").value=bombs,document.getElementById("bombs").innerText=bombs,document.getElementById("size").innerText=bombs>130?"35 : 40":"20 : 25",window.addEventListener("unload",(function(){localStorage.setItem("bombs",document.getElementById("in").value),localStorage.setItem("fastStart",fastStart)}));