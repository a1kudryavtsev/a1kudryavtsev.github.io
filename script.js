document.querySelector("form[name=tattoo]").addEventListener("change", editTattoo); // Слушаем изменение формы

/* let order = {
	name: "",
	inst: "",
	tattoo: [],
	sum: ""
};
*/

let tattoo = {
	'time-h': "",
	'time-m': "",
	'size-w': "",
	'size-h': "",
	'place': "",
	'place-diff': "",
	'sketch': "",
	'sketch-style': "",
	'sketch-diff': "",
	'color-m': "",
	'color-o': "",
	'fill': "",
	'material-spine': "",
	'material-dye': "",
	'sale': "",
	'promo': "",
	'sum': ""
}

function editTattoo() {
  if (event.target.tagName = "input") { // Если произошло изменение в поле
		tattoo.[event.target.name] = event.target.value;
		calcTattoo(this);
  }
	
}

function calcTattoo(form){
	
	let price_time = 75; // Минимальная стоимость минуты в рублях
	let cost_time = price_time; // Итоговая стоимость минуты в рублях
	let work_material = 240; // Стоимость расходников в рублях
	let start_price = 300 // Стартовый прайс за начало работы в рублях

	let work_time = +tattoo.['time-h'] * 60 + +tattoo.['time-m']; // Время работы в минутах
	
	// Стоимост заживляющей плёнки в рублях
	let work_membrane = (tattoo.['size-w'] !== 0 && tattoo.['size-h'] !== 0) ? work_material = work_material + 0.14 * ((+tattoo.['size-w'] + 1) * (+tattoo.['size-h'] + 1)) : ""; 
	
	// Сложность места
	let place_diff = (tattoo.['place-diff'] == "easy") ? "" : // простое
									 (tattoo.['place-diff'] == "medium") ? cost_time = cost_time + price_time * 0.10 : // стандартное
									 (tattoo.['place-diff'] == "hard") ? cost_time = cost_time + price_time * 0.20 : ""; // сложное
	
	// Сложность эскиза
	let sketch_diff = (tattoo.['sketch-diff'] !== 0) ? cost_time = cost_time + price_time * ((+tattoo.['sketch-diff'] - 1) * 0.025) : "";
	
	// Цвет работы
	let work_color_m = (tattoo.['color-m'] == "color") ? cost_time = cost_time + price_time * 0.20 : "";
	
	// Дополнительные цвет работы (Игла + Типс + Кэпс + Краска)
	let work_color_o = (tattoo.['color-o'] !== 0) ? work_material = work_material + tattoo.['color-o'] * 55 : "";
	
	// Покрас работы
	let work_fill = (tattoo.['fill'] == "none") ? "" : // без покраса
									(tattoo.['fill'] == "low") ? cost_time = cost_time + price_time * 0.05 : // минимум
									(tattoo.['fill'] == "medium") ? cost_time = cost_time + price_time * 0.10 : // стандарт
									(tattoo.['fill'] == "full") ? cost_time = cost_time + price_time * 0.15 : ""; // полный
	
	// Дополнительные раходники
	work_material = (tattoo.['material-spine'] > 0) ? work_material + +tattoo.['material-spine'] * 35 : work_material; // доп. иглы
	work_material = (tattoo.['material-dye'] > 0) ? work_material + +tattoo.['material-spine'] * 20 : work_material; // доп. краска

	// Скидка за объём работы
	cost_time = (work_time <= 30) ? cost_time : // Тариф S
							(work_time > 30 && work_time <= 60) ? cost_time * (1 - 0.15): // Тариф M
							(work_time > 60 && work_time <= 120) ? (cost_time * (1 - 0.15)) * (1 - 0.10): // Тариф L
							(work_time > 120) ? ((cost_time * (1 - 0.15)) * (1 - 0.10)) * (1 - 0.05): ""; // Тариф XL
	
	// Итоговая формула
	// Стартовый прайс + Стоимость времние * Время рабрты + Расходники
	let sum = start_price + cost_time * work_time + work_material;
	
	// Персональная цена
	let sale = (tattoo.['sale'] != 0) ? sum = sum + sum / 100 * +tattoo.['sale'] : "";

	// Акции
	let promo = (tattoo.['promo'] == "mini-tattoo-500") ? sum = 500 : "";

	sum = Math.ceil(sum / 50) * 50; // Округляем с шагом в 50
	form.querySelector("input[name=sum]").value = sum;
}

// Counter -NUM+

function decreaseValue(el) {
  let input = document.querySelector("input[name=" + el.getAttribute("name") + "]");
  let result = input.value > 0 ? input.value = --input.value : "";
	input.dispatchEvent(new Event('change', { bubbles: true }));
}

function increaseValue(el) {
  let input = document.querySelector("input[name=" + el.getAttribute("name") + "]");
  let result = input.value < 10 ? input.value = ++input.value : "";
	input.dispatchEvent(new Event('change', { bubbles: true }));
}