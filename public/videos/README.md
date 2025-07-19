# Video Assets Directory

This directory contains video assets for the Uneseule AI application.

## Video Requirements

### Hero Video (ai-hero.mp4)
- **Format**: MP4 (H.264 codec)
- **Resolution**: 720p (1280x720) maximum
- **Duration**: 5-10 seconds (looping)
- **File size**: Under 5MB
- **Frame rate**: 30fps
- **Audio**: Muted (for autoplay compatibility)
- **Aspect ratio**: 1:1 (square) for circular display

### Optimization Guidelines

1. **MP4 Compression**: Use FFmpeg for optimal compression
   ```bash
   ffmpeg -i input.mp4 -c:v libx264 -preset slow -crf 23 -vf scale=720:720 -an ai-hero.mp4
   ```

2. **WebM Version** (REQUIRED for better performance):
   ```bash
   # Two-pass encoding for best quality/size ratio
   ffmpeg -i input.mp4 -c:v libvpx-vp9 -b:v 0 -crf 30 -pass 1 -vf scale=720:720 -an -f null /dev/null
   ffmpeg -i input.mp4 -c:v libvpx-vp9 -b:v 0 -crf 30 -pass 2 -vf scale=720:720 -an ai-hero.webm
   ```

3. **Thumbnail/Poster**: Extract first frame for fallback
   ```bash
   ffmpeg -i ai-hero.mp4 -ss 00:00:00 -vframes 1 -vf scale=720:720 ../images/ai-hero-fallback.png
   ```

### Vercel Optimization Benefits

With our setup, Vercel will:
- Serve videos from their global CDN
- Apply aggressive caching (1 year)
- Automatically compress with gzip/brotli where applicable
- Use HTTP/2 for faster delivery

### File Size Targets

- **MP4**: < 3MB (for compatibility)
- **WebM**: < 2MB (30-50% smaller than MP4)
- **Total bandwidth per user**: ~2MB (WebM) or ~3MB (MP4 fallback)

## Placeholder

Until you have the actual video, you can use a placeholder video from:
- Pexels: https://www.pexels.com/videos/
- Pixabay: https://pixabay.com/videos/
- Coverr: https://coverr.co/

Look for abstract, tech-themed, or educational content that matches your brand.