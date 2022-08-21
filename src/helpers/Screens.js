import * as React from 'react';

export const navigationRef = React.createRef();

export function navigate(name, param) {
  navigationRef.current?.navigate(name, {customParam: param});
}

export function resetScreen(screenName,index=0) {
  navigationRef.current?.reset({
    index,
    routes: [{name: screenName}],
  });
}

export const Screens = {
 LOGIN: 'LOGIN',
};
