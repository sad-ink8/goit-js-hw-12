import{a as u,S as m,i as l}from"./assets/vendor-D6sx4wc_.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();function g(o){return u.get("https://pixabay.com/api/",{params:{key:"49069993-51884dcb47f371bf5faecc40d",q:o,image_type:"photo",orientation:"horizontal",safesearch:!0}}).then(r=>r.data).catch(r=>{console.error("Error:",r)})}const f=document.querySelector(".gallery"),h=o=>{const{hits:r}=o;return r.length===0&&l.error({message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"white",position:"topRight",backgroundColor:"red"}),r.map(({webformatURL:a,largeImageURL:s,tags:e,likes:t,views:i,comments:d,downloads:p})=>`
            <li class="gallery-item"><div class="box">
                <a href="${s}" target="_blank">
                    <img class="gallery-img" src="${a}" alt="${e}" loading="lazy" />
                </a>
                <div class="description">
                    <div><p>Likes</p><span> ${t}</span></div>
                    <div><p>Views</p><span> ${i}</span></div>
                    <div><p>Comments</p><span> ${d}</span></div>
                    <div><p>Downloads</p><span> ${p}</span></div>
                </div>
            </div></li>`).join("")},y=o=>{const r=h(o);f.innerHTML=r},v=()=>{new m(".gallery a").refresh()},n=document.querySelector("form"),c=document.querySelector(".gallery");function b(){n.addEventListener("submit",o=>{o.preventDefault();const a=new FormData(o.target).get("search");if(!a){l.error({message:"Input is empty!",messageColor:"white",position:"topRight",backgroundColor:"red"});return}n.reset(),c.innerHTML='<span class="loader"></span>',g(a).then(s=>{y(s),v()}).catch(s=>{console.error("Error:",s),c.innerHTML=""})})}b();
//# sourceMappingURL=index.js.map
