var pictureSource;var destinationType;var pickUrl;var newGuid=function(){var e="";for(var t=1;t<=32;t++){var a=Math.floor(Math.random()*16).toString(16);e+=a;if(t==8||t==12||t==16||t==20)e+="-"}return e};function deletePictureFromCache(){window.resolveLocalFileSystemURI(pickUrl,function(e){e.remove()},null)}function fromCamera(e){navigator.camera.getPicture(function(e){var t=document.getElementById("imgHeader_MyInfo_Edit");t.src=e;pickUrl=e;uploadFile()},function(){if(e==pictureSource.CAMERA)console.log("加载照相机出错!");else console.log("加载相册出错!")},{quality:50,destinationType:destinationType.FILE_URI,sourceType:e})}function uploadFile(){var e=newGuid();var t=pickUrl;if(!t){alert("请先选择本地图片")}var a=new FileUploadOptions;a.fileKey="file";a.fileName=t;a.mimeType="image/jpeg";var i=new FileTransfer;i.onprogress=showUploadingProgress;navigator.notification.progressStart("","当前上传进度");i.upload(t,encodeURI(serverHost+"/MobileService/UploadHeaderImage.aspx?fileGuid="+e+"&userID="+localMobelInfo.getUserName()),function(){navigator.notification.progressStop()},function(){navigator.notification.progressStop()},a)}function showUploadingProgress(e){if(e.lengthComputable){navigator.notification.progressValue(Math.round(e.loaded/e.total*100))}}var pEditUserInfo={initialize:function(){this.bindEvent();try{pictureSource=navigator.camera.PictureSourceType;destinationType=navigator.camera.DestinationType}catch(e){}pmain.deleteBadgeByUserIDAndFeatureID("PageMyInfo")},bindEvent:function(){$("#imgHeader_MyInfo_Edit").unbind().on("click",function(){var e=[];var t={};t.text="拍照";t.handler=function(){$("#cancel").click();$.when(fromCamera(pictureSource.CAMERA)).then(deletePictureFromCache)};e.push(t);var t={};t.text="选择本地图片";t.handler=function(){$("#cancel").click();fromCamera(pictureSource.PHOTOLIBRARY)};e.push(t);$.ui.actionsheet(e);$("#af_actionsheet .cancel").text("取消")});$("#divClassName_MyInfo_Edit").unbind().bind("tap",function(){$.ui.loadContent("#pageSelectClass",false,false,"left")});$("#btnSaveUserInfo").unbind().bind("tap",function(){var e=serverHost+"/MobileService/UserService/UserService.asmx/SaveUserInfo";$.ui.showMask("请稍等……");var t={};t.Name=$("#txtName_MyInfo_Edit").val();t.Sex=$("#sel_Sex_MyInfo_Edit").val()=="男"?1:0;t.Birthday=$("#txtBrithday_Edit").val();t.NativePlace=$("#s_province").val()+"|"+$("#s_city").val();t.RecentActivities=$("#txtRecentActivities_MyInfo_Edit").val();t.ILike=$("#txtILike_MyInfo_Edit").val();t.PersonalSign=$("#txtPersonalSign_MyInfo_Edit").val();t.Education=$("#sel_Eduaction_UserInfo_Edit").val();t.SpecialtyID=$("#selSpecialty_MyInfo_Edit").val();t.StartYear=$("#selStartYears_MyInfo_Edit").val();t.ClassID=$("#txtClassID_MyInfo_Edit").val();t.Dormitory=$("#txtDormitory_MyInfo_Edit").val();var a={schoolID:pmain.getSchoolInfo().ID,userID:localMobelInfo.getUserName(),userName:$("#txtNickName_MyInfo").val(),userInfoDetail:MY_JSON.stringify(t)};$.ajax({type:"Post",contentType:"application/json; charset=utf-8",url:e,data:MY_JSON.stringify(a),dataType:"json",success:function(e){var t=MY_JSON.parse(e.d);if(t.ReturnFlag==1){$.ui.loadContent("#myInfo",false,false,"left")}$.ui.hideMask()},error:function(e,t,a){$.ui.hideMask();$.ui.popup({title:"提示",message:"保存个人资料失败",cancelText:"确定",cancelCallback:function(){},cancelOnly:true})}})})},bindStartYears:function(){if($("#selStartYears_MyInfo_Edit option").length==0){var e=new Date;var t=e.getFullYear();var a=parseInt(t);for(var i=2010;i<=a;i++){var n=$("<option value='"+i+"'>"+i+"</option>");if(i==a){n=$("<option value='"+i+"' selected>"+i+"</option>")}$("#selStartYears_MyInfo_Edit").append(n)}}},bindSpecialty:function(e){if($("#selSpecialty_MyInfo_Edit option").length==0){var t=serverHost+"/MobileService/SchoolService/SchoolWebService.asmx/GetTopFacultyByName";$.ui.showMask("请稍等……");var a={schoolID:pmain.getSchoolInfo().ID,facultyName:"",pageIndex:1};$.ajax({type:"Post",contentType:"application/json; charset=utf-8",url:t,data:MY_JSON.stringify(a),dataType:"json",success:function(t){var a=MY_JSON.parse(t.d);if(a.ReturnFlag==1&&a.List.length>0){$.each(a.List,function(e,t){var a=$("<option value='"+t.ID+"'>"+t.Name+"</option>");$("#selSpecialty_MyInfo_Edit").append(a)});$("#selSpecialty_MyInfo_Edit").val(e)}$.ui.hideMask()},error:function(e,t,a){$.ui.hideMask();$.ui.popup({title:"提示",message:"获取数据出错",cancelText:"确定",cancelCallback:function(){},cancelOnly:true})}})}},bindData:function(){if(serverHost!=""){var e=serverHost+"/MobileService/UserService/UserService.asmx/GetUserInfoByUserID";$.ui.showMask("正在加载……");var t={userID:localMobelInfo.getUserName()};$.ajax({type:"Post",contentType:"application/json; charset=utf-8",url:e,data:MY_JSON.stringify(t),dataType:"json",success:function(e){var t=MY_JSON.parse(e.d);if(t.ReturnFlag=="1"){_init_area();$('[usertype="student"]').show();$('[usertype="teacher"]').show();$("#imgHeader_MyInfo_Edit").attr("src",t.Entity.HeaderImage);$("#txtNickName_MyInfo").val(t.Entity.UserName);$("#txtName_MyInfo_Edit").val(t.Entity.Name);$("#sel_Sex_MyInfo_Edit").val(t.Entity.Sex);$("#txtBrithday_Edit").val(t.Entity.Birthday);if(t.Entity.NativePlace!=null){var a=t.Entity.NativePlace.split("|");if(a.length>1){$("#s_province").val(a[0]);$("#s_province").change();$("#s_city").val(a[1])}}$("#txtRecentActivities_MyInfo_Edit").val(t.Entity.RecentActivities);$("#txtILike_MyInfo_Edit").val(t.Entity.ILike);$("#txtPersonalSign_MyInfo_Edit").val(t.Entity.PersonalSign);$("#divSchoolName_MyInfo_Edit").html(pmain.getSchoolInfo().Name);if(t.UserType==1){$('[usertype="teacher"]').hide();pEditUserInfo.bindSpecialty(t.Entity.SpecialtyID);pEditUserInfo.bindStartYears();$("#sel_Eduaction_UserInfo_Edit").val(t.Entity.Education);$("#selStartYears_MyInfo_Edit").val(t.Entity.StartYear);$("#divClassName_MyInfo_Edit").html(t.Entity.ClassName);$("#txtClassID_MyInfo_Edit").html(t.Entity.ClassID);$("#txtDormitory_MyInfo_Edit").val(t.Entity.Dormitory)}else if(t.UserType==0){$('[usertype="student"]').hide();$("#divDepartment_MyInfo_Edit").html(t.Entity.DepartmentNames)}$.ui.hideMask()}else{$.ui.hideMask()}},error:function(e){$.ui.hideMask();$.ui.popup({title:"提示",message:"服务器地址"+serverHost+"异常，请检查配置",cancelText:"确定",cancelCallback:function(){},cancelOnly:true})}})}}};