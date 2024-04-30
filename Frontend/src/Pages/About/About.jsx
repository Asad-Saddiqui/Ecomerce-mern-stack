import React from "react";
import Top from "../../Components/Top/Top";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { faGithub, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Feature from "../../Components/Feature/Feature";


const About = () => {
  const teamMembers = [
    {
      name: "Tom Cruise",
      role: "Founder & Chairman",
      imgSrc: "https://source.unsplash.com/random?person1",
      social: [faLinkedin, faTwitter, faGithub],
    },
    {
      name: "Emma Watson",
      role: "Managing Director",
      imgSrc: "https://source.unsplash.com/random?person2",
      social: [faLinkedin, faTwitter, faGithub],
    },
    {
      name: "Will Smith",
      role: "Product Designer",
      imgSrc: "https://source.unsplash.com/random?person3",
      social: [faLinkedin, faTwitter, faGithub],
    },
  ];

  return (
    <div>
      <Top />
      <Navbar />
      <div className="flex flex-col gap-10 px-16 py-12">
        <h1 className="text-lg ml-24">
          Home / <b>About</b>
        </h1>

        <div className="flex flex-col gap-8 sm:gap-5 sm:flex-row px-4 sm:px-8">
          {/* Our Story Section */}
          <section className="flex flex-col gap-6 sm:w-1/2 sm:px-6 md:px-12 lg:px-16">
            <h1 className="text-black text-3xl sm:text-4xl md:text-5xl font-semibold tracking-wider h-16 overflow-hidden">
              Our Story
            </h1>
            <p className="text-black text-sm sm:text-base font-normal leading-relaxed">
              Launched in 2015, Exclusive is South Asia’s premier online shopping marketplace with an active presence in Bangladesh.
            </p>
            <p className="text-black text-sm sm:text-base font-normal leading-relaxed">
              Exclusive has more than 1 million products to offer, growing at a rapid pace.
            </p>
          </section>

          {/* Image Section */}
          <section className="flex justify-center items-center sm:w-1/2 relative rounded-tl-lg rounded-bl-lg">
            <img
              className="w-full h-auto aspect-[5/3] object-cover rounded-tl-lg rounded-bl-lg overflow-hidden"
              src="https://source.unsplash.com/random"
              alt="Example Image"
            />
          </section>
        </div>

        {/* Team Section */}
        <section className="flex justify-center items-center bg-gray-50 py-16 px-8">
          <div className="flex flex-wrap gap-8 justify-center sm:flex-row lg:flex-nowrap overflow-y-hidden">
            {teamMembers.map((member, index) => (
              <article
                key={index}
                className="flex flex-col items-center overflow-y-hidden bg-white p-6 rounded-lg border border-gray-200 shadow-sm transition-transform duration-300 "
              >
                <div className="overflow-hidden rounded-lg">
                  <img
                    className="w-72 h-auto aspect-[1.2] object-cover hover:scale-105 duration-300"
                    src={member.imgSrc}
                    alt={`${member.name}, ${member.role}`}
                  />
                </div>
                <header className="flex flex-col items-center mt-6 gap-2">
                  <h2 className="text-2xl font-medium text-black">{member.name}</h2>
                  <h3 className="text-base font-normal text-gray-600">{member.role}</h3>
                  <div className="flex gap-4 mt-4">
                    {member.social.map((icon, i) => (
                      <a key={i} href="#" aria-label={`Visit ${member.name}'s social profile`}>
                        <FontAwesomeIcon
                          icon={icon}
                          className="text-gray-600 hover:text-blue-500"
                          size="lg"
                        />
                      </a>
                    ))}
                  </div>
                </header>
              </article>
            ))}
          </div>
        </section>

        <Feature/>
      </div>

      <Footer />
    </div>
  );
};

export default About;
