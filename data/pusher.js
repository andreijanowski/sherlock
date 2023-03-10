import Pusher from "pusher-js";
import { APP_URL, PUSHER_APP_KEY, PUSHER_APP_CLUSTER } from "consts";

class CustomPusher {
  constructor() {
    this.socket = null;
  }

  init = userId => {
    if (!this.socket) {
      this.socket = new Pusher(PUSHER_APP_KEY, {
        cluster: PUSHER_APP_CLUSTER,
        authEndpoint: `${APP_URL}/api/v1/users/me/authenticate_pusher`,
        auth: {
          params: {
            authentication_for: "user",
            record_id: userId,
            user_channel: "notifications"
          },
          headers: {
            Accept: "application/vnd.api+json"
          }
        }
      });
    }
  };

  subscribe = channel => this.socket.subscribe(channel);

  bind = (event, callback) => {
    this.socket.bind(event, data => callback(data));
  };
}

const pusher = new CustomPusher();

export default pusher;
