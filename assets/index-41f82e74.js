import{Q as h,U as P,W as g,X as E}from"./index-46f28c42.js";const A=Symbol.for(""),S=l=>{if((l==null?void 0:l.r)===A)return l==null?void 0:l._$litStatic$},v=l=>({_$litStatic$:l,r:A}),m=(l,...s)=>({_$litStatic$:s.reduce((t,e,n)=>t+(c=>{if(c._$litStatic$!==void 0)return c._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${c}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(e)+l[n+1],l[0]),r:A}),_=new Map,U=l=>(s,...t)=>{const e=t.length;let n,c;const r=[],p=[];let f,u=0,d=!1;for(;u<e;){for(f=s[u];u<e&&(c=t[u],(n=S(c))!==void 0);)f+=n+s[++u],d=!0;u!==e&&p.push(c),r.push(f),u++}if(u===e&&r.push(s[e]),d){const b=r.join("$$lit$$");(s=_.get(b))===void 0&&(r.raw=r,_.set(b,s=r)),t=p}return l(s,...t)},T=U(h);const M={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},O=l=>(...s)=>({_$litDirective$:l,values:s});let j=class{constructor(s){}get _$AU(){return this._$AM._$AU}_$AT(s,t,e){this._$Ct=s,this._$AM=t,this._$Ci=e}_$AS(s,t){return this.update(s,t)}update(s,t){return this.render(...t)}};const x="important",I=" !"+x,w=O(class extends j{constructor(l){var s;if(super(l),l.type!==M.ATTRIBUTE||l.name!=="style"||((s=l.strings)==null?void 0:s.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(l){return Object.keys(l).reduce((s,t)=>{const e=l[t];return e==null?s:s+`${t=t.includes("-")?t:t.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${e};`},"")}update(l,[s]){const{style:t}=l.element;if(this.ut===void 0)return this.ut=new Set(Object.keys(s)),this.render(s);for(const e of this.ut)s[e]==null&&(this.ut.delete(e),e.includes("-")?t.removeProperty(e):t[e]=null);for(const e in s){const n=s[e];if(n!=null){this.ut.add(e);const c=typeof n=="string"&&n.endsWith(I);e.includes("-")||c?t.setProperty(e,c?n.slice(0,-11):n,c?x:""):t[e]=n}}return P}});function C({headline:l,content:s,cancelButton:t,confirmButton:e,blockScrimClick:n=!1,blockEscapeKey:c=!1,onDialogReady:r,styles:p}){return new Promise(async(f,u)=>{const d=document.createElement("div");let b=Promise.resolve(),y=Promise.resolve(),o=!1;g(h`
				<md-dialog
					?block-scrim-click="${n}"
					?block-escape-key="${c}"
					style="${w(p??{})}"
					@cancel=${a=>{const $=a.target;$.returnValue===""&&(o?$.hasAttribute("block-escape-key")&&a.preventDefault():$.hasAttribute("block-scrim-click")&&a.preventDefault(),o=!1)}}
					@keydown=${a=>{a.code==="Escape"&&(o=!0)}}
					@closed=${async a=>{switch(a.target.returnValue){case"":case"cancel":u(await b);break;case"confirm":default:f(await y)}a.target.remove(),d.remove()}}
				>
				</md-dialog>
			`,d),document.body.prepend(d);const i=d.querySelector(":scope > md-dialog");await i.updateComplete,g(h`
				<div slot="headline">${l}</div>
				<form method="dialog" id="inner-form" slot="content">
					${s(i)}
				</form>

				${t||e?h`
							<div slot="actions">
								${t?(()=>{t.buttonType=t.buttonType??"md-text-button";const a=m`${v(t.buttonType)}`;return T`
									<${a}
										id="cancelButton"
										style=${w(t.styles??{})}
										@click=${()=>{t.callback&&(b=new Promise(async $=>{$(await t.callback(i))}))}}
										form="inner-form"
										value="${t.dialogAction??"cancel"}"
										>${t.label??"Cancel"}</${a}
									>
								`})():E}
								${e?(()=>{e.buttonType=e.buttonType??"md-text-button";const a=m`${v(e.buttonType)}`;return T`
									<${a}
										id="confirmButton"
										style=${w(e.styles??{})}
										@click=${()=>{e.callback&&(y=new Promise(async $=>{$(await e.callback(i))}))}}
										form="inner-form"
										value="${e.dialogAction??"confirm"}"
										>${e.label??"Confirm"}</${a}
									>
								`})():E}
							</div>
					  `:null}
			`,i),i.$={confirmButton:null,cancelButton:null},i.querySelectorAll("[id]").forEach(a=>{i.$[a.getAttribute("id")]=a}),await i.updateComplete,await(r==null?void 0:r(i)),i.show()})}async function V({promptText:l,initialValue:s,textfieldType:t,confirmButton:e,blockEscapeKey:n,blockScrimClick:c,autocomplete:r,type:p,rows:f,cols:u,dialogStyles:d,forbiddenValues:b,forbiddenText:y}={}){return r!==""&&!r&&(r="off"),r===!0&&(r=""),await C({headline:l??"Enter a value",blockEscapeKey:n,blockScrimClick:c,styles:d,content(o){const i=t?m`${v(t)}`:m`md-filled-text-field`;return T`<${i}
				id="textfield"
				style="width:100%"
				autofocus
				autocomplete=${r}
				type=${p??"input"}
				rows=${f??3}
				cols=${u??20}
				@keyup=${()=>{const a=o.$.textfield,$=a.value,k=b&&b.includes($);o.$.confirmButton.disabled=$==""||k,a.error=k,a.errorText=k?y??"The value already exists":""}}
				@keypress=${a=>{a.key==="Enter"&&o.$.confirmButton.click()}}
				value=${s??""}
			></${i}>`},cancelButton:{},confirmButton:{buttonType:(e==null?void 0:e.buttonType)??"md-filled-button",label:(e==null?void 0:e.label)??"Confirm",async callback(o){if(e!=null&&e.callback){const i=await e.callback(o);if(i)return i}return o.$.textfield.value}},async onDialogReady(o){await o.updateComplete,o.$.confirmButton.disabled=o.$.textfield.value.length===0}})}async function q({headline:l="Are you sure?",content:s="Are you sure to perform this action?",cancelButton:t={},confirmButton:e={}}={}){return await C({headline:l,content(){return s},confirmButton:e,cancelButton:t})}export{q as materialConfirm,C as materialDialog,V as materialPrompt};
