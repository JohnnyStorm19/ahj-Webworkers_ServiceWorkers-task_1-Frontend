import { precacheAndRoute } from "workbox-precaching";
import * as navigationPreload from "workbox-navigation-preload";
import { NetworkOnly } from "workbox-strategies";
import { registerRoute, NavigationRoute } from 'workbox-routing'

import { skipWaiting, clientsClaim } from "workbox-core";

skipWaiting();
clientsClaim();

precacheAndRoute(self.__WB_MANIFEST);

const CACHE_NAME = "offline-html";
// Мы исходим из предположения, что `/offline.html` - это `URL` самодостаточной страницы
// (без внешних изображений или стилей)
const FALLBACK_HTML_URL = "/offline.html";

// Записываем резервную страницу в кэш при установке воркера
self.addEventListener("install", async (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.add(FALLBACK_HTML_URL)),
  );
});
navigationPreload.enable();

const networkOnly = new NetworkOnly()
const navigationHandler = async (params) => {
  try {
    // Пытаемся выполнить сетевой запрос
    return await networkOnly.handle(params)
  } catch (error) {
    // В случае провала запроса, возвращаем резервную cтраницу из кэша
    return caches.match(FALLBACK_HTML_URL, {
      cacheName: CACHE_NAME
    })
  }
}

// Регистрируем данную стратегию для обработки всех маршрутов
registerRoute(new NavigationRoute(navigationHandler))


