export const normalizeRoute = (route: string): string =>
  route.startsWith("/") ? route : "/" + route;
