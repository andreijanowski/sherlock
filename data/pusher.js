import Pusher from "pusher-js";
import {
  API_URL,
  NETGURU_DEV_PASSWORD,
  PUSHER_APP_KEY,
  PUSHER_APP_CLUSTER
} from "consts";

class CustomPusher {
  init = (token, userId) => {
    this.socket = new Pusher(PUSHER_APP_KEY, {
      cluster: PUSHER_APP_CLUSTER,
      authEndpoint: `${API_URL}/api/v1/users/me/authenticate_pusher`,
      auth: {
        params: {
          authentication_for: "user",
          record_id: userId,
          user_channel: "notifications"
        },
        headers: {
          NETGURU: NETGURU_DEV_PASSWORD,
          Accept: "application/vnd.api+json",
          Authorization: `Bearer ${token}`
        }
      }
    });
  };

  subscribe = channel => this.socket.subscribe(channel);

  bind = (event, callback) => {
    this.socket.bind(event, data => callback(data));
  };
}

const pusher = new CustomPusher();

export default pusher;
