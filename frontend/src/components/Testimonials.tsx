import Image from 'next/image'

const Testimonials = ({ testimonials }) => {
  return (
    <section id='testimonials'>
      {/* Main Wrapper */}
      <div className='flex flex-col justify-center items-center p-14 overflow-x-hidden'>
        {/* Heading Container */}
        <div className='flex justify-center items-center font-poppins px-14'>
          <h2 className='text-center lg:text-3xl text-2xl font-bold z-10 py-4'>
            What our customers say
          </h2>
        </div>

        {/* Testimonials Wrapper */}
        <div className='grid lg:grid-cols-3 gap-y-16 lg:gap-x-8 justify-center items-center p-14 pb-48'>
          {/* Testimonial Item */}
          {testimonials.map((testimonial) => {
            return (
              <div
                key={testimonial._id}
                className='flex flex-col flex-1 rounded-md bg-slate-100 h-full w-72'
              >
                {/* Person Image */}
                <div className='relative rounded-full overflow-hidden bg-slate-500 w-20 h-20 -mt-6 ml-8'>
                  <Image
                    className='relative object-cover w-full h-full'
                    src={testimonial.personImage}
                    width={800}
                    height={800}
                    alt={testimonial.personName}
                    style={{ objectPosition: '40% 10%' }}
                  />
                </div>
                {/* Testimonial Content Container */}
                <div className='flex flex-col justify-center grow'>
                  {/* Text */}
                  <div className='px-8 py-4'>
                    <p className='font-poppins text-sm font-normal'>
                      {testimonial.body[0].children[0].text}
                    </p>
                  </div>
                </div>
                {/* Company Info Wrapper */}
                <div className='flex flex-row justify-center gap-x-4 p-6'>
                  {/* Company Logo */}
                  <div className='relative bg-white h-9'>
                    <Image
                      className='object-contain w-full h-full px-4'
                      src={testimonial.comapnyLogo}
                      width={800}
                      height={800}
                      alt={testimonial.companyName}
                    />
                  </div>
                  {/* Person Name and Position */}
                  <div className='flex flex-col font-poppins'>
                    <h3 className='text-sm font-medium'>
                      {testimonial.personName}
                    </h3>
                    <h3 className='text-sm font-semilight'>
                      {testimonial.personPosition}
                    </h3>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
export default Testimonials
