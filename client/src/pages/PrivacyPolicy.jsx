import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import privacyHero from "../assets/privacy.png";
import Logo from "../assets/logo.png";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger); // Register ScrollTrigger

const PrivacyPolicy = () => {
  const containerRef = useRef(null);
  const sectionRefs = useRef([]);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initial animation for header
    gsap.from(containerRef.current.children, {
      opacity: 0,
      x: -100,
      duration: 1,
      delay: "0.3",
      ease: "power3.out",
      stagger: "0.2",

    });

    sectionRefs.current.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 100},
        {
          opacity: 1,
          y: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 100%",
            end: "bottom 100%",
            scrub: 2,
          },
        }
      );
    });
  }, []);

  return (
    <>
      <div className="flex flex-col gap-5 lg:px-23 px-4 py-6 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full text-center">
          <div className="h-[450px] w-full overflow-hidden hidden md:block">
            <img
              src={privacyHero}
              alt=""
              className="object-cover h-full mx-auto"
            />
          </div>
          <div
            ref={containerRef}
            className="space-y-8 relative flex flex-col justify-center"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="text-gray-900 dark:text-foreground">
                Privacy Policy For{" "}
                <p
                  style={{
                    WebkitBoxReflect:
                      "below -14px linear-gradient(transparent, #ffffff50)",
                  }}
                  className="text-4xl md:text-6xl lg:text-7xl tracking-widest font-semibold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary/90 via-[#91ff02] to-primary/90 md:hidden "
                >
                  MealMind<span className="text-2xl">.ai</span>
                </p>
              </span>
            </h1>
            <div className="md:flex hidden gap-2 blink ">
              <img
                src={Logo}
                alt="logo"
                className="h-15 w-auto"
                style={{
                  WebkitBoxReflect:
                    "below -4px linear-gradient(transparent, #ffffff50)",
                }}
              />
              <p
                style={{
                  WebkitBoxReflect:
                    "below -22px linear-gradient(transparent, #ffffff50)",
                }}
                className="text-5xl md:text-6xl lg:text-7xl tracking-widest font-semibold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary/90 via-[#91ff02] to-primary/90"
              >
                MealMind<span className="text-2xl">.ai</span>
              </p>
            </div>
            <div className="relative md:mt-10">
              <div className="h-[120px] w-full overflow-hidden absolute transform translate-x-1/3  translate-y-2/2 md:hidden">
                <img
                  src={privacyHero}
                  alt=""
                  className="object-cover h-full mx-auto"
                />
              </div>
              <p className="tracking-widest">
                Thank you for choosing MealMind.ai, Your privacy is important to
                us. This Privacy Policy explains how we collect, use, disclose,
                and protect your personal information when you use our services.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 my-16">
          <div ref={(el) => (sectionRefs.current[0] = el)}>
            <h3 className="text-2xl font-bold">
              <span className="text-primary">1.</span> Information We Collect
            </h3>
            <div className="pl-6 font-mono text-sm space-y-2">
              <p>
                <b>a. Information You Provide to Us</b>
              </p>
              <ul className="list-disc pl-6">
                <li>
                  When you sign up or use our services, you may provide personal
                  information such as your name, email, and other details.
                </li>
                <li>
                  When submitting ingredients or interacting with AI features,
                  you may input dietary preferences or food-related queries.
                </li>
              </ul>
              <p>
                <b>b. Automatically Collected Information</b>
              </p>
              <ul className="list-disc pl-6">
                <li>
                  IP address, browser type, device type, pages visited, and
                  usage patterns
                </li>
                <li>
                  We use cookies and similar technologies to enhance your
                  experience.
                </li>
              </ul>
            </div>
          </div>
          <div ref={(el) => (sectionRefs.current[1] = el)}>
            <h3 className="text-2xl font-bold">
              <span className="text-primary">2.</span> How We Use Your
              Information
            </h3>
            <ul className="pl-10 font-mono text-sm list-disc">
              <li>Provide, maintain, and improve our services</li>
              <li>Personalize your experience</li>
              <li>Respond to your inquiries or support requests</li>
              <li>Analyze trends and usage</li>
              <li>Communicate updates, promotions, or policy changes</li>
            </ul>
          </div>
          <div ref={(el) => (sectionRefs.current[2] = el)}>
            <h3 className="text-2xl font-bold">
              <span className="text-primary">3.</span> Sharing Your Information
            </h3>
            <ul className="pl-10 font-mono text-sm list-disc">
              <li>
                We do <b>not sell</b> or rent your personal information to third
                parties.
              </li>
              <li>
                We may share your data only with trusted service providers, to
                comply with the law, or to protect rights and safety.
              </li>
            </ul>
          </div>
          <div ref={(el) => (sectionRefs.current[3] = el)}>
            <h3 className="text-2xl font-bold">
              <span className="text-primary">4.</span> Data Security
            </h3>
            <p className="pl-6 font-mono text-sm">
              We implement industry-standard security measures. However, no
              method of storage or transmission is 100% secure.
            </p>
          </div>
          <div ref={(el) => (sectionRefs.current[4] = el)}>
            <h3 className="text-2xl font-bold">
              <span className="text-primary">5.</span> AI-Generated Content
              Disclaimer
            </h3>
            <ul className="pl-10 font-mono text-sm list-disc">
              <li>
                MealMind.ai uses AI to generate recipe suggestions based on user
                input.
              </li>
              <li>
                <b>
                  All content generated is for informational and entertainment
                  purposes only.
                </b>
              </li>
              <li>
                The AI may produce inaccurate or unsuitable results for certain
                needs.
              </li>
              <li>
                <b>Users are solely responsible</b> for verifying the safety,
                accuracy, and appropriateness of generated content.
              </li>
              <li>
                We are <b>not liable</b> for any outcomes resulting from the use
                of AI-generated recipes.
              </li>
              <li>
                If you have dietary restrictions, allergies, or health
                conditions, please consult a qualified professional.
              </li>
            </ul>
          </div>
          <div ref={(el) => (sectionRefs.current[5] = el)}>
            <h3 className="text-2xl font-bold">
              <span className="text-primary">6.</span> Third-Party Links
            </h3>
            <p className="pl-6 font-mono text-sm">
              Our platform may contain links to external sites. We are not
              responsible for their privacy practices or content.
            </p>
          </div>
          <div ref={(el) => (sectionRefs.current[6] = el)}>
            <h3 className="text-2xl font-bold">
              <span className="text-primary">7.</span> Children's Privacy
            </h3>
            <p className="pl-6 font-mono text-sm">
              MealMind.ai is not intended for users under 13. We do not
              knowingly collect data from children.
            </p>
          </div>
          <div ref={(el) => (sectionRefs.current[7] = el)} >
            <h3 className="text-2xl font-bold">
              <span className="text-primary">8.</span> Changes to This Policy
            </h3>
            <p className="pl-6 font-mono text-sm">
              We may update this Privacy Policy. Continued use of MealMind.ai
              implies acceptance of any updates.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
