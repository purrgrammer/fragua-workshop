import type { OpenSlideConfig } from '@open-slide/core';

declare const process: { env: Record<string, string | undefined> };

const openSlideConfig: OpenSlideConfig = {
  base: process.env.GH_PAGES ? '/fragua-workshop/' : '/',
};

export default openSlideConfig;
