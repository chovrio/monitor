!function(s){"use strict";class t{constructor(s){this.BASE_URL=s.requestURL,this.id=s.id,this.plugins=s.plugins??[],this.init()}init(){this.plugins?.some((s=>s(this)))}}(async()=>{const s=(s=>s.split("?")[1])(document.querySelectorAll("script")[0].src);if(void 0===s)console.error("无id");else{const i="http://localhost:4000",e=await fetch(`${i}/site/${s}`),o=await e.json();switch(console.log(o),e.status){case 404:console.error("错误的id");break;case 403:console.error("该id与注册网址不符合");break;case 200:console.log("启用埋点"),window.tracker=new t({id:s,requestURL:i,plugins:[]})}}})(),s.Tracker=t}({});
