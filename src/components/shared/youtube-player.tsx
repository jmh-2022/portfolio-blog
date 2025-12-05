'use client';

import { getYouTubeVideoId } from '@/lib/utils';
import React, { useEffect, useRef } from 'react';

export default function YouTubePlayer({ videoId }: { videoId: string }) {
    const playerRef = useRef<HTMLDivElement | null>(null);
    const playerInstance = useRef<unknown>(null);

    useEffect(() => {
        const linkToVideoId = getYouTubeVideoId(videoId);
        if (!linkToVideoId || linkToVideoId.length !== 11) {
            if (playerRef.current) playerRef.current.innerHTML = '';
            return;
        }

        if (!document.getElementById('youtube-iframe-api')) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            tag.id = 'youtube-iframe-api';
            document.body.appendChild(tag);
        }

        const createPlayer = () => {
            // @ts-ignore
            const YT = window['YT'];
            if (playerRef.current && YT && YT.Player) {
                playerInstance.current = new YT.Player(playerRef.current, {
                    videoId: linkToVideoId,
                    playerVars: {
                        autoplay: 0,
                        controls: 1,
                    },
                    events: {
                        onReady: () => console.log('Player is ready'),
                        onStateChange: (event: unknown) =>
                            console.log('State changed', event),
                    },
                });
            }
        };

        // @ts-ignore
        window['onYouTubeIframeAPIReady'] = () => {
            createPlayer();
        };

        // @ts-ignore
        if (window['YT'] && window['YT'].Player) {
            createPlayer();
        }

        return () => {
            if (
                playerInstance.current &&
                // @ts-ignore
                typeof playerInstance.current.destroy === 'function'
            ) {
                // @ts-ignore
                playerInstance.current.destroy();
            }
            // @ts-ignore
            window['onYouTubeIframeAPIReady'] = () => { };
        };
    }, [videoId]);

    return (
        <div className="w-full relative pt-[56.25%]">
            <div
                ref={playerRef}
                className="youtube-player absolute top-0 left-0 w-full h-full border-0"
            />
        </div>
    );
}
