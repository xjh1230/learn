//清除弹窗+服务端提交
video.addEventListener("timeupdate", function(e) {
    var currentTime = parseInt(video.currentTime);

    if (currentTime > maxTime) {
        maxTime = currentTime;
    } //if (beginFaceSign == 1 && currentTime > 0) video.pause();

    if (currentTime - oldTime >= 60 && currentTime > learnDuration) {
        $.post("/addstudentTaskVer2/" + courseid + "/" + lessonid, {
            learnTime: currentTime,
        });
        oldTime = currentTime;
    } //console.log(currentTime, oldTime, learnDuration);
});

//自动播放下一节课
video.addEventListener("ended", function(e) {
    let num = lessonNum + 1;
    setTimeout(() => {
        $(".lesson-" + num).click();
        setTimeout(() => {
            video.play();
        }, 200);
        setTimeout(() => {
            $(".layui-layer-shade").hide();
            $(".layui-layer-dialog").hide();
            video.play();
        }, 2000);
    }, 400);
});

check_network_protocol_support = function() {
    return true;
};
isPlay = true;
setInterval(() => {
    isPlay = true;
}, 1000);