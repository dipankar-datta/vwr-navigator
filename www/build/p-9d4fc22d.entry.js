import{r as t,h as i}from"./p-c7a176d9.js";const s=class{constructor(i){t(this,i),this.VIRTUAL_WAITING_ROOM_URL="https://virtual-waiting-room.herokuapp.com/#/wait",this.APPLICATION_STRESS_CHECK_PATH="/api/can_serve",this.goToWaitingRoom=t=>{window.location.replace(this.VIRTUAL_WAITING_ROOM_URL+"?"+this.getWaitingRoomParameters(t))},this.getWaitingRoomParameters=t=>{const i={redirectUrl:window.location.href,appCheckStatus:t};return"redirectInfo="+btoa(JSON.stringify(i))}}connectedCallback(){this.checkApplicationStressStatus()}render(){return i("div",null,i("h4",null,"This is navigator web-component. Only for demonstration purpose this is made visible."))}checkApplicationStressStatus(){const t=window.location.origin+this.APPLICATION_STRESS_CHECK_PATH;fetch(t).then((t=>{t.ok?t.json().then((t=>{t||this.goToWaitingRoom("busy")})):this.goToWaitingRoom("unavailable")})).catch((()=>{this.goToWaitingRoom("unavailable")}))}};export{s as waiting_room_navigator}