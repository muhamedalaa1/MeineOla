
// DomContentLoaded make u sure that the document loaded totally 
document.addEventListener("DOMContentLoaded",function(){
  // mouse follower
  function getFollowMouse() {
    document.addEventListener("mousemove", function (e) {
      gsap.to(".cursor", {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "back.out",
      });
    });
  }
  getFollowMouse();
  // moving to right or left depends on scrooling direction
  function getWheelMove() {
    window.addEventListener("wheel", function (e) {
      if (e.deltaY > 0) {
        console.log("to right");
        gsap.to(".move .inner", {
          transform: "translateX(-200%)",
          duration: 4,
          repeat: -1,
          ease: "none.none",
        });

        gsap.to(".move .inner img", {
          rotate: 0,
        });
      } else {
        console.log("to left");
        gsap.to(".move .inner", {
          transform: "translateX(0%)",
          duration: 4,
          repeat: -1,
          ease: "none.none",
        });

        gsap.to(".move .inner img", {
          rotate: 180,
        });
      }
    });
  }
  getWheelMove();
  // menu nav animation
  function getMenuAnimat() {
    const toggleBtn = document.querySelector(".burger");

    let isOpen = false;

    gsap.set(".menuItem p", { y: 225 });

    const tl = gsap.timeline({ paused: true });
    tl.to(".overlay", {
      duration: 1.5,
      clipPath: "polygon(0% 0% , 100% 0% ,100% 100%, 0% 100%)",
      ease: "power4.inOut",
    });
    tl.to(
      ".menuItem p",
      {
        duration: 1.5,
        y: 0,
        stagger: 0.2,
        ease: "power4.out",
      },
      "-=1"
    );

    toggleBtn.addEventListener("click", function () {
      if (isOpen) {
        tl.reverse();
        // document.querySelector("header").classList.toggle("vh-100");
      } else {
        tl.play();
        // document.querySelector("header").classList.toggle("vh-100");
      }

      isOpen = !isOpen;
    });
  }
  getMenuAnimat();
  // gitar line
  function getGitalAnimat() {
    let initialValForLine = `M 10 251 Q 600 250 1190 251`;
    let finalValForLine = `M 10 251 Q 600 250 1190 251`;
    const myGitarSec = document.querySelector(".gitarLine");
    myGitarSec.addEventListener("mousemove", function (e) {
      console.log(e);

      initialValForLine = `M 10 251 Q ${e.x} ${e.y} 1190 251`;
      console.log(initialValForLine);

      console.log(initialValForLine);

      gsap.to("svg path", {
        attr: { d: initialValForLine },
        duration: 0.2,
        ease: "power3.out",
      });
    });

    myGitarSec.addEventListener("mouseleave", function (e) {
      gsap.to("svg path", {
        attr: { d: finalValForLine },
        ease: "elastic.out(1,0.2)",
        duration: 1.5,
      });
    });
  }
  getGitalAnimat();

  let tl = gsap.timeline();
  // header timeline animation
  tl.from("nav .logo , nav ul li , nav button", {
    y: -60,
    opacity: 0,
    duration: 0.9,
    stagger: 0.19,
  });
  tl.from(".mainHeaderContent .firstHeading", {
    y: 60,
    opacity: 0,
    duration: 0.3,
  });
  tl.from(".secondRow .imgWrapper", {
    x: 60,
    opacity: 0,
    duration: 0.3,
  });
  tl.from(".secondRow .secondRowPara", {
    y: 60,
    opacity: 0,
    duration: 0.3,
  });
  tl.from(".bestAgency , .WorldClassAgency", {
    x: -60,
    opacity: 0,
    duration: 0.3,
  });
  tl.from(".thirdRowRight", {
    x: 60,
    opacity: 0,
    duration: 0.3,
  });
  //end header timeline animation

  gsap.from(".whatWeDo .allH2 h2", {
    y: 150,
    duration: 1,
    opacity: 0,
    stagger: 0.25,
    scrollTrigger: {
      trigger: ".whatWeDo .allH2 h2",
      scroller: "body",
      start: "top 70%",
    },
  });

  gsap.from(".ourCards .mainHeader h2", {
    y: 150,
    duration: 0.8,
    stagger: 0.4,
    opacity: 0,
    scrollTrigger: {
      trigger: ".ourCards .mainHeader h2",
      scroller: "body",
      start: "top 50%",
    },
  });

  gsap.from(".morePrrojects .allPara p", {
    y: 150,
    opacity: 0,
    duration: 0.8,
    stagger: 0.25,
    scrollTrigger: {
      trigger: ".morePrrojects .allPara p",
      scroller: "body",
      start: "top 90%",
    },
  });

  gsap.from(".whereWeThrive .mainHeader h2", {
    y: 150,
    duration: 0.8,
    stagger: 0.4,
    opacity: 0,
    scrollTrigger: {
      trigger: ".whereWeThrive .mainHeader h2",
      scroller: "body",
      start: "top 60%",
    },
  });

  gsap.from(".clients .mainHeader h2", {
    y: 150,
    duration: 0.8,
    stagger: 0.4,
    opacity: 0,
    scrollTrigger: {
      trigger: ".clients .mainHeader h2",
      scroller: "body",
      start: "top 60%",
    },
  });

  gsap.from(".clients .row .clientsCol", {
    y: -30,
    duration: 1,
    opacity: 0,
    stagger: 0.19,
    scrollTrigger: {
      trigger: ".clients .row .clientsCol",
      scroller: "body",
    },
  });











  // start cards animation

  let line1LeftCard = gsap.timeline({
    scrollTrigger: {
      trigger: ".myCol.myCol1",
      scroller: "body",
     
      start: "top 80%",
      scrub: 1,
      ease: "power1.inOut",
    },
  });

  
  
   let line1RightCard = gsap.timeline({
     scrollTrigger: {
       trigger: ".myCol.myCol2",
       scroller: "body",
      
       start: "top 80%",
       scrub: 1,
       ease: "power1.inOut",
     },
   });

  





   let line2LeftCard = gsap.timeline({
     scrollTrigger: {
       trigger: ".myCol.myCol3",
       scroller: "body",
       
       start: "top 80%",
       scrub: 1,
       ease: "power1.inOut",
     },
   });



   let line2RightCard = gsap.timeline({
     scrollTrigger: {
       trigger: ".myCol.myCol4",
       scroller: "body",
       
       start: "top 80%",
       scrub: 1,
       ease: "power1.inOut",
     },
   });

 

   
   
   if(window.innerWidth < 768){
    line2RightCard.to(".myCol.myCol4", {
      x: 0,
      duration: 0.1,
      rotation: 0,
    });


    line2LeftCard.to(".myCol.myCol3", {
      x: 0,
      duration: 0.1,
      rotation: 0,
    });

    line1RightCard.to(".myCol.myCol2", {
      x: 0,
      duration: 0.1,
      rotation: 0,
    });

    line1LeftCard.to(".myCol.myCol1", {
      x: 0,
      duration: 0.1,
      rotation: 0,
    });

   }else if (window.innerWidth > 768 && window.innerWidth< 900) {
    line2RightCard.to(".myCol.myCol4", {
      x: 120,
      duration: 0.1,
      rotation: 10,
    });

    line2LeftCard.to(".myCol.myCol3", {
      x: -120,
      duration: 0.1,
      rotation: -10,
    });

    line1RightCard.to(".myCol.myCol2", {
      x: 120,
      duration: 0.1,
      rotation: 10,
    });

    line1LeftCard.to(".myCol.myCol1", {
      x: -120,
      duration: 0.1,
      rotation: -10,
    });
   } else {
     line2RightCard.to(".myCol.myCol4", {
       x: 200,
       duration: 0.1,
       rotation: 10,
     });

     line2LeftCard.to(".myCol.myCol3", {
       x: -200,
       duration: 0.1,
       rotation: -10,
     });

     line1RightCard.to(".myCol.myCol2", {
       x: 200,
       duration: 0.1,
       rotation: 10,
     });

     line1LeftCard.to(".myCol.myCol1", {
       x: -200,
       duration: 0.1,
       rotation: -10,
     });
   }
 


  //  scroll horizontal

  const races = document.querySelector(".races");
  console.log(races.offsetWidth);

  function getScrollAmount() {
    let racesWidth = races.scrollWidth;
    return -(racesWidth - window.innerWidth);
  }

  const tween = gsap.to(races, {
    x: getScrollAmount,
    duration: 3,
    ease: "none",
  });

  ScrollTrigger.create({
    trigger: ".racesWrapper",
    start: "top 20%",
    end: () => `+=${getScrollAmount() * -1}`,
    pin: true,
    animation: tween,
    scrub: 1,
    invalidateOnRefresh: true,
  });













})





  