import React from "react";
import Lottie from "react-lottie";
import LoadScreen from "../../../public/lottie/LoadScreen.json";

const LottieComponent = () => {
    const options = {
        loop: true,
        autoplay: true,
        animationData: LoadScreen,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid meet',
        },
    };

    return (
        <div
            style={{
                display: 'flex',        // Makes the container a flexbox
                justifyContent: 'center', // Centers the content horizontally
                alignItems: 'center',    // Centers the content vertically
                width: '100vw',         // Full width of the viewport
                height: '100vh',        // Full height of the viewport
                overflow: 'hidden'      // Ensures that anything overflowing the container is hidden
            }}
        >
            <Lottie
                options={options}
                height={400}
                width={300}
            />
        </div>
    );
};

export default LottieComponent;
