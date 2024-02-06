import{s as v,x as r,b as p,_ as h,e as u,t as g,k as s,N as f,q as y,O as _,j as b,i as w,u as x,w as $}from"./index-34c9da03.js";import"./elevation-cdb2e24e.js";class C extends v{render(){return r`
      <md-elevation part="elevation"></md-elevation>
      <div class="background"></div>
      <slot></slot>
      <div class="outline"></div>
    `}}const E=p`:host{--_container-color: var(--md-elevated-card-container-color, var(--md-sys-color-surface-container-low, #f7f2fa));--_container-elevation: var(--md-elevated-card-container-elevation, 1);--_container-shadow-color: var(--md-elevated-card-container-shadow-color, var(--md-sys-color-shadow, #000));--_container-shape: var(--md-elevated-card-container-shape, 12px)}/*# sourceMappingURL=elevated-styles.css.map */
`;const O=p`:host{border-radius:var(--_container-shape);box-sizing:border-box;display:flex;flex-direction:column;position:relative;z-index:0}md-elevation,.background,.outline{border-radius:inherit;inset:0;pointer-events:none;position:absolute}.background{background:var(--_container-color);z-index:-1}.outline{border:1px solid rgba(0,0,0,0);z-index:1}md-elevation{z-index:-1;--md-elevation-level: var(--_container-elevation);--md-elevation-shadow-color: var(--_container-shadow-color)}slot{border-radius:inherit}/*# sourceMappingURL=shared-styles.css.map */
`;let c=class extends C{};c.styles=[O,E];c=h([u("md-elevated-card")],c);const P="";var D=Object.defineProperty,L=Object.getOwnPropertyDescriptor,m=(e,o,t,n)=>{for(var a=n>1?void 0:n?L(o,t):o,l=e.length-1,d;l>=0;l--)(d=e[l])&&(a=(n?d(o,t,a):d(a))||a);return n&&a&&D(o,t,a),a};let i=class extends v{constructor(){super(...arguments),this.open=!1}firstUpdated(){s.bind(this)}render(){return r`
			<md-dialog ?open=${this.open} @close=${()=>this.open=!1}>
				<header slot="headline"><md-icon>${f}</md-icon> History</header>

				<form slot="content" method="dialog" id="form">
					${s.history.length>0?r`
								${s.history.map(e=>r`
										<md-elevated-card
											class="my-10"
											@click=${()=>{s.currentIndex=e,this.dialog.close()}}
										>
											<md-filled-tonal-icon-button
												form
												@click=${async o=>{o.stopPropagation();try{const{materialConfirm:t}=await y(()=>import("./index-26c409b8.js"),["./index-26c409b8.js","./index-34c9da03.js"],import.meta.url);await t(),s.removeIndex(e)}catch{}}}
												class="absolute -top-1 right-0"
												><md-icon>${_}</md-icon></md-filled-tonal-icon-button
											>
											<img
												src="./images/${b[e]}"
												class="w-full rounded-xl"
											/>
										</md-elevated-card>
									`)}
							`:r` <p class="text-center">Empty history</p> `}
				</form>

				<div slot="actions">
					<md-text-button form="form">Close</md-text-button>
				</div>
			</md-dialog>
		`}async show(){if(this.dialog.open){const e=new Promise(o=>{const t=()=>{o(null),this.dialog.removeEventListener("closed",t)};this.dialog.addEventListener("closed",t)});this.dialog.close(),await e}this.open=!0}};m([g()],i.prototype,"open",2);m([w("md-dialog")],i.prototype,"dialog",2);i=m([x({name:"history-dialog",inject:!0}),$(P)],i);const M=window.historyDialog=new i;export{M as historyDialog};
