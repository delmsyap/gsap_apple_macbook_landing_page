import {useGSAP} from "@gsap/react";
import {Html} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";
import {clsx} from "clsx";
import React, {Suspense, useEffect, useRef} from 'react'
import {useMediaQuery} from "react-responsive";
import {features, featureSequence} from "../constants/index.js";
import useMacbookStore from "../store/index.js";
import MacbookModel from "./models/Macbook.jsx";
import StudioLights from "./three/StudioLights.jsx";
import gsap from "gsap";

const ModelScroll = () => {
    const groupRef = useRef(null);
    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
    const { setTexture } = useMacbookStore();

    useGSAP(() => {
        // macbook 3d model rotation
        const modelTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#f-canvas',
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
                pin: true,
            }
        });

        // sync the features content
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#f-canvas',
                start: 'top center',
                end: 'bottom top',
                scrub: 1,
            }
        })

        // spin the 3d model
        if (groupRef.current) {
            modelTimeline.to(groupRef.current.rotation, { y: Math.PI * 2, ease: "power1.inOut"})
        }

        // sync the content and texture
        timeline
            .call(() => setTexture('/videos/feature-1.mp4'))
            .to('.box1', { opacity: 1, y: 0, delay: 1 })

            .call(() => setTexture('/videos/feature-2.mp4'))
            .to('.box2', { opacity: 1, y: 0 })

            .call(() => setTexture('/videos/feature-3.mp4'))
            .to('.box3', { opacity: 1, y: 0 })

            .call(() => setTexture('/videos/feature-4.mp4'))
            .to('.box4', { opacity: 1, y: 0 })

            .call(() => setTexture('/videos/feature-5.mp4'))
            .to('.box5', { opacity: 1, y: 0 })

    }, [])

    // preload all feature videos during component mount
    useEffect(() => {
        featureSequence.forEach((feature) => {
            const v = document.createElement("video");

            Object.assign(v, {
                src: feature.videoPath,
                muted: true,
                playsInline: true,
                preload: "auto",
                crossOrigin: "anonymous",
            });

            v.load();
        })
    }, [])


    return (
        <group ref={groupRef}>
            <Suspense fallback={<Html><h1 className='text-white text-3xl uppercase'>Loading...</h1></Html>}>
                <MacbookModel scale={isMobile ? 0.05 : 0.08} position={[0, -1, 0]}/>
            </Suspense>
        </group>
    )
}

const Features = () => {
    return (
        <section id='features'>
            <h2>See it all in a new light.</h2>

            <Canvas id='f-canvas' camera={{}}>
                <StudioLights />
                <ambientLight intensity={0.5} />
                {/* 3d Model */}
                <ModelScroll />
            </Canvas>

            <div className='absolute inset-8'>
                {features.map((feature) => (
                    <div key={feature.id} className={clsx('box', `box${feature.id}`, feature.styles)}>
                        <img src={feature.icon} alt={feature.highlight}/>
                        <p>
                            <span className='text-white'>{feature.highlight}</span>
                            {feature.text}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}
export default Features
