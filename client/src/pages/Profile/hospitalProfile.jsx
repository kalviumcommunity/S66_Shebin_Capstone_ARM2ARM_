// import React from 'react'
// import Header from '../../components/Header'
// import { UserProfile } from '@clerk/clerk-react'


// const HospitalProfile = () => {

//     return (
//         <>
//             <Header title="Profile" subtitle="View your profile" />
//                 <UserProfile
//                     path='/hospitalprofile'
//                     routing='path'
//                     appearance={{
//                         elements:{
//                             scrollBox:"bg-customgreys-darkGrey",
//                             navbar: "bg-transparent shadow-none"
//                         }
//                     }}
//                 />
//             </>
//     )
// }

// export default HospitalProfile


<section className="py-16 bg-gradient-to-r from-red-800 to-red-900 overflow-hidden relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Donate Blood?
            </h2>
            <p className="text-red-100 max-w-2xl mx-auto">
              Discover the benefits and impact of blood donation
            </p>
          </div>

          <div className="relative">
            <div className="flex animate-scroll-x space-x-6 w-max">
              {[...benefits,...benefits].map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={index}
                    className="flex-shrink-0 w-80 bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                        <Icon className="w-8 h-8 text-red-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
    </section>
