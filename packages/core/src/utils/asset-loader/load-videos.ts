import { logger } from '../../auth/utils/logger';

export const loadVideos = (
  videos: string[],
  videoCache: Map<string, string>
) => {
  logger.log('loading videos::::');
  const VideoLoaderWorker = new Worker(
    new URL('./asset-loader.worker.ts', import.meta.url)
  );
  VideoLoaderWorker.onmessage = (
    e: MessageEvent<{ assetUrl: string; assetBlob: Blob }>
  ) => {
    logger.log('setting vid in cache:::: ', e.data);
    const { assetUrl, assetBlob } = e.data;
    const videoBlobUrl = URL.createObjectURL(assetBlob);
    videoCache.set(assetUrl, videoBlobUrl);
  };

  VideoLoaderWorker.onerror = (error) => {
    logger.error('VideoLoaderWorker.onerror:::: ', error);
  };

  VideoLoaderWorker.onmessageerror = (
    e: MessageEvent<{ assetUrl: string; assetBlob: string }>
  ) => {
    logger.error('VideoLoaderWorker.onmessageerror:::: ', e);
  };

  (videos || []).forEach((src) => {
    VideoLoaderWorker.postMessage(src);
  });
};
