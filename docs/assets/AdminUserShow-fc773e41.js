import{d as c,u as m,p as d,r as u,g as _,f as n,h as p,c as f,a as e,w as h,t as x,i as b,j as v,F as w,o as g,e as y}from"./index-0ab2a216.js";const k=e("div",{class:"mx-auto max-w-screen-xl mt-3 mb-5"},[e("div",{class:"sm:flex sm:items-center sm:justify-between"},[e("div",{class:"text-center sm:text-left"},[e("h1",{class:"text-2xl font-bold text-gray-900 sm:text-3xl"}," Show Admin User ")])])],-1),S={class:"text-left border-t my-8 text-sm"},A=["onSubmit"],C={class:"flex items-center"},B=e("label",{for:"Email",class:"text-gray-700"}," Email: ",-1),j={class:"ml-5"},R={class:"mt-5 flex w-full items-center"},E=e("button",{type:"submit",class:"btn btn-primary"}," Delete Admin User ",-1),U=c({__name:"AdminUserShow",setup(N){const i=m(),r=d(),a=u({email:"",id:""});_(async()=>{const t=r.params.admin_user_id,o=localStorage.getItem("token"),s=await n.get("/api/admin-users/"+t,{headers:{Authorization:`Bearer ${o}`,"Content-Type":"application/json"}});console.log(s),a.value=s.data});const l=async()=>{const t=localStorage.getItem("token");(await n.delete("/api/admin-users/"+a.value.id,{headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}})).status===204&&i.push({name:"admin-users-list"})};return(t,o)=>{const s=p("router-link");return g(),f(w,null,[k,e("div",S,[e("form",{onSubmit:h(l,["prevent"]),action:"#",class:"mt-3 w-full"},[e("div",C,[B,e("div",j,x(a.value.email),1)]),e("div",R,[b(s,{class:"mr-auto btn btn-default",to:{name:"admin-users-list"}},{default:v(()=>[y(" Cancel ")]),_:1}),E])],40,A)])],64)}}});export{U as default};
