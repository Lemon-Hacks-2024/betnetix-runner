import{b as r,I as ue,f as N,r as f,o as u,d as M,w as i,h as Le,k as s,Q as Me,g as A,q as G,s as ee,l as Ee,v as Oe,c as _,a as c,t as C,i as T,x as Se,y as B,z as He,n as de,A as b,B as F,C as Te,m as pe,u as te,D as De,E as $e,F as k,T as re,G as Ae,H as Ue,J as Ie,j as ve,K as ze,L as Pe,P as Ve}from"./index-DHAk69yj.js";/* empty css                                                                 */import{u as fe}from"./groupsStore-CMBPJskC.js";import{_ as ne}from"./_plugin-vue_export-helper-DlAUqK2U.js";var Be={icon:{tag:"svg",attrs:{"fill-rule":"evenodd",viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M880 912H144c-17.7 0-32-14.3-32-32V144c0-17.7 14.3-32 32-32h360c4.4 0 8 3.6 8 8v56c0 4.4-3.6 8-8 8H184v656h656V520c0-4.4 3.6-8 8-8h56c4.4 0 8 3.6 8 8v360c0 17.7-14.3 32-32 32zM770.87 199.13l-52.2-52.2a8.01 8.01 0 014.7-13.6l179.4-21c5.1-.6 9.5 3.7 8.9 8.9l-21 179.4c-.8 6.6-8.9 9.4-13.6 4.7l-52.4-52.4-256.2 256.2a8.03 8.03 0 01-11.3 0l-42.4-42.4a8.03 8.03 0 010-11.3l256.1-256.3z"}}]},name:"export",theme:"outlined"};function ie(e){for(var t=1;t<arguments.length;t++){var a=arguments[t]!=null?Object(arguments[t]):{},n=Object.keys(a);typeof Object.getOwnPropertySymbols=="function"&&(n=n.concat(Object.getOwnPropertySymbols(a).filter(function(l){return Object.getOwnPropertyDescriptor(a,l).enumerable}))),n.forEach(function(l){Ne(e,l,a[l])})}return e}function Ne(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var ae=function(t,a){var n=ie({},t,a.attrs);return r(ue,ie({},n,{icon:Be}),null)};ae.displayName="ExportOutlined";ae.inheritAttrs=!1;var Re={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M456 231a56 56 0 10112 0 56 56 0 10-112 0zm0 280a56 56 0 10112 0 56 56 0 10-112 0zm0 280a56 56 0 10112 0 56 56 0 10-112 0z"}}]},name:"more",theme:"outlined"};function ce(e){for(var t=1;t<arguments.length;t++){var a=arguments[t]!=null?Object(arguments[t]):{},n=Object.keys(a);typeof Object.getOwnPropertySymbols=="function"&&(n=n.concat(Object.getOwnPropertySymbols(a).filter(function(l){return Object.getOwnPropertyDescriptor(a,l).enumerable}))),n.forEach(function(l){Ge(e,l,a[l])})}return e}function Ge(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var oe=function(t,a){var n=ce({},t,a.attrs);return r(ue,ce({},n,{icon:Re}),null)};oe.displayName="MoreOutlined";oe.inheritAttrs=!1;const $=N({__name:"FormItemTooltip",setup(e){return(t,a)=>{const n=f("a-tooltip");return u(),M(n,{placement:"right"},{title:i(()=>[Le(t.$slots,"default")]),default:i(()=>[r(s(Me),{class:"ml-2 opacity-50"})]),_:3})}}}),Fe={key:0},je={key:1},Ye={class:"date"},Xe={class:"time"},We=N({__name:"CellDate",props:{date:{}},setup(e){const t=A(G.unix(e.date).format("D MMMM YYYY")),a=A(G.unix(e.date).format("HH:mm")),{language:n}=ee(Ee());return Oe(n,()=>{t.value=G.unix(e.date).format("D MMMM YYYY"),a.value=G.unix(e.date).format("HH:mm")}),(l,o)=>l.date?(u(),_("span",je,[c("span",Ye,C(t.value),1),c("span",Xe,C(a.value),1)])):(u(),_("span",Fe,"—"))}}),qe=ne(We,[["__scopeId","data-v-a394edb6"]]),Qe="";function U(e,t){t===void 0&&(t={});var a=t.insertAt;if(!(!e||typeof document>"u")){var n=document.head||document.getElementsByTagName("head")[0],l=document.createElement("style");l.type="text/css",a==="top"&&n.firstChild?n.insertBefore(l,n.firstChild):n.appendChild(l),l.styleSheet?l.styleSheet.cssText=e:l.appendChild(document.createTextNode(e))}}const I=function(e,t){const{componentPrefix:a=Qe}=t||{};e.component(`${a}${this.name}`,this)},J={};var R={name:"Checkboard",props:{size:{type:[Number,String],default:8},white:{type:String,default:"#fff"},grey:{type:String,default:"#e6e6e6"}},computed:{bgStyle(){return{"background-image":`url(${Ke(this.white,this.grey,this.size)})`}}}};function Je(e,t,a){if(typeof document>"u")return null;const n=document.createElement("canvas");n.width=n.height=a*2;const l=n.getContext("2d");return l?(l.fillStyle=e,l.fillRect(0,0,n.width,n.height),l.fillStyle=t,l.fillRect(0,0,a,a),l.translate(a,a),l.fillRect(0,0,a,a),n.toDataURL()):null}function Ke(e,t,a){const n=`${e},${t},${a}`;if(J[n])return J[n];const l=Je(e,t,a);return J[n]=l,l}function Ze(e,t,a,n,l,o){return u(),_("div",{class:"vc-checkerboard",style:T(o.bgStyle)},null,4)}var et=".vc-checkerboard{background-size:contain;bottom:0;left:0;position:absolute;right:0;top:0}";U(et);R.render=Ze;R.__file="src/components/checkboard/checkboard.vue";R.install=I;var j={name:"Alpha",components:{Checkboard:R},props:{value:Object,onChange:Function},computed:{colors(){return this.value},gradientColor(){const{rgba:e}=this.colors,t=[e.r,e.g,e.b].join(",");return`linear-gradient(to right, rgba(${t}, 0) 0%, rgba(${t}, 1) 100%)`}},methods:{handleChange(e,t){!t&&e.preventDefault();const{container:a}=this.$refs;if(!a)return;const n=a.clientWidth,l=a.getBoundingClientRect().left+window.pageXOffset,h=(e.pageX||(e.touches?e.touches[0].pageX:0))-l;let p;h<0?p=0:h>n?p=1:p=Math.round(h*100/n)/100,this.colors.a!==p&&this.$emit("change",{h:this.colors.hsl.h,s:this.colors.hsl.s,l:this.colors.hsl.l,a:p,source:"rgba"})},handleMouseDown(e){this.handleChange(e,!0),window.addEventListener("mousemove",this.handleChange),window.addEventListener("mouseup",this.handleMouseUp)},handleMouseUp(){this.unbindEventListeners()},unbindEventListeners(){window.removeEventListener("mousemove",this.handleChange),window.removeEventListener("mouseup",this.handleMouseUp)}}};const tt={class:"vc-alpha"},nt={class:"vc-alpha-checkboard-wrap"},at=c("div",{class:"vc-alpha-picker"},null,-1),ot=[at];function lt(e,t,a,n,l,o){const h=f("Checkboard");return u(),_("div",tt,[c("div",nt,[r(h)]),c("div",{class:"vc-alpha-gradient",style:T({background:o.gradientColor})},null,4),c("div",{ref:"container",class:"vc-alpha-container",onMousedown:t[0]||(t[0]=(...p)=>o.handleMouseDown&&o.handleMouseDown(...p)),onTouchmove:t[1]||(t[1]=(...p)=>o.handleChange&&o.handleChange(...p)),onTouchstart:t[2]||(t[2]=(...p)=>o.handleChange&&o.handleChange(...p))},[c("div",{class:"vc-alpha-pointer",style:T({left:`${o.colors.a*100}%`})},ot,4)],544)])}var st=".vc-alpha,.vc-alpha-checkboard-wrap{bottom:0;left:0;position:absolute;right:0;top:0}.vc-alpha-checkboard-wrap{overflow:hidden}.vc-alpha-gradient{bottom:0;left:0;position:absolute;right:0;top:0}.vc-alpha-container{cursor:pointer;height:100%;margin:0 3px;position:relative;z-index:2}.vc-alpha-pointer{position:absolute;z-index:2}.vc-alpha-picker{background:#fff;border-radius:1px;box-shadow:0 0 2px rgba(0,0,0,.6);cursor:pointer;height:8px;margin-top:1px;transform:translateX(-2px);width:4px}";U(st);j.render=lt;j.__file="src/components/alpha/alpha.vue";j.install=I;function H(...e){return new Se(...e)}function K(e,t){const a=e&&e.a;let n;e&&e.hsl?n=H(e.hsl):e&&e.hex&&e.hex.length>0?n=H(e.hex):e&&e.hsv?n=H(e.hsv):e&&e.rgba?n=H(e.rgba):e&&e.rgb?n=H(e.rgb):n=H(e),n&&(n._a===void 0||n._a===null)&&n.setAlpha(a||n.getAlpha());const l=n.toHsl(),o=n.toHsv();return l.s===0&&(o.h=l.h=e.h||e.hsl&&e.hsl.h||t||0),o.v<.0164&&(o.h=e.h||e.hsv&&e.hsv.h||0,o.s=e.s||e.hsv&&e.hsv.s||0),l.l<.01&&(l.h=e.h||e.hsl&&e.hsl.h||0,l.s=e.s||e.hsl&&e.hsl.s||0),{hsl:l,hex:n.toHexString().toUpperCase(),hex8:n.toHex8String().toUpperCase(),rgba:n.toRgb(),hsv:o,oldHue:e.h||t||l.h,source:e.source,a:n.getAlpha()}}var rt={model:{prop:"modelValue",event:"update:modelValue"},props:["modelValue"],data(){return{val:K(this.modelValue)}},computed:{colors:{get(){return this.val},set(e){this.val=e,this.$emit("update:modelValue",e)}}},watch:{modelValue(e){this.val=K(e)}},methods:{colorChange(e,t){this.oldHue=this.colors.hsl.h,this.colors=K(e,t||this.oldHue)},isValidHex(e){return H(e).isValid},simpleCheckForValidColor(e){const t=["r","g","b","a","h","s","l","v"];let a=0,n=0;for(let l=0;l<t.length;l++){const o=t[l];e[o]&&(a++,isNaN(e[o])||n++)}if(a===n)return e},paletteUpperCase(e){return e.map(t=>t.toUpperCase())},isTransparent(e){return H(e).getAlpha()===0}}},Y={name:"EditableInput",props:{label:String,labelText:String,desc:String,value:[String,Number],max:Number,min:Number,arrowOffset:{type:Number,default:1}},computed:{val:{get(){return this.value},set(e){if(this.max!==void 0&&+e>this.max)this.$refs.input.value=this.max;else return e}},labelId(){return`input__label__${this.label}__${Math.random().toString().slice(2,5)}`},labelSpanText(){return this.labelText||this.label}},methods:{update(e){this.handleChange(e.target.value)},handleChange(e){const t={};t[this.label]=e,t.hex===void 0&&t["#"]===void 0?this.$emit("change",t):e.length>5&&this.$emit("change",t)},handleKeyDown(e){let{val:t}=this;const a=Number(t);if(a){const n=this.arrowOffset||1;e.keyCode===38&&(t=a+n,this.handleChange(t),e.preventDefault()),e.keyCode===40&&(t=a-n,this.handleChange(t),e.preventDefault())}}}};const it={class:"vc-editable-input"},ct=["aria-labelledby"],ht=["id","for"],ut={class:"vc-input__desc"};function dt(e,t,a,n,l,o){return u(),_("div",it,[B(c("input",{ref:"input","onUpdate:modelValue":t[0]||(t[0]=h=>o.val=h),"aria-labelledby":o.labelId,class:"vc-input__input",onKeydown:t[1]||(t[1]=(...h)=>o.handleKeyDown&&o.handleKeyDown(...h)),onInput:t[2]||(t[2]=(...h)=>o.update&&o.update(...h))},null,40,ct),[[He,o.val]]),c("span",{id:o.labelId,for:a.label,class:"vc-input__label"},C(o.labelSpanText),9,ht),c("span",ut,C(a.desc),1)])}var pt=".vc-editable-input{position:relative}.vc-input__input{border:0;outline:none;padding:0}.vc-input__label{text-transform:capitalize}";U(pt);Y.render=dt;Y.__file="src/components/editable-input/editable-input.vue";Y.install=I;function Z(e,t,a){return t<a?e<t?t:e>a?a:e:e<a?a:e>t?t:e}var X={name:"Saturation",props:{value:Object},computed:{colors(){return this.value},bgColor(){return`hsl(${this.colors.hsv.h}, 100%, 50%)`},pointerTop(){return`${-(this.colors.hsv.v*100)+1+100}%`},pointerLeft(){return`${this.colors.hsv.s*100}%`}},methods:{handleChange(e,t){!t&&e.preventDefault();const{container:a}=this.$refs;if(!a)return;const n=a.clientWidth,l=a.clientHeight,o=a.getBoundingClientRect().left+window.pageXOffset,h=a.getBoundingClientRect().top+window.pageYOffset,p=e.pageX||(e.touches?e.touches[0].pageX:0),E=e.pageY||(e.touches?e.touches[0].pageY:0),y=Z(p-o,0,n),g=Z(E-h,0,l),d=y/n,D=Z(-(g/l)+1,0,1);this.onChange({h:this.colors.hsv.h,s:d,v:D,a:this.colors.hsv.a,source:"hsva"})},onChange(e){this.$emit("change",e)},handleMouseDown(e){window.addEventListener("mousemove",this.handleChange),window.addEventListener("mouseup",this.handleChange),window.addEventListener("mouseup",this.handleMouseUp)},handleMouseUp(e){this.unbindEventListeners()},unbindEventListeners(){window.removeEventListener("mousemove",this.handleChange),window.removeEventListener("mouseup",this.handleChange),window.removeEventListener("mouseup",this.handleMouseUp)}}};const vt=c("div",{class:"vc-saturation--white"},null,-1),ft=c("div",{class:"vc-saturation--black"},null,-1),gt=c("div",{class:"vc-saturation-circle"},null,-1),mt=[gt];function bt(e,t,a,n,l,o){return u(),_("div",{ref:"container",class:"vc-saturation",style:T({background:o.bgColor}),onMousedown:t[0]||(t[0]=(...h)=>o.handleMouseDown&&o.handleMouseDown(...h)),onTouchmove:t[1]||(t[1]=(...h)=>o.handleChange&&o.handleChange(...h)),onTouchstart:t[2]||(t[2]=(...h)=>o.handleChange&&o.handleChange(...h))},[vt,ft,c("div",{class:"vc-saturation-pointer",style:T({top:o.pointerTop,left:o.pointerLeft})},mt,4)],36)}var _t=".vc-saturation,.vc-saturation--black,.vc-saturation--white{bottom:0;cursor:pointer;left:0;position:absolute;right:0;top:0}.vc-saturation--white{background:linear-gradient(90deg,#fff,hsla(0,0%,100%,0))}.vc-saturation--black{background:linear-gradient(0deg,#000,transparent)}.vc-saturation-pointer{cursor:pointer;position:absolute}.vc-saturation-circle{border-radius:50%;box-shadow:0 0 0 1.5px #fff,inset 0 0 1px 1px rgba(0,0,0,.3),0 0 1px 2px rgba(0,0,0,.4);cursor:head;height:4px;transform:translate(-2px,-2px);width:4px}";U(_t);X.render=bt;X.__file="src/components/saturation/saturation.vue";X.install=I;var W={name:"Hue",props:{value:Object,direction:{type:String,default:"horizontal"}},data(){return{oldHue:0,pullDirection:""}},computed:{colors(){return this.value},directionClass(){return{"vc-hue--horizontal":this.direction==="horizontal","vc-hue--vertical":this.direction==="vertical"}},pointerTop(){return this.direction==="vertical"?this.colors.hsl.h===0&&this.pullDirection==="right"?0:`${-(this.colors.hsl.h*100/360)+100}%`:0},pointerLeft(){return this.direction==="vertical"?0:this.colors.hsl.h===0&&this.pullDirection==="right"?"100%":`${this.colors.hsl.h*100/360}%`}},watch:{value:{handler(e,t){const{h:a}=e.hsl;a!==0&&a-this.oldHue>0&&(this.pullDirection="right"),a!==0&&a-this.oldHue<0&&(this.pullDirection="left"),this.oldHue=a},deep:!0,immediate:!0}},methods:{handleChange(e,t){!t&&e.preventDefault();const{container:a}=this.$refs;if(!a)return;const n=a.clientWidth,l=a.clientHeight,o=a.getBoundingClientRect().left+window.pageXOffset,h=a.getBoundingClientRect().top+window.pageYOffset,p=e.pageX||(e.touches?e.touches[0].pageX:0),E=e.pageY||(e.touches?e.touches[0].pageY:0),y=p-o,g=E-h;let d,D;this.direction==="vertical"?(g<0?d=360:g>l?d=0:(D=-(g*100/l)+100,d=360*D/100),this.colors.hsl.h!==d&&this.$emit("change",{h:d,s:this.colors.hsl.s,l:this.colors.hsl.l,a:this.colors.hsl.a,source:"hsl"})):(y<0?d=0:y>n?d=360:(D=y*100/n,d=360*D/100),this.colors.hsl.h!==d&&this.$emit("change",{h:d,s:this.colors.hsl.s,l:this.colors.hsl.l,a:this.colors.hsl.a,source:"hsl"}))},handleMouseDown(e){this.handleChange(e,!0),window.addEventListener("mousemove",this.handleChange),window.addEventListener("mouseup",this.handleChange),window.addEventListener("mouseup",this.handleMouseUp)},handleMouseUp(e){this.unbindEventListeners()},unbindEventListeners(){window.removeEventListener("mousemove",this.handleChange),window.removeEventListener("mouseup",this.handleChange),window.removeEventListener("mouseup",this.handleMouseUp)}}};const xt=["aria-valuenow"],wt=c("div",{class:"vc-hue-picker"},null,-1),Ct=[wt];function yt(e,t,a,n,l,o){return u(),_("div",{class:de(["vc-hue",[o.directionClass]])},[c("div",{ref:"container",class:"vc-hue-container",role:"slider","aria-valuenow":o.colors.hsl.h,"aria-valuemin":"0","aria-valuemax":"360",onMousedown:t[0]||(t[0]=(...h)=>o.handleMouseDown&&o.handleMouseDown(...h)),onTouchmove:t[1]||(t[1]=(...h)=>o.handleChange&&o.handleChange(...h)),onTouchstart:t[2]||(t[2]=(...h)=>o.handleChange&&o.handleChange(...h))},[c("div",{class:"vc-hue-pointer",style:T({top:o.pointerTop,left:o.pointerLeft}),role:"presentation"},Ct,4)],40,xt)],2)}var kt=".vc-hue{border-radius:2px;bottom:0;left:0;position:absolute;right:0;top:0}.vc-hue--horizontal{background:linear-gradient(90deg,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red)}.vc-hue--vertical{background:linear-gradient(0deg,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red)}.vc-hue-container{cursor:pointer;height:100%;margin:0 2px;position:relative}.vc-hue-pointer{position:absolute;z-index:2}.vc-hue-picker{background:#fff;border-radius:1px;box-shadow:0 0 2px rgba(0,0,0,.6);cursor:pointer;height:8px;margin-top:1px;transform:translateX(-2px);width:4px}";U(kt);W.render=yt;W.__file="src/components/hue/hue.vue";W.install=I;var q={name:"Chrome",components:{Saturation:X,Hue:W,Alpha:j,EdIn:Y,Checkboard:R},mixins:[rt],props:{disableAlpha:{type:Boolean,default:!1},disableFields:{type:Boolean,default:!1},format:{type:String,default:"hex"}},data(){return{fieldsIndex:"hex",highlight:!1}},computed:{hsl(){const{h:e,s:t,l:a}=this.colors.hsl;return{h:e.toFixed(),s:`${(t*100).toFixed()}%`,l:`${(a*100).toFixed()}%`}},activeColor(){const{rgba:e}=this.colors;return`rgba(${[e.r,e.g,e.b,e.a].join(",")})`},hasAlpha(){return this.colors.a<1}},watch:{format:{handler(e){this.fieldsIndex=e},immediate:!0}},methods:{childChange(e){this.colorChange(e)},inputChange(e){if(e){if(e.hex)this.isValidHex(e.hex)&&this.colorChange({hex:e.hex,source:"hex"});else if(e.r||e.g||e.b||e.a)this.colorChange({r:e.r||this.colors.rgba.r,g:e.g||this.colors.rgba.g,b:e.b||this.colors.rgba.b,a:e.a||this.colors.rgba.a,source:"rgba"});else if(e.h||e.s||e.l){const t=e.s?e.s.replace("%","")/100:this.colors.hsl.s,a=e.l?e.l.replace("%","")/100:this.colors.hsl.l;this.colorChange({h:e.h||this.colors.hsl.h,s:t,l:a,source:"hsl"})}}},toggleViews(){switch(this.fieldsIndex){case"hex":this.fieldsIndex=`rgb${this.disableAlpha?"":"a"}`;break;case"rgb":case"rgba":this.fieldsIndex=`hsl${this.disableAlpha?"":"a"}`;break;default:this.fieldsIndex="hex";break}this.$emit("update:format",this.fieldsIndex)},showHighlight(){this.highlight=!0},hideHighlight(){this.highlight=!1}}};const Lt={class:"vc-chrome-saturation-wrap"},Mt={class:"vc-chrome-body"},Et={class:"vc-chrome-controls"},Ot={class:"vc-chrome-color-wrap"},St=["aria-label"],Ht={class:"vc-chrome-sliders"},Tt={class:"vc-chrome-hue-wrap"},Dt={key:0,class:"vc-chrome-alpha-wrap"},$t={key:0,class:"vc-chrome-fields-wrap"},At={class:"vc-chrome-fields"},Ut={class:"vc-chrome-field"},It={class:"vc-chrome-fields"},zt={class:"vc-chrome-field"},Pt={class:"vc-chrome-field"},Vt={class:"vc-chrome-field"},Bt={key:0,class:"vc-chrome-field"},Nt={class:"vc-chrome-fields"},Rt={class:"vc-chrome-field"},Gt={class:"vc-chrome-field"},Ft={class:"vc-chrome-field"},jt={key:0,class:"vc-chrome-field"},Yt={class:"vc-chrome-toggle-icon"},Xt=c("path",{fill:"#333",d:"M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z"},null,-1),Wt=[Xt],qt={class:"vc-chrome-toggle-icon-highlight"};function Qt(e,t,a,n,l,o){const h=f("Saturation"),p=f("Checkboard"),E=f("Hue"),y=f("Alpha"),g=f("EdIn");return u(),_("div",{role:"application","aria-label":"Chrome color picker",class:de(["vc-chrome",[a.disableAlpha?"vc-chrome__disable-alpha":""]])},[c("div",Lt,[r(h,{value:e.colors,onChange:o.childChange},null,8,["value","onChange"])]),c("div",Mt,[c("div",Et,[c("div",Ot,[c("div",{"aria-label":`current color is ${e.colors.hex}`,class:"vc-chrome-active-color",style:T({background:o.activeColor})},null,12,St),a.disableAlpha?b("v-if",!0):(u(),M(p,{key:0}))]),c("div",Ht,[c("div",Tt,[r(E,{value:e.colors,onChange:o.childChange},null,8,["value","onChange"])]),a.disableAlpha?b("v-if",!0):(u(),_("div",Dt,[r(y,{value:e.colors,onChange:o.childChange},null,8,["value","onChange"])]))])]),a.disableFields?b("v-if",!0):(u(),_("div",$t,[B(c("div",At,[b(" hex "),c("div",Ut,[o.hasAlpha?b("v-if",!0):(u(),M(g,{key:0,label:"hex",value:e.colors.hex,onChange:o.inputChange},null,8,["value","onChange"])),o.hasAlpha?(u(),M(g,{key:1,label:"hex",value:e.colors.hex8,onChange:o.inputChange},null,8,["value","onChange"])):b("v-if",!0)])],512),[[F,l.fieldsIndex==="hex"]]),B(c("div",It,[b(" rgba "),c("div",zt,[r(g,{label:"r",value:e.colors.rgba.r,onChange:o.inputChange},null,8,["value","onChange"])]),c("div",Pt,[r(g,{label:"g",value:e.colors.rgba.g,onChange:o.inputChange},null,8,["value","onChange"])]),c("div",Vt,[r(g,{label:"b",value:e.colors.rgba.b,onChange:o.inputChange},null,8,["value","onChange"])]),a.disableAlpha?b("v-if",!0):(u(),_("div",Bt,[r(g,{label:"a",value:e.colors.a,"arrow-offset":.01,max:1,onChange:o.inputChange},null,8,["value","arrow-offset","onChange"])]))],512),[[F,["rgb","rgba"].includes(l.fieldsIndex)]]),B(c("div",Nt,[b(" hsla "),c("div",Rt,[r(g,{label:"h",value:o.hsl.h,onChange:o.inputChange},null,8,["value","onChange"])]),c("div",Gt,[r(g,{label:"s",value:o.hsl.s,onChange:o.inputChange},null,8,["value","onChange"])]),c("div",Ft,[r(g,{label:"l",value:o.hsl.l,onChange:o.inputChange},null,8,["value","onChange"])]),a.disableAlpha?b("v-if",!0):(u(),_("div",jt,[r(g,{label:"a",value:e.colors.a,"arrow-offset":.01,max:1,onChange:o.inputChange},null,8,["value","arrow-offset","onChange"])]))],512),[[F,["hsl","hsla"].includes(l.fieldsIndex)]]),b(" btn "),c("div",{class:"vc-chrome-toggle-btn",role:"button","aria-label":"Change another color definition",onClick:t[3]||(t[3]=(...d)=>o.toggleViews&&o.toggleViews(...d))},[c("div",Yt,[(u(),_("svg",{style:{width:"24px",height:"24px"},viewBox:"0 0 24 24",onMouseover:t[0]||(t[0]=(...d)=>o.showHighlight&&o.showHighlight(...d)),onMouseenter:t[1]||(t[1]=(...d)=>o.showHighlight&&o.showHighlight(...d)),onMouseout:t[2]||(t[2]=(...d)=>o.hideHighlight&&o.hideHighlight(...d))},Wt,32))]),B(c("div",qt,null,512),[[F,l.highlight]])]),b(" btn ")]))])],2)}var Jt=".vc-chrome{background:#fff;background-color:#fff;border-radius:2px;box-shadow:0 0 2px rgba(0,0,0,.3),0 4px 8px rgba(0,0,0,.3);box-sizing:initial;font-family:Menlo;width:225px}.vc-chrome-controls{display:flex}.vc-chrome-color-wrap{position:relative;width:36px}.vc-chrome-active-color{border-radius:15px;height:30px;overflow:hidden;position:relative;width:30px;z-index:1}.vc-chrome-color-wrap .vc-checkerboard{background-size:auto;border-radius:15px;height:30px;width:30px}.vc-chrome-sliders{flex:1}.vc-chrome-fields-wrap{display:flex;padding-top:16px}.vc-chrome-fields{display:flex;flex:1;margin-left:-6px}.vc-chrome-field{padding-left:6px;width:100%}.vc-chrome-toggle-btn{position:relative;text-align:right;width:32px}.vc-chrome-toggle-icon{cursor:pointer;margin-right:-4px;margin-top:12px;position:relative;z-index:2}.vc-chrome-toggle-icon-highlight{background:#eee;border-radius:4px;height:28px;left:12px;position:absolute;top:10px;width:24px}.vc-chrome-hue-wrap{margin-bottom:8px}.vc-chrome-alpha-wrap,.vc-chrome-hue-wrap{height:10px;position:relative}.vc-chrome-alpha-wrap .vc-alpha-gradient,.vc-chrome-hue-wrap .vc-hue{border-radius:2px}.vc-chrome-alpha-wrap .vc-alpha-picker,.vc-chrome-hue-wrap .vc-hue-picker{background-color:#f8f8f8;border-radius:6px;box-shadow:0 1px 4px 0 rgba(0,0,0,.37);height:12px;transform:translate(-6px,-2px);width:12px}.vc-chrome-body{background-color:#fff;padding:16px 16px 12px}.vc-chrome-saturation-wrap{border-radius:2px 2px 0 0;overflow:hidden;padding-bottom:55%;position:relative;width:100%}.vc-chrome-saturation-wrap .vc-saturation-circle{height:12px;width:12px}.vc-chrome-fields .vc-input__input{border:none;border-radius:2px;box-shadow:inset 0 0 0 1px #dadada;color:#333;font-size:11px;height:21px;text-align:center;width:100%}.vc-chrome-fields .vc-input__label{color:#969696;display:block;font-size:11px;line-height:11px;margin-top:12px;text-align:center;text-transform:uppercase}.vc-chrome__disable-alpha .vc-chrome-active-color{height:18px;width:18px}.vc-chrome__disable-alpha .vc-chrome-color-wrap{width:30px}.vc-chrome__disable-alpha .vc-chrome-hue-wrap{margin-bottom:4px;margin-top:4px}";U(Jt);q.render=Qt;q.__file="src/components/chrome/chrome.vue";q.install=I;const Kt={name:[{required:!0,message:"Введите название группы",trigger:"change"}]},S={required:!0,message:"Обязательное поле",trigger:"change"},Zt=()=>({beforeEnter:n=>{n.style.height="0",n.style.opacity="0"},enter:(n,l)=>{n.style.transition="height 0.3s ease, opacity 0.3s ease",requestAnimationFrame(()=>{n.style.height=n.scrollHeight+"px",n.style.opacity="1"}),n.addEventListener("transitionend",l)},leave:(n,l)=>{n.style.transition="height 0.3s ease, opacity 0.3s ease",n.style.height=n.scrollHeight+"px",n.style.opacity="1",requestAnimationFrame(()=>{n.style.height="0",n.style.opacity="0"}),n.addEventListener("transitionend",l)}}),en={key:0,class:"row-advanced-wrapper"},tn=N({__name:"CreateGroup",props:{open:{type:Boolean},openModifiers:{}},emits:["update:open"],setup(e){const t=Te(e,"open"),a=pe(),{$t:n}=te(),l=fe(),{fetchRandomPlayers:o,fetchCreateGroups:h}=l,{loadingRandomPlayers:p,loadingCreateGroups:E}=ee(l),{beforeEnter:y,enter:g,leave:d}=Zt(),O=De({...{name:"",is_self:!1,players:[]}});$e(async()=>{t.value&&(O.players=await o()??[])});const z=A(-1),ge=P=>{P===z.value?z.value=-1:z.value=P},le=A(),me=async()=>{var m;await((m=le.value)==null?void 0:m.validate());const P=await h(O);a.push(`/group/${P}`),Ie.success("Группа успешно создана")};return(P,m)=>{const Q=f("a-input"),L=f("a-form-item"),be=f("a-switch"),_e=f("a-popover"),V=f("a-input-number"),xe=f("a-button"),we=f("a-tooltip"),se=f("a-flex"),Ce=f("a-spin"),ye=f("a-form"),ke=f("a-modal");return u(),M(ke,{class:"!w-[850px]",open:t.value,"onUpdate:open":m[2]||(m[2]=v=>t.value=v),title:s(n).main.groupCreating,"ok-text":s(n).buttons.create,onOk:me,"ok-button-props":{loading:s(E)}},{default:i(()=>[r(ye,{ref_key:"formRef",ref:le,model:O,rules:s(Kt),layout:"vertical"},{default:i(()=>[r(L,{name:"name",label:s(n).labels.groupNameLabel},{default:i(()=>[r(Q,{value:O.name,"onUpdate:value":m[0]||(m[0]=v=>O.name=v),placeholder:s(n).placeholders.enterGroupTitle},null,8,["value","placeholder"])]),_:1},8,["label"]),r(L,{name:"is_self",label:s(n).labels.groupNameLabel},{tooltip:i(()=>[r(s($),null,{default:i(()=>[k(C(s(n).main.randomByDefault),1)]),_:1})]),default:i(()=>[r(be,{checked:O.is_self,"onUpdate:checked":m[1]||(m[1]=v=>O.is_self=v)},null,8,["checked"])]),_:1},8,["label"]),r(re,{name:"fade"},{default:i(()=>[O.is_self?(u(),M(Ce,{key:0,spinning:s(p)},{default:i(()=>[(u(!0),_(Ue,null,Ae(O.players,(v,x)=>(u(),_("div",{key:x},[r(se,{gap:12},{default:i(()=>[r(L,{name:["players",x,"name"],label:x==0?s(n).labels.groupNameLabel:"",rules:s(S),class:"player-input"},{default:i(()=>[r(Q,{value:v.name,"onUpdate:value":w=>v.name=w,placeholder:s(n).placeholders.enterName},null,8,["value","onUpdate:value","placeholder"])]),_:2},1032,["name","label","rules"]),r(L,{name:["players",x,"color"],label:x==0?s(n).labels.colorLabel:"",rules:s(S),class:"player-input"},{default:i(()=>[r(_e,{trigger:["click"],placement:"rightTop"},{content:i(()=>[r(s(q),{"model-value":v.color,"onUpdate:modelValue":w=>v.color=w.hex},null,8,["model-value","onUpdate:modelValue"])]),default:i(()=>[r(Q,{value:v.color,placeholder:s(n).placeholders.chooseColor},{prefix:i(()=>[c("div",{class:"color-preview",style:T({background:v.color})},null,4)]),_:2},1032,["value","placeholder"])]),_:2},1024)]),_:2},1032,["name","label","rules"]),r(L,{name:["players",x,"number"],label:x==0?s(n).labels.numberLabel:"",rules:s(S),class:"player-input"},{tooltip:i(()=>[r(s($),null,{default:i(()=>[k(C(s(n).main.numberFromTo),1)]),_:1})]),default:i(()=>[r(V,{value:v.number,"onUpdate:value":w=>v.number=w,min:1,max:99,placeholder:s(n).placeholders.enterNumber,class:"!w-full"},null,8,["value","onUpdate:value","placeholder"])]),_:2},1032,["name","label","rules"]),r(L,{label:x==0?" ":""},{default:i(()=>[r(we,{placement:"right",title:s(n).popovers.advancedSettings},{default:i(()=>[r(xe,{onClick:w=>ge(x),icon:ve(s(oe))},null,8,["onClick","icon"])]),_:2},1032,["title"])]),_:2},1032,["label"])]),_:2},1024),r(re,{name:"collapse",onBeforeEnter:s(y),onEnter:s(g),onLeave:s(d)},{default:i(()=>[z.value===x?(u(),_("div",en,[z.value===x?(u(),M(se,{key:0,gap:12,class:"row-advanced"},{default:i(()=>[r(L,{name:["players",x,"reaction_time"],label:s(n).labels.reactionTimeLabel,rules:s(S)},{tooltip:i(()=>[r(s($),null,{default:i(()=>[k(C(s(n).main.reactionTimeOnStart),1)]),_:1})]),default:i(()=>[r(V,{value:v.reaction_time,"onUpdate:value":w=>v.reaction_time=w,min:.1,max:.3,step:.02,placeholder:s(n).placeholders.enterTime},{addonAfter:i(()=>m[3]||(m[3]=[k("сек")])),_:2},1032,["value","onUpdate:value","placeholder"])]),_:2},1032,["name","label","rules"]),r(L,{name:["players",x,"acceleration"],label:s(n).labels.accelerationLabel,rules:s(S)},{tooltip:i(()=>[r(s($),null,{default:i(()=>[k(C(s(n).main.startingPhase),1),m[4]||(m[4]=c("sup",null,"2",-1))]),_:1})]),default:i(()=>[r(V,{value:v.acceleration,"onUpdate:value":w=>v.acceleration=w,min:1,max:20,placeholder:s(n).placeholders.enterAcceleration},{addonAfter:i(()=>m[5]||(m[5]=[k("м/с"),c("sup",null,"2",-1)])),_:2},1032,["value","onUpdate:value","placeholder"])]),_:2},1032,["name","label","rules"]),r(L,{name:["players",x,"max_speed"],label:s(n).labels.maxSpeedLabel,rules:s(S)},{tooltip:i(()=>[r(s($),null,{default:i(()=>[k(C(s(n).main.recommendedValues),1)]),_:1})]),default:i(()=>[r(V,{value:v.max_speed,"onUpdate:value":w=>v.max_speed=w,placeholder:s(n).placeholders.enterSpeed,min:1,max:20},{addonAfter:i(()=>m[6]||(m[6]=[k("м/с")])),_:2},1032,["value","onUpdate:value","placeholder"])]),_:2},1032,["name","label","rules"]),r(L,{name:["players",x,"coff_speed_loss"],label:s(n).labels.coffSpeedLossLabel,rules:s(S)},{tooltip:i(()=>[r(s($),null,{default:i(()=>[k(C(s(n).main.coffOnFinalPhase),1)]),_:1})]),default:i(()=>[r(V,{value:Math.round(v.coff_speed_loss*100),"onUpdate:value":w=>Math.round(v.coff_speed_loss=w/100),placeholder:s(n).placeholders.enterCoff,min:1,max:10,rules:s(S)},{addonAfter:i(()=>m[7]||(m[7]=[k("%")])),_:2},1032,["value","onUpdate:value","placeholder","rules"])]),_:2},1032,["name","label","rules"])]),_:2},1024)):b("",!0)])):b("",!0)]),_:2},1032,["onBeforeEnter","onEnter","onLeave"])]))),128))]),_:1},8,["spinning"])):b("",!0)]),_:1})]),_:1},8,["model","rules"])]),_:1},8,["open","title","ok-text","ok-button-props"])}}}),nn=ne(tn,[["__scopeId","data-v-d4c0c4e9"]]),an=()=>{const e=fe(),{fetchGetGroups:t}=e,{loadingGetGroups:a}=ee(e),n={hideOnSinglePage:!0},l=A([]);return ze(async()=>{l.value=await t()??[]}),{loadingGetGroups:a,pagination:n,dataGroups:l}},{$t:he}=te(),on=Pe(()=>[{title:he.value.main.title,dataIndex:"name"},{title:he.value.main.lastRace,dataIndex:"date_time_last_race"}]),ln=N({__name:"GroupsTable",setup(e){const t=pe(),{loadingGetGroups:a,pagination:n,dataGroups:l}=an(),o=h=>({...h,onClick:()=>{t.push(`/group/${h.id}`)}});return(h,p)=>{const E=f("a-space"),y=f("a-table");return u(),M(y,{"data-source":s(l),columns:s(on),pagination:s(n),loading:s(a),customRow:o,size:"small"},{bodyCell:i(({column:g,text:d})=>[g.dataIndex==="name"?(u(),M(E,{key:0,size:16},{default:i(()=>[r(s(ae),{class:"opacity-50"}),c("span",null,C(d),1)]),_:2},1024)):b("",!0),g.dataIndex==="date_time_last_race"?(u(),M(s(qe),{key:1,date:d},null,8,["date"])):b("",!0)]),_:1},8,["data-source","columns","pagination","loading"])}}}),sn={class:"main-page-wrapper"},rn=N({__name:"MainPage",setup(e){const t=A(!1),{$t:a}=te();return(n,l)=>{const o=f("a-button"),h=f("a-card");return u(),_("div",sn,[r(h,{class:"table-wrapper",bordered:!1},{extra:i(()=>[r(o,{class:"card-btn",type:"primary",icon:ve(s(Ve)),onClick:l[0]||(l[0]=p=>t.value=!0)},{default:i(()=>[k(C(s(a).buttons.createGroup),1)]),_:1},8,["icon"])]),default:i(()=>[r(s(nn),{open:t.value,"onUpdate:open":l[1]||(l[1]=p=>t.value=p)},null,8,["open"]),r(s(ln))]),_:1})])}}}),pn=ne(rn,[["__scopeId","data-v-72c3bd88"]]);export{pn as default};
