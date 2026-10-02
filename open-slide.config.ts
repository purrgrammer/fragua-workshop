import type { OpenSlideConfig } from '@open-slide/core';

const openSlideConfig: OpenSlideConfig = {
  base: process.env.GH_PAGES ? '/fragua-workshop/' : '/',
};

export default openSlideConfig;
