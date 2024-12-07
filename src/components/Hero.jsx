import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from 'react-icons/ti';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

// scrollTrigger is gsap pulgin so you have to enable it to use it..
gsap.registerPlugin(ScrollTrigger);
const Hero = () => {
  // to keep track of which indexed video is getting played..
  const [currentIndex, setCurrentIndex] = useState(1);
  // to check whether the video has been clicked or not..
  const [hasClicked, setHasClicked] = useState(false);
  // to keep track the video is loading or not right now..
  const [isLoading, setIsLoading] = useState(true);
  // to check whether the video is loaded or not..
  const [loadedVideos, setLoadedVideos] = useState(0);


  const totalVideos = 3;
  //useRef is use to get the reference of the targeted element..
  //   add eventlistener ki trah soch sakte ho..
  const nextVideoRef = useRef(null);



   
  // it will no exceed tha value greater than 1 after 4 it will start itself again with 1
  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;
  
  



  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex(upcomingVideoIndex);
  };

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };
  

  // to check whether the video is loaded or not..
  useEffect(()=>{
    if(loadedVideos === totalVideos -1){
      setIsLoading(false); 
    }
  },[loadedVideos])
  
  // in dependencies we are saying this animation will be executed whenever the currentIndex changes
  // and we want to revert it every time..
  useGSAP(()=>{
      if(hasClicked){
        gsap.set('#next-video', {visibility: 'visible'});
        
        gsap.to('#next-video',{
          transformOrigin: 'center center',
          scale: 1,
          width: '100%',
          height: '100%',
          duration: 1,
          ease: 'power1.inOut',
          onStart: () => nextVideoRef.current.play(),
        })

        gsap.from('#current-video',{
          transformOrigin: 'center center',
          scale: 0,
          duration: 1.5,
          ease: 'power1.inOut'
        })

      }
  },{dependencies: [currentIndex], revertOnUpdate: true})

  useGSAP(()=>{
    gsap.set('#video-frame', {
      clipPath: 'Polygon(14% 0%, 72% 0%, 90% 90%,0% 100%',
      borderRadius: '0 0 40% 10%'
    })

    gsap.from('#video-frame',{
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      borderRadius: '0 0 0 0',
      ease: 'power1.inOut',
      scrollTrigger:{
        trigger: '#video-frame',
        start: 'center center',
        end: 'bottom center',
        scrub: true,
      }
    })
  })

  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

 

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
       
      {isLoading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
           <div className="three-body">
             <div  className="three-body__dot"/>
             <div  className="three-body__dot"/>
             <div  className="three-body__dot"/>
           </div>
        </div>
      )}
      
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              onClick={handleMiniVdClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                //jiska reference use hua hai
                ref={nextVideoRef}
                // min video have to be 1 greater than the previouse played value
                // so when we click on that video than that video get played..
                src={getVideoSrc(upcomingVideoIndex)}
                loop
                muted
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center"
                // onLoadedData is a special handler which allow us to run a function once a video is loaded.
                onLoadedData={handleVideoLoad}
              />
            </div>
          </div>
          <video
            src={getVideoSrc(
              currentIndex === totalVideos - 1 ? 1 : currentIndex
            )}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full
                object-cover object-center"
          ></video> 
          <video
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoad}
          ></video>
        </div>
        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
            G<b>a</b>ming
        </h1>
        <div className="absolute left-0 top-0 z-40 size-full">
         <div className="mt-24 px-5 sm:px-10">
           <h1 className="special-font hero-heading text-blue-100">redefi<b>n</b>e</h1>
           <p className="mb-5 max-w-64 font-robert-regular text-blue-400">Enter the Metagame Layer <br/> Unleash the Play Economy</p>
           {/* command to install react icon npm i react-icons */}
           {/* !bg-yellow-300 to make it more important.. */}
           {/* clsx help to manage the classees */}
           <Button id='watch-trailer' title="Watch Trailer" leftIcon ={<TiLocationArrow/>} containerClass = "!bg-yellow-300 flex-center gap-1 " />
         </div>
        </div>
      </div>
      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-blue-500">
        G<b>A</b>MING
      </h1>
    </div>
  );
};

export default Hero;
