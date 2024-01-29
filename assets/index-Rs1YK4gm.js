import{H as y,T as i,s as v,l as R,a as x,D as H,V as P,b as V,r as D,g as L,c as j,S as z,d as N,M as s}from"./index-3wuvtRAL.js";class c{static of(e){return new c(e,!1)}static contentOf(e){return new c(e,!0)}static fromColors(e){return c.createPaletteFromColors(!1,e)}static contentFromColors(e){return c.createPaletteFromColors(!0,e)}static createPaletteFromColors(e,t){const r=new c(t.primary,e);if(t.secondary){const a=new c(t.secondary,e);r.a2=a.a1}if(t.tertiary){const a=new c(t.tertiary,e);r.a3=a.a1}if(t.error){const a=new c(t.error,e);r.error=a.a1}if(t.neutral){const a=new c(t.neutral,e);r.n1=a.n1}if(t.neutralVariant){const a=new c(t.neutralVariant,e);r.n2=a.n2}return r}constructor(e,t){const r=y.fromInt(e),a=r.hue,h=r.chroma;t?(this.a1=i.fromHueAndChroma(a,h),this.a2=i.fromHueAndChroma(a,h/3),this.a3=i.fromHueAndChroma(a+60,h/2),this.n1=i.fromHueAndChroma(a,Math.min(h/12,4)),this.n2=i.fromHueAndChroma(a,Math.min(h/6,8))):(this.a1=i.fromHueAndChroma(a,Math.max(48,h)),this.a2=i.fromHueAndChroma(a,16),this.a3=i.fromHueAndChroma(a+60,24),this.n1=i.fromHueAndChroma(a,4),this.n2=i.fromHueAndChroma(a,8)),this.error=i.fromHueAndChroma(25,84)}}class C{constructor(e){this.input=e,this.hctsByTempCache=[],this.hctsByHueCache=[],this.tempsByHctCache=new Map,this.inputRelativeTemperatureCache=-1,this.complementCache=null}get hctsByTemp(){if(this.hctsByTempCache.length>0)return this.hctsByTempCache;const e=this.hctsByHue.concat([this.input]),t=this.tempsByHct;return e.sort((r,a)=>t.get(r)-t.get(a)),this.hctsByTempCache=e,e}get warmest(){return this.hctsByTemp[this.hctsByTemp.length-1]}get coldest(){return this.hctsByTemp[0]}analogous(e=5,t=12){const r=Math.round(this.input.hue),a=this.hctsByHue[r];let h=this.relativeTemperature(a);const o=[a];let f=0;for(let u=0;u<360;u++){const m=x(r+u),T=this.hctsByHue[m],g=this.relativeTemperature(T),I=Math.abs(g-h);h=g,f+=I}let p=1;const S=f/t;let A=0;for(h=this.relativeTemperature(a);o.length<t;){const u=x(r+p),m=this.hctsByHue[u],T=this.relativeTemperature(m),g=Math.abs(T-h);A+=g;const I=o.length*S;let M=A>=I,F=1;for(;M&&o.length<t;){o.push(m);const O=(o.length+F)*S;M=A>=O,F++}if(h=T,p++,p>360){for(;o.length<t;)o.push(m);break}}const w=[this.input],b=Math.floor((e-1)/2);for(let u=1;u<b+1;u++){let m=0-u;for(;m<0;)m=o.length+m;m>=o.length&&(m=m%o.length),w.splice(0,0,o[m])}const B=e-b-1;for(let u=1;u<B+1;u++){let m=u;for(;m<0;)m=o.length+m;m>=o.length&&(m=m%o.length),w.push(o[m])}return w}get complement(){if(this.complementCache!=null)return this.complementCache;const e=this.coldest.hue,t=this.tempsByHct.get(this.coldest),r=this.warmest.hue,h=this.tempsByHct.get(this.warmest)-t,o=C.isBetween(this.input.hue,e,r),f=o?r:e,p=o?e:r,S=1;let A=1e3,w=this.hctsByHue[Math.round(this.input.hue)];const b=1-this.inputRelativeTemperature;for(let B=0;B<=360;B+=1){const u=v(f+S*B);if(!C.isBetween(u,f,p))continue;const m=this.hctsByHue[Math.round(u)],T=(this.tempsByHct.get(m)-t)/h,g=Math.abs(b-T);g<A&&(A=g,w=m)}return this.complementCache=w,this.complementCache}relativeTemperature(e){const t=this.tempsByHct.get(this.warmest)-this.tempsByHct.get(this.coldest),r=this.tempsByHct.get(e)-this.tempsByHct.get(this.coldest);return t===0?.5:r/t}get inputRelativeTemperature(){return this.inputRelativeTemperatureCache>=0?this.inputRelativeTemperatureCache:(this.inputRelativeTemperatureCache=this.relativeTemperature(this.input),this.inputRelativeTemperatureCache)}get tempsByHct(){if(this.tempsByHctCache.size>0)return this.tempsByHctCache;const e=this.hctsByHue.concat([this.input]),t=new Map;for(const r of e)t.set(r,C.rawTemperature(r));return this.tempsByHctCache=t,t}get hctsByHue(){if(this.hctsByHueCache.length>0)return this.hctsByHueCache;const e=[];for(let t=0;t<=360;t+=1){const r=y.from(t,this.input.chroma,this.input.tone);e.push(r)}return this.hctsByHueCache=e,this.hctsByHueCache}static isBetween(e,t,r){return t<r?t<=e&&e<=r:t<=e||e<=r}static rawTemperature(e){const t=R(e.toInt()),r=v(Math.atan2(t[2],t[1])*180/Math.PI),a=Math.sqrt(t[1]*t[1]+t[2]*t[2]);return-.5+.02*Math.pow(a,1.07)*Math.cos(v(r-50)*Math.PI/180)}}class k extends H{constructor(e,t,r){super({sourceColorArgb:e.toInt(),variant:P.CONTENT,contrastLevel:r,isDark:t,primaryPalette:i.fromHueAndChroma(e.hue,e.chroma),secondaryPalette:i.fromHueAndChroma(e.hue,Math.max(e.chroma-32,e.chroma*.5)),tertiaryPalette:i.fromInt(V.fixIfDisliked(new C(e).analogous(3,6)[2]).toInt()),neutralPalette:i.fromHueAndChroma(e.hue,e.chroma/8),neutralVariantPalette:i.fromHueAndChroma(e.hue,e.chroma/8+4)})}}class $ extends H{constructor(e,t,r){super({sourceColorArgb:e.toInt(),variant:P.FIDELITY,contrastLevel:r,isDark:t,primaryPalette:i.fromHueAndChroma(e.hue,e.chroma),secondaryPalette:i.fromHueAndChroma(e.hue,Math.max(e.chroma-32,e.chroma*.5)),tertiaryPalette:i.fromInt(V.fixIfDisliked(new C(e).complement).toInt()),neutralPalette:i.fromHueAndChroma(e.hue,e.chroma/8),neutralVariantPalette:i.fromHueAndChroma(e.hue,e.chroma/8+4)})}}class q extends H{constructor(e,t,r){super({sourceColorArgb:e.toInt(),variant:P.MONOCHROME,contrastLevel:r,isDark:t,primaryPalette:i.fromHueAndChroma(e.hue,0),secondaryPalette:i.fromHueAndChroma(e.hue,0),tertiaryPalette:i.fromHueAndChroma(e.hue,0),neutralPalette:i.fromHueAndChroma(e.hue,0),neutralVariantPalette:i.fromHueAndChroma(e.hue,0)})}}class U extends H{constructor(e,t,r){super({sourceColorArgb:e.toInt(),variant:P.NEUTRAL,contrastLevel:r,isDark:t,primaryPalette:i.fromHueAndChroma(e.hue,12),secondaryPalette:i.fromHueAndChroma(e.hue,8),tertiaryPalette:i.fromHueAndChroma(e.hue,16),neutralPalette:i.fromHueAndChroma(e.hue,2),neutralVariantPalette:i.fromHueAndChroma(e.hue,2)})}}class W extends H{constructor(e,t,r){super({sourceColorArgb:e.toInt(),variant:P.TONAL_SPOT,contrastLevel:r,isDark:t,primaryPalette:i.fromHueAndChroma(e.hue,36),secondaryPalette:i.fromHueAndChroma(e.hue,16),tertiaryPalette:i.fromHueAndChroma(v(e.hue+60),24),neutralPalette:i.fromHueAndChroma(e.hue,6),neutralVariantPalette:i.fromHueAndChroma(e.hue,8)})}}function E(n){const e=D(n),t=L(n),r=j(n),a=[e.toString(16),t.toString(16),r.toString(16)];for(const[h,o]of a.entries())o.length===1&&(a[h]="0"+o);return"#"+a.join("")}function l(n){n=n.replace("#","");const e=n.length===3,t=n.length===6,r=n.length===8;if(!e&&!t&&!r)throw new Error("unexpected hex "+n);let a=0,h=0,o=0;return e?(a=d(n.slice(0,1).repeat(2)),h=d(n.slice(1,2).repeat(2)),o=d(n.slice(2,3).repeat(2))):t?(a=d(n.slice(0,2)),h=d(n.slice(2,4)),o=d(n.slice(4,6))):r&&(a=d(n.slice(2,4)),h=d(n.slice(4,6)),o=d(n.slice(6,8))),(255<<24|(a&255)<<16|(h&255)<<8|o&255)>>>0}function d(n){return parseInt(n,16)}function Y(n,e,t="material-theme"){let r=globalThis[t];r||(r=new CSSStyleSheet,globalThis[t]=r,n.adoptedStyleSheets.push(r)),r.replaceSync(e),localStorage.setItem(t,e)}const G={background:s.background,"on-background":s.onBackground,surface:s.surface,"surface-dim":s.surfaceDim,"surface-bright":s.surfaceBright,"surface-container-lowest":s.surfaceContainerLowest,"surface-container-low":s.surfaceContainerLow,"surface-container":s.surfaceContainer,"surface-container-high":s.surfaceContainerHigh,"surface-container-highest":s.surfaceContainerHighest,"on-surface":s.onSurface,"surface-variant":s.surfaceVariant,"on-surface-variant":s.onSurfaceVariant,"inverse-surface":s.inverseSurface,"inverse-on-surface":s.inverseOnSurface,outline:s.outline,"outline-variant":s.outlineVariant,shadow:s.shadow,scrim:s.scrim,"surface-tint":s.surfaceTint,primary:s.primary,"on-primary":s.onPrimary,"primary-container":s.primaryContainer,"on-primary-container":s.onPrimaryContainer,"inverse-primary":s.inversePrimary,secondary:s.secondary,"on-secondary":s.onSecondary,"secondary-container":s.secondaryContainer,"on-secondary-container":s.onSecondaryContainer,tertiary:s.tertiary,"on-tertiary":s.onTertiary,"tertiary-container":s.tertiaryContainer,"on-tertiary-container":s.onTertiaryContainer,error:s.error,"on-error":s.onError,"error-container":s.errorContainer,"on-error-container":s.onErrorContainer};function Q(n){return y.fromInt(l(n))}function X(n,e,t){const a=y.from(n,e,t).toInt();return E(a)}function Z(n,e,t,r){if(typeof n!="string"&&t!=="dynamic"||typeof n!="object"&&t==="dynamic")throw new Error("color / scheme type mismatch");let a;if(t==="tonal")a=new W(y.fromInt(l(n)),e,r);else if(t==="fidelity")a=new $(y.fromInt(l(n)),e,r);else if(t==="vibrant")a=new z(y.fromInt(l(n)),e,r);else if(t==="expressive")a=new N(y.fromInt(l(n)),e,r);else if(t==="content")a=new k(y.fromInt(l(n)),e,r);else if(t==="neutral")a=new U(y.fromInt(l(n)),e,r);else if(t==="monochrome")a=new q(y.fromInt(l(n)),e,r);else if(t==="dynamic"&&typeof n=="object"){const h=l(n.primary),o=c.of(h);if(n.secondary!=="#000000"){const f=l(n.secondary),p=c.of(f);o.a2=p.a1}if(n.tertiary!=="#000000"){const f=l(n.tertiary),p=c.of(f);o.a3=p.a1}if(n.neutral!=="#000000"){const f=l(n.neutral),p=c.of(f);o.n1=p.n1}a=new H({sourceColorArgb:l(n.primary),variant:5,contrastLevel:r,isDark:e,primaryPalette:o.a1,secondaryPalette:o.a2,tertiaryPalette:o.a3,neutralPalette:o.n1,neutralVariantPalette:o.n2})}return J(a)}function J(n){const e={};for(const[t,r]of Object.entries(G))e[t]=E(r.getArgb(n));return e}function _(n,e,t="material-theme"){let r=":root{";for(const[a,h]of Object.entries(e))r+=`--md-sys-color-${a}:${h};`;r+="}",Y(n,r,t)}export{_ as applyTheme,Y as applyThemeString,Q as hctFromHex,X as hexFromHct,J as themeFromScheme,Z as themeFromSourceColor};
