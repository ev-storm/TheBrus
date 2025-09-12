export default defineNuxtRouteMiddleware((to) => {
  // Список заблокированных User-Agent
  const blockedUserAgents = [
    "bot",
    "crawler",
    "spider",
    "scraper",
    "scanner",
    "harvester",
    "extractor",
    "Googlebot",
    "Bingbot",
    "YandexBot",
    "Slurp",
    "DuckDuckBot",
    "Baiduspider",
    "facebookexternalhit",
    "Twitterbot",
    "LinkedInBot",
    "WhatsApp",
    "TelegramBot",
    "SemrushBot",
    "AhrefsBot",
    "MJ12bot",
    "DotBot",
    "SeoCheckBot",
    "BLEXBot",
    "DataForSeoBot",
    "MegaIndex",
    "SeoCheckBot",
    "SiteAuditBot",
    "SitebulbBot",
  ];

  // Получаем User-Agent из заголовков
  const userAgent = process.server
    ? useRequestHeaders()["user-agent"]
    : navigator.userAgent;

  if (userAgent) {
    const isBlocked = blockedUserAgents.some((blockedAgent) =>
      userAgent.toLowerCase().includes(blockedAgent.toLowerCase())
    );

    if (isBlocked) {
      // Возвращаем 403 Forbidden для заблокированных ботов
      throw createError({
        statusCode: 403,
        statusMessage: "Access Denied",
      });
    }
  }
});
