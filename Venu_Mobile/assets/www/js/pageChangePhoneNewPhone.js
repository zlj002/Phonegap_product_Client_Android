var changeNewPhoneCodeTimer=60;var pChangePhoneNewPhone={initialize:function(){this.initEvents();this.bindData()},bindBtnSend:function(){$("#btnResendMessage_NewPhone_ChangePhone").unbind().on("tap",function(){var e=$("#txtNewPhoneNum").val();var n=serverHost+"/MobileService/UserService/UserService.asmx/GenReBindMobileNewMobileCode";$.ui.showMask("请稍等……");var a={schoolID:pmain.getSchoolInfo().ID,mobileNumber:e};$.ajax({type:"Post",contentType:"application/json; charset=utf-8",url:n,data:MY_JSON.stringify(a),dataType:"json",success:function(e){var n=MY_JSON.parse(e.d);if(n.ReturnFlag==1){$("#btnResendMessage_NewPhone_ChangePhone").unbind();changeNewPhoneCodeTimer=60;pChangePhoneNewPhone.bindResendMessage()}else{$.ui.popup({title:"提示",message:n.ReturnMessage,cancelText:"确定",cancelCallback:function(){},cancelOnly:true})}$.ui.hideMask()},error:function(e,n,a){$.ui.hideMask();$.ui.popup({title:"提示",message:"短验证码发送失败，请稍后再试",cancelText:"确定",cancelCallback:function(){},cancelOnly:true})}})})},initEvents:function(){$("#txtNewPhoneNum").val("");$("#txtNewPhoneMessageCode_ChangePhone").val("");$("#btnChangePhoneOK").unbind().bind("tap",function(){var e=true;var n=$("#txtNewPhoneNum").val();var a=/^\d{11}$/;if(!n.match(a)){$.ui.popup({title:"提示",message:"请输入正确的手机号",cancelText:"确定",cancelCallback:function(){},cancelOnly:true});e=false}var t=$("#txtNewPhoneMessageCode_ChangePhone").val();if(t==""){$.ui.popup({title:"提示",message:"请输入验证码",cancelText:"确定",cancelCallback:function(){},cancelOnly:true});e=false}if(e){var o=serverHost+"/MobileService/UserService/UserService.asmx/ValidateChangePhoneNumberNewPhoneCode";$.ui.showMask("请稍等……");var i={schoolID:pmain.getSchoolInfo().ID,userID:localMobelInfo.getUserName(),mobileNumber:n,code:t};$.ajax({type:"Post",contentType:"application/json; charset=utf-8",url:o,data:MY_JSON.stringify(i),dataType:"json",success:function(e){var n=MY_JSON.parse(e.d);if(n.ReturnFlag==1){$.ui.popup({title:"提示",message:"修改成功",cancelText:"确定",cancelCallback:function(){$.ui.loadContent("#myInfo",false,false,"left")},cancelOnly:true})}else{$.ui.popup({title:"提示",message:n.ReturnMessage,cancelText:"确定",cancelCallback:function(){},cancelOnly:true})}$.ui.hideMask()},error:function(e,n,a){$.ui.hideMask();$.ui.popup({title:"提示",message:"验证码验证失败",cancelText:"确定",cancelCallback:function(){},cancelOnly:true})}})}});pChangePhoneNewPhone.bindBtnSend()},bindResendMessage:function(){window.setTimeout(function(){changeNewPhoneCodeTimer--;if(changeNewPhoneCodeTimer>0){$("#btnResendMessage_NewPhone_ChangePhone").text("重发("+changeNewPhoneCodeTimer+"S)");pChangePhoneNewPhone.bindResendMessage()}else{$("#btnResendMessage_NewPhone_ChangePhone").text("重发");pChangePhoneNewPhone.bindBtnSend()}},1e3)},bindData:function(){}};