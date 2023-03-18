import { logger } from '../logger';

export const loadAudio = (
  audioUrls: string[],
  audioCache: Map<string, string>
) => {
  logger.log('loading audio::::');
  const AudioLoaderWorker = new Worker(
    new URL('./asset-loader.worker.ts', import.meta.url)
  );
  AudioLoaderWorker.onmessage = (
    e: MessageEvent<{ assetUrl: string; assetBlob: Blob }>
  ) => {
    logger.log('setting audio in cache:::: ', e.data);
    const { assetUrl, assetBlob } = e.data;
    const audioBlobUrl = URL.createObjectURL(assetBlob);
    audioCache.set(assetUrl, audioBlobUrl);
  };

  AudioLoaderWorker.onerror = (error) => {
    logger.error('AudioLoaderWorker.onerror:::: ', error);
  };

  AudioLoaderWorker.onmessageerror = (
    e: MessageEvent<{ assetUrl: string; assetBlob: string }>
  ) => {
    logger.error('AudioLoaderWorker.onmessageerror:::: ', e);
  };

  (audioUrls || []).forEach((src) => {
    AudioLoaderWorker.postMessage(src);
  });
};
