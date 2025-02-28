"use client"

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function AOSInitializer() {
    useEffect(() => {
        AOS.init({
            offset: 200,
            duration: 1000,
            once: false,
            mirror: true
        });
    }, []);

    return null;
}