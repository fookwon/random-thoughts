!function(){"use strict";(t=>{const{screen:{width:e,height:a},navigator:{language:r},location:n,document:i,history:c}=t,{hostname:s,href:o}=n,{currentScript:u,referrer:l}=i,d=o.startsWith("data:")?void 0:t.localStorage;if(!u)return;const h="data-",m=u.getAttribute.bind(u),f=m(h+"website-id"),p=m(h+"host-url"),g=m(h+"tag"),y="false"!==m(h+"auto-track"),b="true"===m(h+"exclude-search"),v=m(h+"domains")||"",w=v.split(",").map((t=>t.trim())),S=`${(p||"https://api-gateway.umami.dev"||u.src.split("/").slice(0,-1).join("/")).replace(/\/$/,"")}/api/send`,N=`${e}x${a}`,T=/data-umami-event-([\w-_]+)/,A=h+"umami-event",x=300,O=t=>{if(t){try{const e=decodeURI(t);if(e!==t)return e}catch(e){return t}return encodeURI(t)}},U=t=>{try{const{pathname:e,search:a,hash:r}=new URL(t,n.origin);t=e+a+r}catch(t){}return b?t.split("?")[0]:t},j=()=>({website:f,hostname:s,screen:N,language:r,title:O(q),url:O(D),referrer:O(_),tag:g||void 0}),k=(t,e,a)=>{a&&(_=D,D=U(a.toString()),D!==_&&setTimeout(I,x))},E=()=>!f||d&&d.getItem("umami.disabled")||v&&!w.includes(s),L=async(t,e="event")=>{if(E())return;const a={"Content-Type":"application/json"};void 0!==R&&(a["x-umami-cache"]=R);try{const r=await fetch(S,{method:"POST",body:JSON.stringify({type:e,payload:t}),headers:a}),n=await r.text();return R=n}catch(t){}},$=()=>{B||(I(),(()=>{const t=(t,e,a)=>{const r=t[e];return(...e)=>(a.apply(null,e),r.apply(t,e))};c.pushState=t(c,"pushState",k),c.replaceState=t(c,"replaceState",k)})(),(()=>{const t=new MutationObserver((([t])=>{q=t&&t.target?t.target.text:void 0})),e=i.querySelector("head > title");e&&t.observe(e,{subtree:!0,characterData:!0,childList:!0})})(),i.addEventListener("click",(async t=>{const e=t=>["BUTTON","A"].includes(t),a=async t=>{const e=t.getAttribute.bind(t),a=e(A);if(a){const r={};return t.getAttributeNames().forEach((t=>{const a=t.match(T);a&&(r[a[1]]=e(t))})),I(a,r)}},r=t.target,i=e(r.tagName)?r:((t,a)=>{let r=t;for(let t=0;t<a;t++){if(e(r.tagName))return r;if(r=r.parentElement,!r)return null}})(r,10);if(!i)return a(r);{const{href:e,target:r}=i,c=i.getAttribute(A);if(c)if("A"===i.tagName){const s="_blank"===r||t.ctrlKey||t.shiftKey||t.metaKey||t.button&&1===t.button;if(c&&e)return s||t.preventDefault(),a(i).then((()=>{s||(n.href=e)}))}else if("BUTTON"===i.tagName)return a(i)}}),!0),B=!0)},I=(t,e)=>L("string"==typeof t?{...j(),name:t,data:"object"==typeof e?e:void 0}:"object"==typeof t?t:"function"==typeof t?t(j()):j()),K=t=>L({...j(),data:t},"identify");t.umami||(t.umami={track:I,identify:K});let R,B,D=U(o),_=l!==s?l:"",q=i.title;y&&!E()&&("complete"===i.readyState?$():i.addEventListener("readystatechange",$,!0))})(window)}();