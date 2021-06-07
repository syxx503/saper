let
	menu		= document.querySelector(".menu"),
	table		= document.querySelector(".contain__table"),
	x, y, startBool = false, sec = 0, gameTime, count, saveCount,
	flagArr = [];

document.getElementById("in").addEventListener("input", function(){
	document.getElementById("bombs").innerText = this.value;
	if (this.value > 130){
		document.getElementById("size").innerText = "35 : 40";
	} else {
		document.getElementById("size").innerText = "20 : 25";
	};
});

function lastBomb(){
	let checkRealCount = saveCount;

	document.querySelectorAll(".item_bomb").forEach(function(bomb){
		if (bomb.classList.contains("item_block") || flagArr.includes("at" + bomb.getAttribute("data-pos"))){
			checkRealCount--;
		};
	});

	if (checkRealCount === 0){
		victory();
		return true;
	};

	return false;
};

function flagLogic(el){
	if (document.getElementById("getFlag").classList.contains("toggle") && !el.classList.contains("open")){
		let attrValue = "at" + el.getAttribute("data-pos");


		if (el.classList.contains("item_flag") && flagArr.length > 0){
			el.classList.remove("item_flag");
			flagArr.splice(flagArr.indexOf(attrValue), 1);
		} else {
			el.classList.add("item_flag");
			flagArr.push(attrValue);
		};

		if (lastBomb()){ return true };

		return true;
	};
};

document.getElementById("btn").addEventListener("click", function(){
	if (this.classList.contains("block")){
		return;
	};
	
	this.classList.add("block");
	saveCount = count = +document.getElementById("in").value;

	if (count > 130){
		x = 35;
		y = 40;

		table.classList.add("bigger");
	} else {
		x = 20;
		y = 25;
	};

	for (let i = 0; i < x; i++){
		for (let j = 0; j < y; j++){
			table.innerHTML +=
			`<button class="contain__item item" data-pos="${j}-${i}" title="${j + 1}-${i + 1}"></button>`
		};
	};

	setTimeout(function(){
		let yet = 0, elem;

		while (yet !== count){
			elem = document.querySelector(`.item[data-pos="${Math.floor(Math.random() * y)}-${Math.floor(Math.random() * x)}"]`)

			if (elem && !elem.classList.contains("item_bomb")){
				elem.innerHTML = `<img class="item__info" src="images/icons/bomb.svg" alt="B">`;
				elem.classList.add("item_bomb");

				yet++
			};
		};

		for (let i = 0; i < x; i++){
			for (let j = 0; j < y; j++){
				elem = document.querySelector(`.item[data-pos="${j}-${i}"]`);
				if (!elem.classList.contains("item_bomb")){
					let checked = checkBomb(i, j);
					if (checked !== 0){
						elem.innerText = checked;
						elem.classList.add("item" + checked);
					} else {
						elem.classList.add("item_zero");
					};
				};
			};
		};

		document.querySelectorAll(".item").forEach(function(el){
			el.addEventListener("click", function(){
				if (!startBool){
					startBool = true;

					gameTime = setInterval(function(){
						sec++;
						document.getElementById("time").innerText =
						`${Math.floor(sec / 3600)}:${Math.floor(sec / 60) % 60}:${sec % 60}`;
					},1000);
				};

				if (flagLogic(el) || el.classList.contains("item_block") || el.classList.contains("item_flag")){ return; };

				if (flagArr.length > 0 && !el.classList.contains("item_open") && !document.getElementById("getFlag").classList.contains("toggle")){
					flagArr.forEach(function(item){
						let
							str = item.substr(2, item.length - 1),
							flagElem = document.querySelector(`.item[data-pos="${str}"`);

						if (flagElem && flagElem.classList.contains("item_bomb")){
							count--;
							document.getElementById("killed").innerText = count;
							flagElem.classList.add("item_block");

							if (count === 0){
								victory();
							};
						} else {
							gameOver();
						};
					});

					let arrLengtht = flagArr.length;
					for (let i = 0; i < arrLengtht; i++){
						flagArr.pop();
					};
				};

				el.classList.add("open");

				if (el.classList.contains("item_bomb")){
					gameOver();
				};
			});
		});

		document.querySelectorAll(".item_zero").forEach(function(el){
			el.addEventListener("click", function(){
				if (document.getElementById("getFlag").classList.contains("toggle")){ return; };

				let arr = el.getAttribute("data-pos").split("-");

				arr[0] = +arr[0]
				arr[1] = +arr[1]

				openZeroOn(arr[0], arr[1]);
			});
		});

		document.body.classList.remove("lock");
		menu.classList.add("delete");
	}, 200);

	document.getElementById("killed").innerText = count;
});

document.getElementById("getFlag").addEventListener("click", function(){
	this.classList.toggle("toggle");
});

function checkBomb(xPos, yPos){
	let c = 0, elemPos;

	for (let i = xPos - 1; i < xPos + 2; i++){
		for (let j = yPos - 1; j < yPos + 2; j++){
			elemPos = getItem(j, i);
			if (elemPos && elemPos.classList.contains("item_bomb")){
				c++
			};
		};
	};

	return c;
};

function getItem(xPos, yPos){
	return document.querySelector(`.item[data-pos="${xPos}-${yPos}"]`);
};

function openZeroOn(xPos, yPos){
	let
		item1 = getItem(xPos, yPos - 1),
		item2 = getItem(xPos + 1, yPos),
		item3 = getItem(xPos, yPos + 1),
		item4 = getItem(xPos - 1, yPos);

		getItem(xPos, yPos).classList.add("open");

	for (let i = xPos - 1; i < xPos + 2; i++){
		for (let j = yPos - 1; j < yPos + 2; j++){
			elemPos = getItem(i, j)
			if (elemPos && !elemPos.classList.contains("item_bomb") && !elemPos.classList.contains("item_zero")){
				elemPos.classList.add("open");
			};
		};
	};

	if (item1 && item1.classList.contains("item_zero") && !item1.classList.contains("open")){
		openZeroOn(xPos, yPos - 1);
	};
	if (item2 && item2.classList.contains("item_zero") && !item2.classList.contains("open")){
		openZeroOn(xPos + 1, yPos)
	};
	if (item3 && item3.classList.contains("item_zero") && !item3.classList.contains("open")){
		openZeroOn(xPos, yPos + 1)
	};
	if (item4 && item4.classList.contains("item_zero") && !item4.classList.contains("open")){
		openZeroOn(xPos - 1, yPos);
	};
};

function gameOver(){
	clearInterval(gameTime);
	document.querySelectorAll(".item").forEach(function(el){
		el.classList.add("open");
	});
	document.querySelectorAll(".item img").forEach(function(img){
		img.getElementsByClassName.display = "none";
	});

	document.getElementById("killed").innerText = "0";
	document.querySelector(".contain__table-alert span").innerText = "Игра Окончена";
	document.querySelector(".contain__table-alert").classList.add("show");
	document.querySelector(".header__smile").src = "images/icons/bad.png";
};

function victory(){
	clearInterval(gameTime);
	document.querySelectorAll(".item").forEach(function(el){
		el.classList.add("open");
		el.classList.remove("item_flag");
	});

	document.querySelectorAll(".item img").forEach(function(img){
		img.getElementsByClassName.display = "none";
	});

	document.getElementById("killed").innerText = "0";
	document.querySelector(".contain__table-alert span").innerText = "Победа!";
	document.querySelector(".contain__table-alert").classList.add("show");
};

document.getElementById("reload").addEventListener("click", function(){
	let reloadBool = confirm("Вы уверены, что хотите перезагрузить страницу? Прохождение этой игры будет утеряно.")
	
	if(reloadBool){
		window.location.reload(false);
	};
});

document.body.addEventListener("keydown", function(e){
	if(e.ctrlKey){
		document.getElementById("getFlag").classList.add("toggle");
	};
});

document.body.addEventListener("keyup", function(e){
	document.getElementById("getFlag").classList.remove("toggle");
});

document.querySelectorAll(".footer__link").forEach(function(el){
	el.target = "_blank";
});

let bombs = 40;
if (localStorage.getItem("bombs") !== null){
	bombs = +localStorage.getItem("bombs");
};

document.getElementById("in").value = bombs;
document.getElementById("bombs").innerText = bombs;

if (bombs > 130){
	document.getElementById("size").innerText = "35 : 40";
} else {
	document.getElementById("size").innerText = "20 : 25";
};

window.addEventListener("unload", function(){
	localStorage.setItem("bombs", document.getElementById("in").value);
});