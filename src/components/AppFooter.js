import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
     
        <span className="ms-1">  Copyright © 2023 Solis Global.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
    
        Designed with  by Solis Technology <i class="icon-heart" style={{color: "#f00528"}}></i> Development Team All rights reserved
      
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
