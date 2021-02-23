import { Component, h } from '@stencil/core';

type Status = 'busy' | 'unavailable';

@Component({
  tag: 'waiting-room-navigator'
})
class WaitingRoomNavigator {

    private VIRTUAL_WAITING_ROOM_URL = 'https://virtual-waiting-room.herokuapp.com/#/wait';

    private APPLICATION_STRESS_CHECK_PATH = '/api/can_serve';

    connectedCallback() {
      this.checkApplicationStressStatus();
    }

    render() {
        return (
              <div>
                <h4>This is navigator web-component. Only for demonstration purpose this is made visible.</h4>
              </div>
          );
    }

    checkApplicationStressStatus() {
        const stressCheckUrl = window.location.origin + this.APPLICATION_STRESS_CHECK_PATH;
        fetch(stressCheckUrl)
        .then((response: Response) => {
          response.json().then((status: boolean) => {
            if (!status) {
              this.goToWaitingRoom('busy')
            }
          });
        }).catch(err => {
          this.goToWaitingRoom('unavailable');
        })
    }

    goToWaitingRoom = (status: Status) => {
      window.location.replace(this.VIRTUAL_WAITING_ROOM_URL + '?' + this.getWaitingRoomParameters(status));
    }

    getWaitingRoomParameters = (status: Status) => {
      const params = {
        redirectUrl : window.location.href,
        appCheckStatus: status
      };
      return 'redirectInfo=' + btoa(JSON.stringify(params));
    }

}