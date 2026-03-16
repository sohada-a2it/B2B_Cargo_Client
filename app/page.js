import React from 'react'
import Banner from '@/components/home/banner'
import State from '@/components/home/states'
import About from '@/components/home/about'
import History from '@/components/home/history'
import LogisticTimeline from '@/components/home/logiaticTimeline'
import Service from '@/components/home/service'
import Ecommerce from '@/components/home/ecommerce'
import Price from '@/components/home/price'
import Shipping from '@/components/home/shipping'
import Warehouse from '@/components/home/warehouse'
import Facts from '@/components/home/facts'
import Industries from '@/components/home/industries'
import Blog from '@/components/home/blog'
import Quote from '@/components/home/quote'
import Partners from '@/components/home/partners'
function page() {
  return (
    <div>
      <Banner /> 
      <State/>
      <About/> 
      <History/>
      <LogisticTimeline/>
      <Service/>
      <Ecommerce/>
      <Price/>
      <Shipping/>
      <Facts/>
      <Industries/>
      {/* <Blog/> */}
      <Quote/>
      <Warehouse/>
      <Partners/>
    </div>
  )
}

export default page
