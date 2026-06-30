const LEGACY_HOSTS = new Set(["ifcm.pages.dev", "www.ifcm.pages.dev"]);
const CANONICAL_HOST = "imagineifcm.pages.dev";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (LEGACY_HOSTS.has(url.hostname.toLowerCase())) {
      url.hostname = CANONICAL_HOST;
      url.protocol = "https:";
      return Response.redirect(url.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  }
};
