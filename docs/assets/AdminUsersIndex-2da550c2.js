import{l as v}from"./lodash-336d108c.js";import{d as B,r as p,g as P,f as $,h as A,c as n,a as t,i as L,j as M,F as c,k as _,e as f,t as g,o,l as E}from"./index-0ab2a216.js";const S={class:"mx-auto max-w-screen-xl mt-3 mb-5"},T={class:"sm:flex sm:items-center sm:justify-between"},U=t("div",{class:"text-center sm:text-left"},[t("h1",{class:"text-2xl font-bold text-gray-900 sm:text-3xl"}," List of Admin Users ")],-1),V={class:"mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center"},z={class:"overflow-x-auto text-left border-t"},F={class:"min-w-full divide-y-2 divide-gray-200 text-sm"},H={class:"font-semibold"},I={class:"divide-y divide-gray-200"},D=["innerHTML"],R={key:0},q={class:"mt-6 sm:flex sm:items-center sm:justify-between"},G={class:"text-sm text-gray-500 dark:text-gray-400"},J={class:"font-medium text-gray-700 dark:text-gray-100"},K={class:"flex items-center mt-4 gap-x-4 sm:mt-0"},O=["disabled"],Q=t("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"w-5 h-5 rtl:-scale-x-100"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"})],-1),W=t("span",null," previous ",-1),X=[Q,W],Y=["disabled"],Z=t("span",null," Next ",-1),ee=t("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"w-5 h-5 rtl:-scale-x-100"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"})],-1),te=[Z,ee],ne=B({__name:"AdminUsersIndex",setup(ae){const i=p(5),u=p(),s=p(),x=[{identifier:"id",text:"ID",value:null},{identifier:"email",text:"Email address",value:null},{identifier:"__action__",text:"Action",value:e=>{var a="";return a+=`<a href="#/admin-user-edit/${e.id}">Edit</a>`,a+=` | <a href="#/admin-user-show/${e.id}">Show</a>`,a}}],h=()=>{const e=v.get(s.value,"current_page",0);return e===0?1:e*i.value+1},y=()=>{var e;return(((e=s.value)==null?void 0:e.current_page)??0)===0},b=()=>{var e,a;return!((((e=s.value)==null?void 0:e.current_page)??0)+1<(((a=s.value)==null?void 0:a.no_of_pages)??0))},k=()=>{const e=v.get(s.value,"current_page",0);var a=0;if(e===0)return i.value;var a=e*i.value;return a+i.value},w=async()=>{var r;let e=(((r=s.value)==null?void 0:r.current_page)??0)+1;const a=await m(e,i.value);u.value=a.data.results,s.value={current_page:a.data.current_page,no_of_pages:a.data.no_of_pages}},C=async()=>{var r;let e=(((r=s.value)==null?void 0:r.current_page)??0)-1;const a=await m(e,i.value);u.value=a.data.results,s.value={current_page:a.data.current_page,no_of_pages:a.data.no_of_pages}};P(async()=>{const e=await m(0,i.value);u.value=e.data.results,s.value={current_page:e.data.current_page,no_of_pages:e.data.no_of_pages}});const m=async(e,a)=>{const r=localStorage.getItem("token");return await $.get("/api/admin-users",{params:{current_page:e,per_page:a},headers:{Authorization:`Bearer ${r}`,"Content-Type":"application/json"}})};return(e,a)=>{const r=A("router-link");return o(),n(c,null,[t("div",S,[t("div",T,[U,t("div",V,[L(r,{to:{name:"admin-user-create"},class:"block rounded-lg bg-red-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring",type:"button"},{default:M(()=>[f(" Create Admin User ")]),_:1})])])]),t("div",z,[t("table",F,[t("thead",H,[t("tr",null,[(o(),n(c,null,_(x,l=>t("th",{class:"px-4 py-2 text-gray-900",key:`header-col-tr-${l.identifier}`},g(l.text),1)),64))])]),t("tbody",I,[(o(!0),n(c,null,_(u.value,l=>(o(),n("tr",{key:`data-col-tr-${l.id}`},[(o(),n(c,null,_(x,d=>t("td",{class:"px-4 py-2 font-medium text-gray-900",key:`data-col-tr-${d.identifier}`},[d.identifier==="__action__"?(o(),n("span",{key:0,innerHTML:d.value===null?null:d.value(l)},null,8,D)):(o(!0),n(c,{key:1},_(l,(N,j)=>(o(),n(c,{key:`template-col-${d.identifier}-value-${e.index}`},[String(j)==d.identifier?(o(),n("span",R,g(N),1)):E("",!0)],64))),128))])),64))]))),128))])]),t("div",q,[t("div",G,[f(" Showing "),t("span",J,g(h())+" to "+g(k()),1)]),t("div",K,[t("button",{type:"button",disabled:y(),onClick:C,class:"flex items-center justify-center w-1/2 px-5 py-2 text-sm disabled:bg-gray-300 text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"},X,8,O),t("button",{disabled:b(),onClick:w,class:"flex items-center justify-center w-1/2 px-5 py-2 disabled:bg-gray-300 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"},te,8,Y)])])])],64)}}});export{ne as default};
