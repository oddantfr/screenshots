import{I as V,J as f,K as l,T as u,M as S,d as o,_ as m,n as y}from"./index-34c9da03.js";const T=s=>s.strings===void 0,w={},M=(s,e=w)=>s._$AH=e;const I=V(class extends f{constructor(s){if(super(s),s.type!==l.PROPERTY&&s.type!==l.ATTRIBUTE&&s.type!==l.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!T(s))throw Error("`live` bindings can only contain a single expression")}render(s){return s}update(s,[e]){if(e===u||e===S)return e;const r=s.element,t=s.name;if(s.type===l.PROPERTY){if(e===r[t])return u}else if(s.type===l.BOOLEAN_ATTRIBUTE){if(!!e===r.hasAttribute(t))return u}else if(s.type===l.ATTRIBUTE&&r.getAttribute(t)===e+"")return u;return M(s),e}});const A="important",C=" !"+A,O=V(class extends f{constructor(s){var e;if(super(s),s.type!==l.ATTRIBUTE||s.name!=="style"||((e=s.strings)===null||e===void 0?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(s){return Object.keys(s).reduce((e,r)=>{const t=s[r];return t==null?e:e+`${r=r.includes("-")?r:r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${t};`},"")}update(s,[e]){const{style:r}=s.element;if(this.ht===void 0){this.ht=new Set;for(const t in e)this.ht.add(t);return this.render(e)}this.ht.forEach(t=>{e[t]==null&&(this.ht.delete(t),t.includes("-")?r.removeProperty(t):r[t]="")});for(const t in e){const i=e[t];if(i!=null){this.ht.add(t);const a=typeof i=="string"&&i.endsWith(C);t.includes("-")||a?r.setProperty(t,a?i.slice(0,-11):i,a?A:""):r[t]=i}}return u}});const g=Symbol("createValidator"),b=Symbol("getValidityAnchor"),c=Symbol("privateValidator"),n=Symbol("privateSyncValidity"),h=Symbol("privateCustomValidationMessage");function R(s){var e;class r extends s{constructor(){super(...arguments),this[e]=""}get validity(){return this[n](),this[o].validity}get validationMessage(){return this[n](),this[o].validationMessage}get willValidate(){return this[n](),this[o].willValidate}checkValidity(){return this[n](),this[o].checkValidity()}reportValidity(){return this[n](),this[o].reportValidity()}setCustomValidity(i){this[h]=i,this[n]()}requestUpdate(i,a,d){super.requestUpdate(i,a,d),this[n]()}firstUpdated(i){super.firstUpdated(i),this[n]()}[(e=h,n)](){this[c]||(this[c]=this[g]());const{validity:i,validationMessage:a}=this[c].getValidity(),d=!!this[h],E=this[h]||a;this[o].setValidity({...i,customError:d},E,this[b]()??void 0)}[g](){throw new Error("Implement [createValidator]")}[b](){throw new Error("Implement [getValidityAnchor]")}}return r}const p=Symbol("getFormValue"),v=Symbol("getFormState");function x(s){class e extends s{get form(){return this[o].form}get labels(){return this[o].labels}get name(){return this.getAttribute("name")??""}set name(t){this.setAttribute("name",t)}get disabled(){return this.hasAttribute("disabled")}set disabled(t){this.toggleAttribute("disabled",t)}attributeChangedCallback(t,i,a){if(t==="name"||t==="disabled"){const d=t==="disabled"?i!==null:i;this.requestUpdate(t,d);return}super.attributeChangedCallback(t,i,a)}requestUpdate(t,i,a){super.requestUpdate(t,i,a),this[o].setFormValue(this[p](),this[v]())}[p](){throw new Error("Implement [getFormValue]")}[v](){return this[p]()}formDisabledCallback(t){this.disabled=t}}return e.formAssociated=!0,m([y({noAccessor:!0})],e.prototype,"name",null),m([y({type:Boolean,noAccessor:!0})],e.prototype,"disabled",null),e}class B{constructor(e){this.getCurrentState=e,this.currentValidity={validity:{},validationMessage:""}}getValidity(){const e=this.getCurrentState();if(!(!this.prevState||!this.equals(this.prevState,e)))return this.currentValidity;const{validity:t,validationMessage:i}=this.computeValidity(e);return this.prevState=this.copy(e),this.currentValidity={validationMessage:i,validity:{badInput:t.badInput,customError:t.customError,patternMismatch:t.patternMismatch,rangeOverflow:t.rangeOverflow,rangeUnderflow:t.rangeUnderflow,stepMismatch:t.stepMismatch,tooLong:t.tooLong,tooShort:t.tooShort,typeMismatch:t.typeMismatch,valueMissing:t.valueMissing}},this.currentValidity}}export{B as V,x as a,b,g as c,v as d,p as g,I as l,R as m,O as o};