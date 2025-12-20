export default {
  async fetch(request) {
    return new Response("Hello from Toshka!", {
      headers: { "content-type": "text/plain" },
    });
  },
};
