(()=>{var e={427:(e,t,r)=>{const i=r(643);class s{constructor(){this.ship=null,this.isHit=!1}}e.exports=class{#e=null;#t=[];#r=[new i(5),new i(4),new i(3),new i(3),new i(2)];constructor(e){this.generateBoard(e)}placeShip(e,t,r=!1){let{x:i,y:s}=e;return new Promise(((o,l)=>{if(!this.#i(e))return void l(`Coordinates out of range, ${e.x},${e.y}, ship length: ${t}`);if(null!==this.#e[i][s].ship)return void l(`Target coordinates not empty, ${e.x},${e.y}, ship length: ${t}`);if(!this.#s(e,t,r))return void l(`Not enough space, ${e.x},${e.y}, ship length: ${t}`);let a=this.#o(t);if(a||l(`No ship found, ${e.x},${e.y}, ship length: ${t}`),r)for(let e=0;e<t;e++)this.#e[i+e][s].ship=a;else for(let e=0;e<t;e++)this.#e[i][s+e].ship=a;o(a),this.#t.push(a)}))}#o(e){for(let t=0;t<this.#r.length;t++)if(this.#r[t].length==e)return this.#r.splice(t,1)[0]}#s(e,t,r){let{x:i,y:s}=e,o=!0;if(r)for(let e=0;e<t;e++){let t={x:i+e,y:s};this.#i(t)&&null===this.#e[i+e][s].ship||(o=!1)}else for(let e=0;e<t;e++){let t={x:i,y:s+e};this.#i(t)&&null===this.#e[i][s+e].ship||(o=!1)}return o}getBoard(){return this.#e}#l(e){let{x:t,y:r}=e;return!(t<0||r<0||t>=this.#e.length||r>=this.#e.length)}#i(e){return"x"in e&&"y"in e&&!isNaN(e.x)&&!isNaN(e.y)&&!!this.#l(e)}receiveAttack(e){let{x:t,y:r}=e;if(this.#i(e))return 1==this.#e[t][r].isHit?{success:!1,shipHit:!1,error:"Cell already hit"}:(this.#e[t][r].isHit=!0,null==this.#e[t][r].ship?{success:!0,shipHit:!1,error:null}:(this.#e[t][r].ship.hit(),{success:!0,shipHit:!0,error:null}))}allShipsAreSunk(){let e=!0;for(let t=0;t<this.#t.length;t++)this.#t[t].isSunk()||(e=!1);return e}allShipsPlaced(){return 0==this.#r.length}getCell(e){return this.#e[e.x][e.y]}generateBoard(e){this.#e=new Array(e).fill("").map((t=>new Array(e).fill("").map((e=>new s))))}}},682:(e,t,r)=>{const i=r(427),s=r(507);e.exports=class{#a=!1;#n=!0;#h=null;#d=null;constructor(){this.player=null,this.otherPlayer=null}get gameStarted(){return this.#a}newGame(e,t,r){return new Promise((async(o,l)=>{(!e||!t||e<=0)&&l("Incorrect game info"),this.player=new s(t[0].name,t[0].isComputer),this.otherPlayer=new s(t[1].name,t[1].isComputer),this.#h=new i(e),this.#d=new i(e);for(let e=0;e<r.length;e++)this.#h.placeShip(r[e].coords,r[e].length).catch((e=>{console.log(e)}));this.#h.allShipsPlaced()||l("Wrong ship coordinates"),await this.generateComputerBoard(),o("Game initiated")}))}async generateComputerBoard(){let e=[5,4,3,3,2],t=0;for(;!this.#d.allShipsPlaced();){let r=this.generateCoordinates();try{await this.#d.placeShip(r,e[t],Math.floor(2*Math.random())),console.log(`placed ship with length ${e[t]} at ${r.y},${r.x}`),t++}catch(i){console.log(`failed to place ship ${e[t]} at ${r.y},${r.x}, ${i}`)}}}generateCoordinates=()=>({x:Math.floor(10*Math.random()),y:Math.floor(10*Math.random())});startGame(){if(!this.#a)return!(!this.#h||!this.#d)&&(this.#a=this.#h.allShipsPlaced()&&this.#d.allShipsPlaced())}playTurn(e){if(this.#a){if(this.#n){let t=this.#d.receiveAttack(e);return t.error||(this.#n=!1),t}{let t=this.#h.receiveAttack(e);return t.error||(this.#n=!0),t}}}getPlayerBoard(){return this.#u(this.#h.getBoard())}getOtherBoard(){return this.#u(this.#d.getBoard())}checkForWinner(){return this.#h.allShipsAreSunk()?this.otherPlayer:this.#d.allShipsAreSunk()?this.player:void 0}#u(e){let t=new Array(10).fill("").map((e=>new Array(10).fill("")));for(let r=0;r<e.length;r++)for(let i=0;i<e[r].length;i++){let s="empty",o=e[r][i];o.isHit||null!=o.ship||(s="empty"),o.isHit&&null==o.ship&&(s="miss"),o.isHit&&null!=o.ship&&(s="hit"),o.isHit||null==o.ship||(s="ship"),t[r][i]=s}return t}}},507:e=>{e.exports=class{constructor(e="player",t=!1){this.name=e,this.isComputer=t}}},643:e=>{e.exports=class{#c=0;constructor(e){this.length=this.#p(e)}hit(){this.isSunk()||this.#c++}isSunk(){return this.#c>=this.length}get hits(){return this.#c}#p(e){if(isNaN(e))return 1;let t=Math.floor(Math.abs(e));return 0==t?1:t}}}},t={};function r(i){var s=t[i];if(void 0!==s)return s.exports;var o=t[i]={exports:{}};return e[i](o,o.exports,r),o.exports}(()=>{const e=r(682),t=document.querySelector(".boards-container"),i=document.querySelector(".player-info > button"),s=document.querySelector(".player-info > #player-name"),o=document.querySelector(".player-info > #other-name"),l=document.querySelector("body > h3"),a=document.querySelector("#ship-5"),n=document.querySelector("#ship-4"),h=document.querySelector("#ship-3"),d=document.querySelector("#ship-3-2"),u=document.querySelector("#ship-2");let c=null,p=null,y=null;function g(e,r){let i=new Array(e).fill("").map((t=>new Array(e).fill(""))),s=document.createElement("div");s.id=r,s.classList.add("board");let o=[];for(let t=0;t<e;t++){let r=[];for(let s=0;s<e;s++){let e=document.createElement("div");e.classList.add("cell"),e.setAttribute("data-coordinates",`${t}:${s}`),i[t][s]=e,r.push(e)}o.push(r)}return o.reverse(),o=function(e){let t=[];for(let r=0;r<e.length;r++)t.push(...e[r]);return t}(o),s.append(...o),t.appendChild(s),i}i.addEventListener("click",(r=>{r.preventDefault();let i=s.value,l=o.value;i?l?async function(r){c=new e,t.innerHTML="","Game initiated"==await c.newGame(10,r,function(){let e=[],t=a.value.split("-");e.push({length:5,coords:{x:+t[1],y:+t[0]}});let r=n.value.split("-");e.push({length:4,coords:{x:+r[1],y:+r[0]}});let i=h.value.split("-");e.push({length:3,coords:{x:+i[1],y:+i[0]}});let s=d.value.split("-");e.push({length:3,coords:{x:+s[1],y:+s[0]}});let o=u.value.split("-");return e.push({length:2,coords:{x:+o[1],y:+o[0]}}),e}()).catch((e=>{console.log(e),window.alert("Wrong coordinates")}))&&(c.startGame(),p=g(10,"player"),y=g(10,"other"),x(c.getPlayerBoard(),p,!0),x(c.getOtherBoard(),y))}([{name:i,isComputer:!1},{name:l,isComputer:!0}]):o.reportValidity():s.reportValidity()})),document.addEventListener("click",(e=>{"other"==e.target.parentNode.id&&function(e){if(c.playTurn({x:e[0],y:e[1]}).error)return;c.playTurn(function(){let e=S();for(;m(e);)e=S();return f.push(e),e}()),x(c.getOtherBoard(),y),x(c.getPlayerBoard(),p,!0);let t=c.checkForWinner();t&&(l.innerText=`🎉 Winner is ${t.name}`)}(e.target.getAttribute("data-coordinates").split(":"))}));let f=[];function m(e){let t=!1;for(let r of f)r.x==e.x&&r.y==e.y&&(t=!0);return t}function S(){return{x:Math.floor(10*Math.random()),y:Math.floor(10*Math.random())}}function x(e,t,r=!1){for(let r=0;r<e.length;r++)for(let i=0;i<e[r].length;i++){let s=e[r][i];"ship"==s&&(t[r][i].classList.add("ship"),t[r][i].setAttribute("draggable",!0)),"hit"==s&&t[r][i].classList.add("hit"),"miss"==s&&t[r][i].classList.add("miss")}}})()})();
//# sourceMappingURL=main.js.map