// -----------------------------------------------------------------------------
// THE VISIONEX - CLOUDINARY MEDIA UPLOADER SERVICE
// -----------------------------------------------------------------------------

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'gnev4tey';
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'ml_default';

export interface UploadResult {
  url: string;
  secure_url: string;
  public_id: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
  original_filename: string;
}

export const isCloudinaryConfigured = Boolean(
  CLOUDINARY_CLOUD_NAME &&
  CLOUDINARY_UPLOAD_PRESET &&
  CLOUDINARY_CLOUD_NAME !== 'your_cloudinary_cloud_name'
);

/**
 * Upload an image directly to Cloudinary using Unsigned Preset
 */
export async function uploadImageToCloudinary(
  file: File,
  onProgress?: (percent: number) => void
): Promise<UploadResult> {
  if (!file) {
    throw new Error('No file provided for upload');
  }

  // Validate allowed image types
  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif'];
  if (!validTypes.includes(file.type)) {
    throw new Error('Unsupported file format. Please upload JPG, PNG, WEBP, or SVG.');
  }

  // Validate size (10MB max)
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new Error('File size exceeds 10MB limit.');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  formData.append('folder', 'visionex_media');

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const endpoint = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

    xhr.open('POST', endpoint, true);

    if (xhr.upload && onProgress) {
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded / e.total) * 100);
          onProgress(percent);
        }
      };
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          resolve({
            url: response.url,
            secure_url: response.secure_url || response.url,
            public_id: response.public_id,
            format: response.format,
            width: response.width,
            height: response.height,
            bytes: response.bytes,
            original_filename: response.original_filename || file.name,
          });
        } catch (err) {
          reject(new Error('Failed to parse Cloudinary response'));
        }
      } else {
        try {
          const errRes = JSON.parse(xhr.responseText);
          reject(new Error(errRes.error?.message || `Upload failed with status ${xhr.status}`));
        } catch {
          reject(new Error(`Cloudinary upload failed: HTTP ${xhr.status}`));
        }
      }
    };

    xhr.onerror = () => {
      reject(new Error('Network error occurred during Cloudinary upload'));
    };

    xhr.send(formData);
  });
}

/**
 * Generate an optimized Cloudinary delivery URL with transformation
 */
export function getOptimizedImageUrl(
  urlOrPublicId: string,
  options: {
    width?: number;
    height?: number;
    crop?: 'fill' | 'fit' | 'thumb' | 'scale';
    quality?: 'auto' | number;
    format?: 'auto' | 'webp' | 'png' | 'jpg';
  } = {}
): string {
  if (!urlOrPublicId) return '/hero-bg.png';

  // If already a full URL and not cloudinary, return as is
  if (urlOrPublicId.startsWith('http') && !urlOrPublicId.includes('cloudinary.com')) {
    return urlOrPublicId;
  }

  // If already a Cloudinary URL, inject transformations
  if (urlOrPublicId.includes('res.cloudinary.com')) {
    const transformations: string[] = ['f_auto', 'q_auto'];
    if (options.width) transformations.push(`w_${options.width}`);
    if (options.height) transformations.push(`h_${options.height}`);
    if (options.crop) transformations.push(`c_${options.crop}`);

    const transformStr = transformations.join(',');
    return urlOrPublicId.replace('/image/upload/', `/image/upload/${transformStr}/`);
  }

  // If public_id
  const transformations: string[] = ['f_auto', 'q_auto'];
  if (options.width) transformations.push(`w_${options.width}`);
  if (options.height) transformations.push(`h_${options.height}`);
  if (options.crop) transformations.push(`c_${options.crop}`);

  const transformStr = transformations.join(',');
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transformStr}/${urlOrPublicId}`;
}

