import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

const Services = ({ services }) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    library.add(fas)
    setIsClient(true)
  }, [])

  function removeFaPrefix(string) {
    return string.substring(3)
  }

  return (
    <section id='services'>
      {/* Main Wrapper */}
      <div className='flex flex-col justify-center items-center overflow-x-hidden'>
        {/* Text Container */}
        <div>
          <h1 className='relative font-poppins lg:text-2xl text-2xl font-bold z-10 p-14'>
            How We Can Help You
          </h1>
          {/* Underline Effect */}
          <div className='absolute bg-lime-600 z-0 h-2'></div>
        </div>
        {/* Services Wrapper */}
        <div className='flex flex-col container font-poppins justify-center items-center gap-y-32 p-14'>
          {/* Service Item */}
          {services.map((service, index) => {
            const isOddIndex = index % 2 !== 0
            return (
              <div
                className={`flex flex-col-reverse lg:flex-row gap-x-40 gap-y-16 px-24 ${
                  isOddIndex ? 'lg:flex-row-reverse' : ''
                }`}
                key={service._id}
              >
                {/* Service Text */}
                <div className='flex flex-col gap-y-4'>
                  <h2 className='text-2xl font-bold'>
                    {service.title ? service.title : 'Untitled'}
                  </h2>
                  {service.body && service.body[0]?.children[0]?.text ? (
                    <p>{service.body[0].children[0].text}</p>
                  ) : (
                    <p>No Description Available</p>
                  )}
                </div>
                {/* Service Icon */}
                <div className='flex justify-center items-center'>
                  {isClient ? (
                    <FontAwesomeIcon
                      icon={{
                        prefix: 'fas',
                        iconName: removeFaPrefix(service.icon),
                      }}
                      width={150}
                      height={150}
                    />
                  ) : null}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
export default Services
