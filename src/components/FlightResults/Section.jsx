import React from 'react'

   const Section = ({ children, className = "my-6 px-3 " }) => (
        <div className={className}>{children}</div>
    );

export default Section