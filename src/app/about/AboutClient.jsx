'use client';
import Best from '@/components/About/Best';
import Intro from '@/components/About/Intro';
import Mission from '@/components/About/Mission';
import Topic from '@/components/About/Topic';
import CustomScroller from '@/components/Ui/CustomScroller';
import useCustomScroller from '@/hooks/useCustomScroller';
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react'

const AboutClient = () => {
    const sections = [
        { id: 'intro', content: <Intro /> },
        { id: 'mission', content: <Mission /> },
        { id: 'topic', content: <Topic /> },
        { id: 'best', content: <Best /> },
    ];
    const {
        current,
        setCurrent,
        thumbTop,
        trackRef,
        handleTrackClick,
        handleThumbMouseDown,
        thumbHeight, scrollToNext
    } = useCustomScroller(sections.length);

    return (
        <div className="relative  bg-white flex h-auto lg:h-screen overflow-y-auto lg:overflow-hidden">
            {/* Section View */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={sections[current].id}
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -60 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full flex items-center justify-center"
                >
                    {sections[current].id === 'intro' ? (
                        <Intro scrollToNext={scrollToNext} />
                    ) : (
                        sections[current].content
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Custom Scrollbar */}

            <CustomScroller
                trackRef={trackRef}
                thumbTop={thumbTop}
                thumbHeight={thumbHeight}
                handleTrackClick={handleTrackClick}
                handleThumbMouseDown={handleThumbMouseDown}
            />

        </div>
    );
}

export default AboutClient