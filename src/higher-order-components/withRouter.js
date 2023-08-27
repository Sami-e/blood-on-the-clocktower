import React from 'react';
import { useParams } from 'react-router-dom';
 
const withRouter = WrappedComponent => props => {
  const id = useParams();
 
  return (
    <WrappedComponent
      {...props}
      id={id}
    />
  );
};
 
export default withRouter;