import React from 'react'
import FaqCard from './FaqCard'

const FaqSection = () => {
  return (

    // FAQ Section 
    <section className='flex flex-col gap-10 justify-center min-h-[calc(100vh-184px)] items-center '>
      <div className='max-w-[500px]'>
        <h1 className='capitalize font-bold text-3xl md:text-4xl'>
          frequently asked questions
        </h1>
      </div>

      <div className='flex flex-col gap-4 max-w-[500px]'>
        <FaqCard
          question={'What is Briswalker?'} 
          answer={`Briskwalker is a simple and focused web tool designed to help people plan brisk 
            walking routes. It emphasizes quick planning, minimal distractions, and a user-friendly 
            experience tailored specifically for walking—not driving or cycling`}
        />
        <FaqCard
          question={'How is Briskwalker different from Google Maps walking directions?'} 
          answer={`Unlike Google Maps, which is built for general navigation, Briskwalker is purpose-built 
            for walkers. It strips away unnecessary features and focuses solely on making your walking 
            experience smoother, faster to plan, and more enjoyable—with cleaner UI and walking-specific insights.`}
        />
        <FaqCard
          question={'Is Briskwalker free to use?'} 
          answer={`Yes, Briskwalker is completely free. You can use it to plan as many walking routes as you 
            want without any sign-up or payment required.`}
        />
        <FaqCard
          question={'How do I start planning a walk?'} 
          answer={`To start planning, simply enter your starting point and destination into the search bar. 
            Briskwalker will instantly generate a clean walking route tailored for a brisk, enjoyable walk.`}
        />
        <FaqCard
          question={'Can I save or share my walking routes?'} 
          answer={`Saving and sharing features are coming soon! For now, you can take a screenshot or copy 
            the URL once your route is generated. Stay tuned for upcoming updates that will let you save and share with one click.`}
        />
      </div>
    </section>
  )
}

export default FaqSection