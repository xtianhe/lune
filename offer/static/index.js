$(function(){
    var Offer = {
        bindCreate: function(){
            var me = this;
            $("#create").click(function(){
                var name = $("#name").val();
                var year = parseInt($("#year").val());
                if (me.mecheck(name, year)) {
                    $("#section1").hide();
                    $("#section2").show();
                    me.getImg(name,year);
                }
            });
        },
        getImg: function(name,year,school){
            $.ajax({
                url: "/get_img",
                type: "post",
                data:{
                    name: name,
                    year: year,
                    school: school
                },
                success: function(res){
                    res = $.parseJSON(res);
                    console.log(res)
                    $("#schoolName").text(res.school);
                    $("#schoolImg").attr("src", res.imgUrl);
                }
            });
        },
        bindShare: function(){
            $("#share").click(function(){
                $("#section3").show();
            });
            $("#section3").click(function(){
                $(this).hide()
            });
        },
        bindSchool: function(){
            var me = this;
            $("#change").click(function(){
                $("#section4").show();
            });
            $(".school-button").click(function(){
                var name = $("#name").val();
                var year = parseInt($("#year").val());
                var school = $(this).attr("data-school");
                me.getImg(name,year,school);
                $("#section4").hide();
            });
        },
        mecheck: function(name, year){
            if (/^[\u0391-\uFFE5]+$/.test(name)||/^[a-zA-Z\d]+$/.test(name)) {
                if (/^[0-9]*[1-9][0-9]*$/.test(year) && year>=1500 && year<=2016) {
                    return true;
                }else{
                    alert("请输入正确的年份（如2016）");
                }
            } else {
                alert("请输入正确的名字（中文/英文）");
            }
            return false;
        },
        init: function(){
            this.bindCreate();
            this.bindShare();
            this.bindSchool();
        }
    }
    Offer.init();
});