var timer_ForgetPWD=60;var pForgetPWDMobileCode={initialize:function(){this.bindEvents();this.bindResendMessage()},bindData:function(){},bindResendMessage:function(){window.setTimeout(function(){timer_ForgetPWD--;if(timer_ForgetPWD>0){$("#btnForgetPWDResendMessage").text("重发("+timer_ForgetPWD+"S)");pForgetPWDMobileCode.bindResendMessage()}else{$("#btnForgetPWDResendMessage").text("重发");$("#btnForgetPWDResendMessage").unbind().on("tap",function(){var e=$("#txtForgetPWDMobileNum").val();var t=serverHost+"/MobileService/UserService/UserService.asmx/RegisterMobile";$.ui.showMask("请稍等……");var n={schoolID:pmain.getSchoolInfo().ID,mobileNumber:e};$.ajax({type:"Post",contentType:"application/json; charset=utf-8",url:t,data:MY_JSON.stringify(n),dataType:"json",success:function(e){var t=MY_JSON.parse(e.d);if(t.ReturnFlag==1){$("#btnForgetPWDResendMessage").unbind();timer_ForgetPWD=60;pForgetPWDMobileCode.bindResendMessage()}else{$.ui.popup({title:"提示",message:t.ReturnMessage,cancelText:"确定",cancelCallback:function(){},cancelOnly:true})}$.ui.hideMask()},error:function(e,t,n){$.ui.hideMask();$.ui.popup({title:"提示",message:"短验证码发送失败，请稍后再试",cancelText:"确定",cancelCallback:function(){},cancelOnly:true})}})})}},1e3)},bindEvents:function(){$("#btnToForgetResetPassword").unbind().on("tap",function(){var e=$("#txtForgetPWDMobileCode").val();var t=serverHost+"/MobileService/UserService/UserService.asmx/VerifyMobileCode";$.ui.showMask("请稍等……");var n={schoolID:pmain.getSchoolInfo().ID,mobileNumber:$("#txtForgetPWDMobileNum").val(),messageCode:e};$.ajax({type:"Post",contentType:"application/json; charset=utf-8",url:t,data:MY_JSON.stringify(n),dataType:"json",success:function(e){var t=MY_JSON.parse(e.d);if(t.ReturnFlag==1){$.ui.loadContent("#pageForgetPWDResetPassword",false,false,"left")}else{$.ui.popup({title:"提示",message:t.ReturnMessage,cancelText:"确定",cancelCallback:function(){},cancelOnly:true})}$.ui.hideMask()},error:function(e,t,n){$.ui.hideMask();$.ui.popup({title:"提示",message:"服务器异常请稍后再试",cancelText:"确定",cancelCallback:function(){},cancelOnly:true})}})})}};