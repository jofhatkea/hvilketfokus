window.addEventListener('load', loaded);
console.log("jhi mom")
let paint;
let data = JSON.parse(window.localStorage.getItem("fodata"));
if(!data){
  //TODO tror ikke jeg bruger X, træt af at slås med greensocks transforms
  //1 lær at læse/parse matrix
  data = {
    0: {t:"SEO",x:"",y:""},
    1: {t:"Using the WP Admin interface",x:"",y:""},
    2: {t:"CSS",x:"",y:""},
    3: {t:"Styletiles",x:"",y:""},
  }
  window.localStorage.setItem("fodata",JSON.stringify(data));
}

let colors = {
    tl: "#FF0000",
    tr: "#00FF00",
    br: "#0000FF",
    bl: "#F0F0F0"
};

function loaded() {
    paint = document.querySelector('#progress');
    for (let i = 0; i < Object.keys(data).length; i++) {
        let d = document.createElement('div');
        d.classList.add('topic');
        if (data[i]) {
            let p = document.createElement('p');
            p.innerHTML = data[i].t;
            d.dataset.fokey=i;
          if(data[i].x){
            d.style.left=data[i].x;
            console.log(d)
          }
            d.appendChild(p);
        }
        d.addEventListener('mouseenter', e => {
            TweenMax.to(e.target, 0.7, {
                rotation: 0,
                ease: Back.easeOut.config(1.7)
            });
        });
        paint.appendChild(d);
    }
    animate();
}

function animate() {
    let tl = new TimelineMax();
    let days = document.querySelectorAll('.topic');
    tl.delay(1).fromTo(days, 2.3, {
        x: () => Math.random() * 400 - 200,
        y: () => Math.random() * 400 - 200,
        autoAlpha: 0,
        zIndex: () => Math.random() * 20,
        ease: Elastic.easeOut.config(1, 0.3)
    }, {
        x: 0,
        y: 0,
        rotation: () => Math.random() * 360 - 180,
        autoAlpha: 1
    });
    whatADraggable();
}

function whatADraggable() {
    let draggables = Draggable.create(".topic", {
        type: "x,y",
        edgeResistance: 0.65,
        bounds: "#progress"
    });
    draggables.forEach((d) => {
        d.addEventListener("release", (e) => {
                let x = Math.round((d.target.offsetLeft + d.endX));
                let y = Math.round((d.target.offsetTop + d.endY));
                let width = window.innerWidth;
                let height = window.innerHeight;
                let pos="b";
                if (y < height / 2) {
                    pos="t";
                }
                if (x < width / 2) {
                    pos+="l";
                } else {
                    pos+="r";
                }
                data[d.target.dataset.fokey].x=x;
                data[d.target.dataset.fokey].y=y;
                d.target.style.background = colors[pos];
                window.localStorage.setItem("fodata",JSON.stringify(data));
            });
    });
}