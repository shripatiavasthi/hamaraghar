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
 SignUp : 'SignUp',
 AddEmailorPhon : 'AddEmailorPhon',
 Gender : 'Gender',
 Birthday : 'Birthday',
 AddName : 'AddName',
 Avatar : 'Avatar',
 Home: 'Home',
 Sucess : 'Sucess',
 VerifyOtp: 'VerifyOtp',
 Belongone: 'Belongone',
 BelongThree : 'BelongThree',
 BelongDetails: 'BelongDetails',
 CreateBelong : 'CreateBelong',
 InvitePeople: 'InvitePeople',
 SubCategories : 'SubCategories',
 InviteSucess : 'InviteSucess',
 Tabs : 'Tabs', 
 Login : 'Login',
 Conversation : 'Conversation',
 ConversationGroups : 'ConversationGroups',
 SingleGroup : 'SingleGroup',
 Post : 'Post',
 Real : 'Real',
 Profile : 'Profile',
 LeadGeneration :'LeadGeneration'
};
