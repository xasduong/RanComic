import {images} from "./api.js"
const z = document.querySelector.bind(document)
const zz = document.querySelectorAll.bind(document)
let title = z('title');
/* ---------------------------------------------------------------------------- */
let boxImg = z('#web-img');
let boxNav = z('#box-name_list');
let currentComic = z('.current-comic');
let isServer = 1;
let webItem = z('#web-item')
let getRandom = Math.floor(Math.random() * images.length);
let boxComic = z('#box-comic');
(function startWeb() {
	handleImages(getRandom, boxImg);
	let arrayImages = images.sort((a, b) => b.lengthImg - a.lengthImg)
	webItem.innerHTML = arrayImages.map(renderItemComic).join('');
	handleWebItem();
	webItem.onclick = () => {
		webItem.classList.add('close');
	}
	boxComic.onclick = () => {
		webItem.classList.remove('close');
	}
})();
function handleWebItem() {
	let comicInfor = zz('.web-item_infor');
	comicInfor[getRandom].classList.add('item_choose')
	comicInfor.forEach((item, index) => {
		item.addEventListener('click', () => {
			if (index !== getRandom) {
				item.classList.add('item_choose');
				let extraComic = document.createElement('div');
				extraComic.setAttribute('class', 'extra-comic');
				let extrHeadComic = document.createElement('div');
				extrHeadComic.innerText = "Đọc tiếp: " + images[index].nameComic.replace(/-/g, " ");
				boxImg.appendChild(extraComic);
				extrHeadComic.setAttribute('id', images[index].nameComic)
				extraComic.appendChild(extrHeadComic);
				handleImages(index, extraComic);
			}
		})
	})
}
function renderItemComic(item){
	let srcImage = "https://i.postimg.cc/" + item.listImg[0].nameUrl + "/"+ item.nameComic 
	+ "-" + item.listImg[0].numImg + '.jpg'
	let nameComic = item.nameComic.replace(/-/g, " ");
	let numComic =  item.lengthImg + " ảnh ";
	return (`
		<div class="web-item_infor">
			<img src=${srcImage} alt="">
			<div class="item_infor-name">${nameComic}</div>
			<div class="item_infor-num">${numComic}</div>
		</div>
	`)
}
function handleImages(index, boxImg){
	let getListImg = images[index].listImg.sort((a,b) => a.numImg - b.numImg);
	let getNameComic = images[index].nameComic;
	title.innerText = "Reading: " + getNameComic.replace(/-/g, " ");
	currentComic.innerText = getNameComic.replace(/-/g, " ");
	function renderNameCurrent(){
		let a = document.createElement('a');
		a.innerText = getNameComic.replace(/-/g, " ");
		a.href ='#' + getNameComic;
		boxNav.appendChild(a);
	} renderNameCurrent();
	renderImage(index, getListImg);
	function renderImage(index, getListImg){
		for (let i = 1; i < images[index].lengthImg; i++) {
			let img = document.createElement('img');
			img.setAttribute('id', "numImg-" + i);
			switch(isServer) {
				case 0: {
					img.src = "https://i.postimg.cc/" + getListImg[i].nameUrl + "/"+ getNameComic 
						+ "-" + getListImg[i].numImg + '.jpg';
					break;
				}
				case 1: {
					img.src = "img/" + images[index].nameComic + "/"+ images[index].nameComic+ ' ('+ i +').jpg'
					break;
				}
			}
			boxImg.appendChild(img);
		}
	}
}
