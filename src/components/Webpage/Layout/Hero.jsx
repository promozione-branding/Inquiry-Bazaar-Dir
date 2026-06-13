import React from 'react'

export default function Hero({details}) {
  return (
    <>
    <section className="relative h-[70vh]">
  <img
    src={details?.hero?.image}
    alt="Factory"
    className="absolute inset-0 w-full h-full object-cover"
  />

 
</section>
    </>
  )
}
