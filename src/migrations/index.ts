import * as migration_20260410_160438_landing_media_upload from './20260410_160438_landing_media_upload';
import * as migration_20260410_163427_media_seed_key from './20260410_163427_media_seed_key';
import * as migration_20260410_164600_certificates_image_group from './20260410_164600_certificates_image_group';
import * as migration_20260415_034900_reviews_blocks from './20260415_034900_reviews_blocks';
import * as migration_20260415_041500_review_video_upload from './20260415_041500_review_video_upload';
import * as migration_20260416_003500_single_landing_images from './20260416_003500_single_landing_images';
import * as migration_20260416_005000_drop_legacy_responsive_image_columns from './20260416_005000_drop_legacy_responsive_image_columns';
import * as migration_20260417_223000_review_instagram_links from './20260417_223000_review_instagram_links';
import * as migration_20260419_052000_landing_localization from './20260419_052000_landing_localization';
import * as migration_20260421_120000_for_who_icon_upload from './20260421_120000_for_who_icon_upload';

export const migrations = [
  {
    up: migration_20260410_160438_landing_media_upload.up,
    down: migration_20260410_160438_landing_media_upload.down,
    name: '20260410_160438_landing_media_upload',
  },
  {
    up: migration_20260410_163427_media_seed_key.up,
    down: migration_20260410_163427_media_seed_key.down,
    name: '20260410_163427_media_seed_key'
  },
  {
    up: migration_20260410_164600_certificates_image_group.up,
    down: migration_20260410_164600_certificates_image_group.down,
    name: '20260410_164600_certificates_image_group'
  },
  {
    up: migration_20260415_034900_reviews_blocks.up,
    down: migration_20260415_034900_reviews_blocks.down,
    name: '20260415_034900_reviews_blocks'
  },
  {
    up: migration_20260415_041500_review_video_upload.up,
    down: migration_20260415_041500_review_video_upload.down,
    name: '20260415_041500_review_video_upload'
  },
  {
    up: migration_20260416_003500_single_landing_images.up,
    down: migration_20260416_003500_single_landing_images.down,
    name: '20260416_003500_single_landing_images'
  },
  {
    up: migration_20260416_005000_drop_legacy_responsive_image_columns.up,
    down: migration_20260416_005000_drop_legacy_responsive_image_columns.down,
    name: '20260416_005000_drop_legacy_responsive_image_columns'
  },
  {
    up: migration_20260417_223000_review_instagram_links.up,
    down: migration_20260417_223000_review_instagram_links.down,
    name: '20260417_223000_review_instagram_links'
  },
  {
    up: migration_20260419_052000_landing_localization.up,
    down: migration_20260419_052000_landing_localization.down,
    name: '20260419_052000_landing_localization'
  },
  {
    up: migration_20260421_120000_for_who_icon_upload.up,
    down: migration_20260421_120000_for_who_icon_upload.down,
    name: '20260421_120000_for_who_icon_upload'
  },
];
