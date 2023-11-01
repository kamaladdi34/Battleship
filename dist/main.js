(()=>{var t={427:(t,e,r)=>{const s=r(643);class i{constructor(){this.ship=null,this.isHit=!1}}t.exports=class{#t=null;#e=[];#r=[new s(5),new s(4),new s(3),new s(3),new s(2)];constructor(t){this.generateBoard(t)}placeShip(t,e,r=!1){let{x:s,y:i}=t;return new Promise(((a,h)=>{if(!this.#s(t))return void h("Coordinates out of range");if(null!==this.#t[s][i].ship)return void h("Target coordinates not empty");if(!this.#i(t,e,r))return void h("Not enough space");let l=this.#a(e);if(l||h("No ship found"),r)for(let t=0;t<e;t++)this.#t[s+t][i].ship=l;else for(let t=0;t<e;t++)this.#t[s][i+t].ship=l;a(l),this.#e.push(l)}))}#a(t){for(let e=0;e<this.#r.length;e++)if(this.#r[e].length==t)return this.#r.splice(e,1)[0]}#i(t,e,r){let{x:s,y:i}=t,a=!0;if(r)for(let t=0;t<e;t++){let e={x:s+t,y:i};this.#s(e)&&null===this.#t[s+t][i].ship||(a=!1)}else for(let t=0;t<e;t++){let e={x:s,y:i+t};this.#s(e)&&null===this.#t[s][i+t].ship||(a=!1)}return a}getBoard(){return this.#t}#h(t){let{x:e,y:r}=t;return!(e<0||r<0||e>=this.#t.length||r>=this.#t.length)}#s(t){return"x"in t&&"y"in t&&!isNaN(t.x)&&!isNaN(t.y)&&!!this.#h(t)}receiveAttack(t){let{x:e,y:r}=t;if(this.#s(t))return 1==this.#t[e][r].isHit?{success:!1,shipHit:!1,error:"Cell already hit"}:(this.#t[e][r].isHit=!0,null==this.#t[e][r].ship?{success:!0,shipHit:!1,error:null}:(this.#t[e][r].ship.hit(),{success:!0,shipHit:!0,error:null}))}allShipsAreSunk(){let t=!0;for(let e=0;e<this.#e.length;e++)this.#e[e].isSunk()||(t=!1);return t}allShipsPlaced(){return 0==this.#r.length}getCell(t){return this.#t[t.x][t.y]}generateBoard(t){this.#t=new Array(t).fill("").map((e=>new Array(t).fill("").map((t=>new i))))}}},682:(t,e,r)=>{const s=r(427),i=r(507);t.exports=class{#l=!1;#o=!0;#n=null;#p=null;constructor(){this.player=null,this.otherPlayer=null}get gameStarted(){return this.#l}newGame(t,e){return new Promise(((r,a)=>{(!t||!e||t<=0)&&a("Incorrect game info"),this.player=new i(e[0].name,e[0].isComputer),this.otherPlayer=new i(e[1].name,e[1].isComputer),this.#n=new s(t),this.#p=new s(t),this.#n.placeShip({x:0,y:3},5),this.#n.placeShip({x:1,y:3},4),this.#n.placeShip({x:2,y:2},3),this.#n.placeShip({x:3,y:5},3),this.#n.placeShip({x:4,y:0},2,!0),this.#p.placeShip({x:0,y:0},5),this.#p.placeShip({x:1,y:0},4),this.#p.placeShip({x:2,y:0},3),this.#p.placeShip({x:3,y:0},3),this.#p.placeShip({x:4,y:0},2),r("Game initiated")}))}startGame(){if(!this.#l)return!(!this.#n||!this.#p)&&(this.#l=this.#n.allShipsPlaced()&&this.#p.allShipsPlaced())}playTurn(t){if(this.#l)return this.#o?(this.#o=!1,this.#p.receiveAttack(t)):(this.#o=!0,this.#n.receiveAttack(t))}getPlayerBoard(){return this.#d(this.#n.getBoard())}getOtherBoard(){return this.#d(this.#p.getBoard())}#d(t){let e=new Array(10).fill("").map((t=>new Array(10).fill("")));for(let r=0;r<t.length;r++)for(let s=0;s<t[r].length;s++){let i="empty",a=t[r][s];a.isHit||null!=a.ship||(i="empty"),a.isHit&&null==a.ship&&(i="miss"),a.isHit&&null!=a.ship&&(i="hit"),a.isHit||null==a.ship||(i="ship"),e[r][s]=i}return e}}},507:t=>{t.exports=class{constructor(t="player",e=!1){this.name=t,this.isComputer=e}}},643:t=>{t.exports=class{#c=0;constructor(t){this.length=this.#u(t)}hit(){this.isSunk()||this.#c++}isSunk(){return this.#c>=this.length}get hits(){return this.#c}#u(t){if(isNaN(t))return 1;let e=Math.floor(Math.abs(t));return 0==e?1:e}}}},e={};function r(s){var i=e[s];if(void 0!==i)return i.exports;var a=e[s]={exports:{}};return t[s](a,a.exports,r),a.exports}(()=>{const t=r(682),e=document.querySelector(".boards-container");document.addEventListener("click",(t=>{console.dir(t.target.parentNode.id)}));const s=new t;s.newGame(10,[{name:"player one",isComputer:!1},{name:"player two",isComputer:!1}]);let i=h(10,"player"),a=h(10,"other");function h(t,r){let s=new Array(t).fill("").map((e=>new Array(t).fill(""))),i=document.createElement("div");i.id=r,i.classList.add("board");let a=[];for(let e=0;e<t;e++){let r=[];for(let i=0;i<t;i++){let t=document.createElement("div");t.classList.add("cell"),t.setAttribute("data-coordinates",`${e}:${i}`),s[e][i]=t,r.push(t)}a.push(r)}return a.reverse(),a=function(t){let e=[];for(let r=0;r<t.length;r++)e.push(...t[r]);return e}(a),i.append(...a),e.appendChild(i),s}function l(t,e){for(let r=0;r<t.length;r++)for(let s=0;s<t[r].length;s++){let i=t[r][s];"ship"==i&&e[r][s].classList.add("ship"),"hit"==i&&e[r][s].classList.add("hit"),"miss"==i&&e[r][s].classList.add("miss"),"miss"==i&&e[r][s].classList.add("miss")}}l(s.getPlayerBoard(),i),l(s.getOtherBoard(),a)})()})();
//# sourceMappingURL=main.js.map