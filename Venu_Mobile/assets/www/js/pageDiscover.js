var pDiscover={initialize:function(){this.initEvents();pmain.deleteBadgeByUserIDAndFeatureID("PageDiscover")},initEvents:function(){$("#btnSchoolBeauty").unbind().on("click",function(){var e="全民校花";var o=serverHost+"/publicModule/SchoolBeauty/List.aspx?vUserNO="+localMobelInfo.getUserName()+"&vSchoolID"+pmain.getSchoolInfo().ID+"&vUserType="+localMobelInfo.getUserType()+"&vTitle="+e;var n=window.open(o,"_blank","clearcache=yes")});$("#btnSchoolBoy").unbind().on("click",function(){var e="全民校草";var o=serverHost+"/publicModule/SchoolBoy/List.aspx?vUserNO="+localMobelInfo.getUserName()+"&vSchoolID"+pmain.getSchoolInfo().ID+"&vUserType="+localMobelInfo.getUserType()+"&vTitle="+e;var n=window.open(o,"_blank","clearcache=yes")});$("#btnSchoolTeacher").unbind().on("click",function(){var e="可爱的老师";var o=serverHost+"/publicModule/SchoolTeacher/List.aspx?vUserNO="+localMobelInfo.getUserName()+"&vSchoolID"+pmain.getSchoolInfo().ID+"&vUserType="+localMobelInfo.getUserType()+"&vTitle="+e;var n=window.open(o,"_blank","clearcache=yes")});$("#liScanOne").unbind().on("click",function(){scanForCodeBar(function(e){var o=MY_JSON.parse(e);if(o!=null&&o.UserType!=null&&typeof o.UserType!="undefined"){var n=o.UserNo;var l=o.UserType;var a=localMobelInfo.getUserName();if(n==a){$.ui.loadContent("#myInfo",false,false,"left")}else{$("#contactDetail").attr("userNO",n);$("#contactDetail").attr("userType",l);$.ui.loadContent("#contactDetail",false,false,"left")}}else{}})})}};