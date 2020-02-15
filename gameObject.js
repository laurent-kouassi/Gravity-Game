class Scene {
	children: [],
	function update() {
       for (const child of scene.children){
       	child.update();
       } 
	}
}

class Vector2 {
  constructor(x, y) {
  	this.x = x;
  	this.y = y;
  }
}

class GameObject {
	constructor({element, size, length, velocity}) {
		this.element = element;
		this.size = size;
		this.length = length;
		this.velocity = velocity;
	}
	update() {

	}
}



//// Function ////


function renderDOM(scene){
	for(const child of scene.children){
		const {element, position: {x ,y} } = child;
		element.style.transform = `translate2d(${x}px, ${y}px)`;
	}
}


function random(min,max){
    return Math.round(Math.random() * (max-min) + min);
}


function start(){
	const scene = new Scene();
	// scene.children.push(new GameObject({
	// 	element: document.querySelector('one')
	// }));
    var length = random(100, ($(".scene").width() - 100));
    var velocity = random(850, 10000);
    var size = random(50, 150);

	scene.children.push(new GameObject({
		element: $("<div/>", {
					    class: "box",
					    style: "width:" +size+ "px; height:"+size+"px; left:" + length+  "px; transition: transform " +velocity+ "ms linear;"
					    }
				   )
	}));

	function mainLoop(scene){
		requestAnimationFrame(mainLoop);
		scene.update();
		renderDOM(scene);
	}
	mainLoop();
}


// start();
