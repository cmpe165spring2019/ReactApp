import React from 'react';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../../server/Session';
import { withFirebase } from '../../server/Firebase';

const HomePage = () => 
  (<div>

    </div>
  )

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);
