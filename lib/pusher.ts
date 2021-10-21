import Pusher from "pusher";

const pusher = new Pusher({
  appId: "1285621",
  key: "7edcd9552c5cad7513f9",
  secret: "1f6af13d5c1bd16cdcae",
  cluster: "us3",
  useTLS: true,
});

export default pusher;
