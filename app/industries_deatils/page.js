import React from 'react' 
import IndustriesDeatils from '@/components/industriesDetails/industriesDeatils';
import TailoredService from '@/components/industriesDetails/TailoredServices';
import Choose from '@/components/industriesDetails/choose';
function page() {
  return (
    <div>
      <IndustriesDeatils/>
      <TailoredService/>
      <Choose/>
    </div>
  )
}

export default page
