// src/components/ZendeskChat.js
"use client";

import { useEffect } from 'react';

export default function ZendeskChat() {
    useEffect(() => {
        // Check if the script is already added to prevent duplicate loading
        if (!document.getElementById("ze-snippet")) {
            const script = document.createElement("script");
            script.id = "ze-snippet";
            script.src = "https://static.zdassets.com/ekr/snippet.js?key=a4bcd008-eab8-49e9-974d-1fc800c2fd58";
            script.async = true;
            document.body.appendChild(script);
        }
    }, []);

    return null;
}
