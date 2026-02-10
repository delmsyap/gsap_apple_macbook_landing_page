import React, {useEffect, useRef} from 'react'

const Hero = () => {

    const videoRef = useRef();

    useEffect(() => {
        if (videoRef.current) videoRef.current.playbackRate = 2;
    }, []);

    return (
        <section id='hero'>
            <div>
                <h1>Macbook Pro</h1>
                <img src="/title.png" alt="Macbook Title" />
            </div>

            <video ref={videoRef} src="/videos/hero.mp4" autoPlay muted playsInline={true} />

            <button aria-label="Buy Macbook Pro">Buy Now</button>

            <p>From ₱99,438.00 or ₱7,784.00/mo for 12 months</p>
        </section>
    )
}
export default Hero
