import React from 'react'
import AddLead from '../subManualData/AddLead'
import { CAccordion, CAccordionBody, CAccordionHeader, CAccordionItem } from "@coreui/react";

import AddressInfo from '../subManualData/AddressInfo';
function AddmanualData(props) {
  const setShowModal = props && props.setShowModal
  return (
    <div style={{background:"", border:"1px solid lightgrey"}}>
      {/*header*/}
      <div className="flex items-start justify-between rounded-t"   >
      
        <button
          className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none  outline-none focus:outline-none"
          onClick={() => setShowModal(false)}
        >
          <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
            ×
          </span>
        </button>
      </div>
      
    <AddLead setShowModal={setShowModal}/>
    </div>
  )
}

export default AddmanualData