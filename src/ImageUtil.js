import {PREVIEW_IMAGE_FORMAT, ROW_INNER_HEIGHT, SEARCH_IMAGE_FORMAT} from './settings';

export default class ImageUtil {}

/**
 * Static
 * @param image
 * @returns {{thumbnail: *, preview: *, slug: *, width, height}}
 */
ImageUtil.convertImageData = (image) => {
    return {
        thumbnail: image.images[SEARCH_IMAGE_FORMAT],
        preview: image.images[PREVIEW_IMAGE_FORMAT],
        slug: image.slug,
        width: image.width,
        height: image.height
    };
}

ImageUtil.normalizeImageSize = (width, height) => {
    var ratio = Math.min(ROW_INNER_HEIGHT / height, 1);

    return {
        width: Math.floor(width * ratio),
        height: Math.floor(height * ratio)
    }
};

ImageUtil.normalizeImageData = (imageData) => {
    var size = ImageUtil.normalizeImageSize(imageData.width, imageData.height);

    return {
        ...imageData,
        ...size
    }
};