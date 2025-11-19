document.addEventListener('DOMContentLoaded', () => {
    // Video handling to ensure autoplay and loop work smoothly
    const video = document.querySelector('video');
    if (video) {
        const playVideo = () => {
            video.play().catch(err => {
                console.log('Autoplay prevented:', err);
                // Retry on interaction if needed, or just mute and try again
                video.muted = true;
                video.play().catch(e => console.error('Retry failed:', e));
            });
        };

        // Ensure video plays when page is visible
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && video.paused) {
                playVideo();
            }
        });

        // Try to play immediately
        if (video.readyState >= 2) {
            playVideo();
        } else {
            video.addEventListener('canplay', playVideo, { once: true });
        }
    }
});
