document.body.onload=()=>{document.querySelector(".main__bgi").style.animation="rotateBomb .1s linear 5"};let bombBgiSize,seconds=localStorage.getItem("seconds");function fromStrToNum(t){switch(t){case"zero":return 0;case"one":return 1;case"two":return 2;case"three":return 3;case"four":return 4;case"five":return 5;case"six":return 6;case"seven":return 7;case"eight":return 8;case"one-coin":return 1;case"five-coin":return 5;case"ten-coin":return 10;case"fifty-coin":return 50}}bombBgiSize=window.innerHeight<window.innerWidth?"80vh":"80vw",document.querySelector(".main__bgi").style.width=bombBgiSize,document.querySelector(".main__bgi").style.height=bombBgiSize,document.querySelectorAll(".statistic__column[data-count]").forEach((t=>{let e=t.getAttribute("data-count"),o=localStorage.getItem(e),r="0";if("hours"!==e&&"minutes"!==e){if(o){let e=+t.getAttribute("data-max");r=e&&+o>e?e+"+":o}t.innerText=r}})),document.querySelector('.statistic__column[data-count="hours"]').innerText=(seconds/3600).toFixed(3),document.querySelector('.statistic__column[data-count="minutes"]').innerText=(seconds/60).toFixed(2)%60;let setOfLot=[];document.querySelectorAll(".item__collection[data-collect]").forEach((function(t){let e=t.getAttribute("data-collect");-1===e.indexOf(" ")?localStorage.getItem(e)&&(t.innerHTML="",t.classList.add("open"),-1===e.indexOf("coin")?"zero"!==e&&(t.innerHTML=`<span>${fromStrToNum(e)}</span>`,t.children[0].classList.add(`item${fromStrToNum(e)}`)):t.innerHTML=`<img src="images/coins/${e}.svg" alt="${fromStrToNum(e)}" data-coin">`):setOfLot.push(t)})),setOfLot.forEach((function(t){let e=t.getAttribute("data-collect").split(" ");for(let o=0;o<e.length;o++){let r=e[o];if(+localStorage.getItem(r)&&t.getAttribute("data-src")){t.classList.add("open"),t.innerHTML=`<img src="${t.getAttribute("data-src")}" alt="error">`,t.classList.add(`item${fromStrToNum(r)}`);break}}})),document.querySelectorAll(".item__social").forEach((function(t){t.setAttribute("target","_blank")}));