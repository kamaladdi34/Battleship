(()=>{var e={427:(e,t,r)=>{const i=r(643);class s{constructor(){this.ship=null,this.isHit=!1}}e.exports=class{#e=null;#t=[];#r=[new i(5),new i(4),new i(3),new i(3),new i(2)];constructor(e){this.generateBoard(e)}placeShip(e,t,r=!1){let{x:i,y:s}=e;return new Promise(((a,h)=>{if(!this.#i(e))return void h("Coordinates out of range");if(null!==this.#e[i][s].ship)return void h("Target coordinates not empty");if(!this.#s(e,t,r))return void h("Not enough space");let l=this.#a(t);if(l||h("No ship found"),r)for(let e=0;e<t;e++)this.#e[i+e][s].ship=l;else for(let e=0;e<t;e++)this.#e[i][s+e].ship=l;a(l),this.#t.push(l)}))}#a(e){for(let t=0;t<this.#r.length;t++)if(this.#r[t].length==e)return this.#r.splice(t,1)[0]}#s(e,t,r){let{x:i,y:s}=e,a=!0;if(r)for(let e=0;e<t;e++){let t={x:i+e,y:s};this.#i(t)&&null===this.#e[i+e][s].ship||(a=!1)}else for(let e=0;e<t;e++){let t={x:i,y:s+e};this.#i(t)&&null===this.#e[i][s+e].ship||(a=!1)}return a}#h(e){let{x:t,y:r}=e;return!(t<0||r<0||t>=this.#e.length||r>=this.#e.length)}#i(e){return"x"in e&&"y"in e&&!isNaN(e.x)&&!isNaN(e.y)&&!!this.#h(e)}receiveAttack(e){let{x:t,y:r}=e;if(this.#i(e))return 1==this.#e[t][r].isHit?{success:!1,shipHit:!1,error:"Cell already hit"}:(this.#e[t][r].isHit=!0,null==this.#e[t][r].ship?{success:!0,shipHit:!1,error:null}:(this.#e[t][r].ship.hit(),{success:!0,shipHit:!0,error:null}))}allShipsAreSunk(){let e=!0;for(let t=0;t<this.#t.length;t++)this.#t[t].isSunk()||(e=!1);return e}allShipsPlaced(){return 0==this.#r.length}getCell(e){return this.#e[e.x][e.y]}generateBoard(e){this.#e=new Array(e).fill("").map((t=>new Array(e).fill("").map((e=>new s))))}}},682:(e,t,r)=>{const i=r(427),s=r(507);e.exports=class{#l=!1;#o=!0;#n=null;#p=null;constructor(){this.player=null,this.otherPlayer=null}get gameStarted(){return this.#l}newGame(e,t){return new Promise(((r,a)=>{(!e||!t||e<=0)&&a("Incorrect game info"),this.player=new s(t[0].name,t[0].isComputer),this.otherPlayer=new s(t[1].name,t[1].isComputer),this.#n=new i(e),this.#p=new i(e),this.#n.placeShip({x:0,y:0},5),this.#n.placeShip({x:1,y:0},4),this.#n.placeShip({x:2,y:0},3),this.#n.placeShip({x:3,y:0},3),this.#n.placeShip({x:4,y:0},2),this.#p.placeShip({x:0,y:0},5),this.#p.placeShip({x:1,y:0},4),this.#p.placeShip({x:2,y:0},3),this.#p.placeShip({x:3,y:0},3),this.#p.placeShip({x:4,y:0},2),r("Game initiated")}))}startGame(){if(!this.#l)return!(!this.#n||!this.#p)&&(this.#l=this.#n.allShipsPlaced()&&this.#p.allShipsPlaced())}playTurn(e){if(this.#l)return this.#o?(this.#o=!1,this.#p.receiveAttack(e)):(this.#o=!0,this.#n.receiveAttack(e))}getPlayerBoard(){let e=new Array(size).fill("").map((e=>new Array(size).fill("")));for(let t=0;t<this.#n.length;t++)for(let r=0;r<this.#n[t].length;r++){let i="empty",s=this.#n[t][r];s.isHit||null!=s.ship||(i="empty"),s.isHit&&null==s.ship&&(i="miss"),s.isHit&&null!=s.ship&&(i="hit"),s.isHit||null==s.ship||(i="ship"),e[t][r]=i}return e}}},507:e=>{e.exports=class{constructor(e="player",t=!1){this.name=e,this.isComputer=t}}},643:e=>{e.exports=class{#d=0;constructor(e){this.length=this.#c(e)}hit(){this.isSunk()||this.#d++}isSunk(){return this.#d>=this.length}get hits(){return this.#d}#c(e){if(isNaN(e))return 1;let t=Math.floor(Math.abs(e));return 0==t?1:t}}}},t={};function r(i){var s=t[i];if(void 0!==s)return s.exports;var a=t[i]={exports:{}};return e[i](a,a.exports,r),a.exports}(()=>{const e=r(682),t=document.querySelector(".boards-container");function i(e){let r=new Array(e).fill("").map((t=>new Array(e).fill(""))),i=document.createElement("div");i.classList.add("board");for(let t=0;t<e;t++)for(let s=0;s<e;s++){let e=document.createElement("div");e.classList.add("cell"),r[t][s]=e,i.appendChild(e)}return t.appendChild(i),r}(new e).newGame(10,[{name:"player one",isComputer:!1},{name:"player two",isComputer:!1}]),i(10),i(10)})()})();