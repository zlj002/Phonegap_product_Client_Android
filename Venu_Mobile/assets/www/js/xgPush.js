var xgPush={openFeature:function(e){if(e!=null&&e!=""){var l=MY_JSON.parse(e);if(l.custom_content!=null){l=l.custom_content}var o=encodeURIComponent(l.Title.length>4?l.Title.substr(0,4)+"...":l.Title);if(l.Url!=null&&l.Url!=""){if(l.Url.indexOf("?")>-1){l.Url=l.Url+"&vUserNO="+localMobelInfo.getUserName()+"&vSchoolID"+pmain.getSchoolInfo().ID+"&vUserType="+localMobelInfo.getUserType()+"&vSchoolID="+pmain.getSchoolInfo().ID+"&vTitle="+o}else{l.Url=l.Url+"?vUserNO="+localMobelInfo.getUserName()+"&vSchoolID"+pmain.getSchoolInfo().ID+"&vUserType="+localMobelInfo.getUserType()+"&vSchoolID="+pmain.getSchoolInfo().ID+"&vTitle="+o}var n=window.open(l.Url,"_blank","clearcache=yes")}else if(l.FeatureID!=null&&l.FeatureID!=""){var t=$("[topanelid=#"+l.FeatureID+"]");if(t.length>0){var a=t.attr("thirdpartyurl");if(a==null||typeof a=="undefined"||a=="null"||a==""){$.ui.loadContent(topanelid,false,false,"left")}else{if(a.indexOf("?")>-1){a=a+"&vUserNO="+localMobelInfo.getUserName()+"&vSchoolID"+pmain.getSchoolInfo().ID+"&vUserType="+localMobelInfo.getUserType()+"&vSchoolID="+pmain.getSchoolInfo().ID+"&vTitle="+o}else{a=a+"?vUserNO="+localMobelInfo.getUserName()+"&vSchoolID"+pmain.getSchoolInfo().ID+"&vUserType="+localMobelInfo.getUserType()+"&vSchoolID="+pmain.getSchoolInfo().ID+"&vTitle="+o}var n=window.open(a,"_blank","clearcache=yes")}}}}}};