addEventListener('message', async (e: MessageEvent<string>) => {
  const assetUrl = e.data;
  const response = await fetch(assetUrl);
  const assetBlob = await response.blob();
  postMessage({ assetUrl, assetBlob });
});
