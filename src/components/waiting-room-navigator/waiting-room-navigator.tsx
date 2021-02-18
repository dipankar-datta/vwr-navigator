import { Component, h } from '@stencil/core';

@Component({
  tag: 'waiting-room-navigator'
})
class WaitingRoomNavigator {

    private VIRTUAL_WAITING_ROOM_URL = 'http://localhost:8080/#/wait';

    private APPLICATION_STRESS_CHECK_PATH = '/api/can_serve';

    constructor() {
        console.log('XXX===> Constructor', );
        this.checkApplicationStressStatus();
    }

    connectedCallback() {
        
    }

    render() {
        return <div>You might be redirected</div>;
    }

    checkApplicationStressStatus() {
        const stressCheckUrl = window.location.origin + this.APPLICATION_STRESS_CHECK_PATH;
        console.log('stressCheckUrl : ', stressCheckUrl);
        fetch(stressCheckUrl)
        .then((response: Response) => {
          response.json().then((status: boolean) => {
            if (!status) {
              this.goToWaitingRoom()
            }
          });
        })
    }

    goToWaitingRoom = () => {
      window.location.replace(this.VIRTUAL_WAITING_ROOM_URL + '?' + this.getWaitingRoomParameters());
    }

    getWaitingRoomParameters = () => {
      const params = {
        redirectUrl : window.location.href
      };
      return encodeURI('redirectInfo=' + JSON.stringify(params));
    }

}