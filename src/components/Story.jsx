import React, { useRef, useState } from "react";
import AnimatedTitle from "./AnimatedTitle";
import gsap from "gsap";
import RoundedCorners from "./RoundedCorners";
import Button from "./Button";

const story = () => {
   
  const frameRef = useRef(null);
  
  const handleMouseMove = (e) => {
    // if (!frameRef.current) return;
    
    //getting the clientx and clienty value from the mouseMove event with the help of destructuring.. 
    const {clientX, clientY} = e;
    // reffering the element using useref..
    const element = frameRef.current;

    if(!element) return;
     
    //getting the rect object which contains the top bottom left and right value of the element relative to the viewport..
    const rect = element.getBoundingClientRect();
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const centerX = rect.width /2;
    const centerY = rect.height/2;
     
    // getting the rotation value respective to mousemove
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x-centerX)/ centerX) * 10;
    
    gsap.to(element, {
       duration: 0.3,
       rotateX,
       rotateY,
       transformPerspective: 500,
       ease: 'power1.inOut' 
    });
  };

  const handleMouseLeave = () =>{
    const  element = frameRef.current;

    gsap.to(element, {
      duration: 0.3,
      rotateX: 0,
      rotateY: 0,
      transformPerspective: 500,
      ease: 'power1.inOut'
    })
 };

  return (
    <section id="story" className="min-h-dvh w-screen bg-black text-blue-50">
      <div className="flex size-full flex-col items-center py-10 pb-24">
        <p className="font-general text-sm uppercase md:text-[10px]">
          The multiverse ip world
        </p>
        <div className="relative size-full">
          <AnimatedTitle
            title="The st<b>o</b>ry of <br/> a hidden real <b>m</b>"
            sectionId="#story"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
          />

          <div className="story-img-container">
            <div className="story-img-mask">
              <div className="story-img-content" >
                <img
                  ref={frameRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseLeave}
                  onMouseEnter={handleMouseLeave}
                  src="/img/entrance.webp"
                  alt="enterance"
                  className="object-container"
                 
                />
              </div>
            </div>
            <RoundedCorners/>
          </div>
        </div>
        <div className="-mt-80 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end">
          <div className="flex h-full w-fit flex-col items-center md:items-start ">
            <p className="mt-3 max-w-sm text-center font-circular-web text-violet-50 md:text-start ">
              where realms converge, lies zentry and the boundless pillar. Discover its secrets and shape your fate amidst infinite opportunities.
            </p>
            <Button id="realm-button" title ="discover prologue" containerClass="mt-5" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default story;
