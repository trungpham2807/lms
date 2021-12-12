import React from 'react'
import InstructorNav from "../nav/InstructorNav";

const InstructorRoute = ({children}) => {
    return (
        <div>
            <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">
              <InstructorNav />
            </div>
            <div className="col-md-10">{children}</div>
          </div>
        </div>
        </div>
    )
}

export default InstructorRoute
