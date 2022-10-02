"ui";
$shell.setDefaultOptions({ adb: true })
var finish = "";
ui.layout(
    <frame>
        <vertical>
            <appbar>
                <toolbar id="title" title="原神切服器" />
            </appbar>
            <text textSize="18sp" textColor="#000000" margin="20" textStyle="bold">
                使用前需注意：
            </text>
            <text textSize="18sp" textColor="#000000" margin="20" >
                1.本机须有你所想切换的服务器的客户端。
            </text>
            <text textSize="18sp" textColor="#000000" margin="20" >
                2.本切换器将删除掉其余的游戏数据，只保留一份完整的游戏数据，所以请确保至少有一个客户端是可以正常进入游戏的。
            </text>

            <button id="YuanShen" text="切换到官服" />
            <button id="Bilibili" text="切换到B服" />
            <button id="GenshinImpact" text="切换到国际服" />

        </vertical>
    </frame>
);


ui.YuanShen.click(function () {
    var GF = shell("du -sh /sdcard/Android/data/com.miHoYo.Yuanshen").result;
    var BF = shell("du -sh /sdcard/Android/data/com.miHoYo.ys.bilibili").result;
    var GJ = shell("du -sh /sdcard/Android/data/com.miHoYo.GenshinImpact").result;

    if (GF[2] == "M") { shell("pm clear com.miHoYo.Yuanshen"); shell("rm /sdcard/Android/data/com.miHoYo.Yuanshen -r"); }
    if (GF[2] == "G") finish = "com.miHoYo.Yuanshen";

    if (BF[2] == "M") { shell("pm clear com.miHoYo.ys.bilibili"); shell("rm /sdcard/Android/data/com.miHoYo.ys.bilibili -r"); }
    if (BF[2] == "G") finish = "com.miHoYo.ys.bilibili";

    if (GJ[2] == "M") { shell("pm clear com.miHoYo.GenshinImpact"); shell("rm /sdcard/Android/data/com.miHoYo.GenshinImpact -r"); }
    if (GJ[2] == "G") finish = "com.miHoYo.GenshinImpact";

    shell("rename /sdcard/Android/data/" + finish + " /sdcard/Android/data/com.miHoYo.Yuanshen");
    launch("com.miHoYo.Yuanshen")
    toast("已切换到官服");
});
ui.Bilibili.click(function () {
    var GF = shell("du -sh /sdcard/Android/data/com.miHoYo.Yuanshen").result;
    var BF = shell("du -sh /sdcard/Android/data/com.miHoYo.ys.bilibili").result;
    var GJ = shell("du -sh /sdcard/Android/data/com.miHoYo.GenshinImpact").result;

    if (GF[2] == "M") { shell("pm clear com.miHoYo.Yuanshen"); shell("rm /sdcard/Android/data/com.miHoYo.Yuanshen -r"); }
    if (GF[2] == "G") finish = "com.miHoYo.Yuanshen";

    if (BF[2] == "M") { shell("pm clear com.miHoYo.ys.bilibili"); shell("rm /sdcard/Android/data/com.miHoYo.ys.bilibili -r"); }
    if (BF[2] == "G") finish = "com.miHoYo.ys.bilibili";

    if (GJ[2] == "M") { shell("pm clear com.miHoYo.GenshinImpact"); shell("rm /sdcard/Android/data/com.miHoYo.GenshinImpact -r"); }
    if (GJ[2] == "G") finish = "com.miHoYo.GenshinImpact";

    shell("rename /sdcard/Android/data/" + finish + " /sdcard/Android/data/com.miHoYo.ys.bilibili");
    launch("com.miHoYo.ys.bilibili")
    toast("已切换到B服");
});
ui.GenshinImpact.click(function () {
    var GF = shell("du -sh /sdcard/Android/data/com.miHoYo.Yuanshen").result;
    var BF = shell("du -sh /sdcard/Android/data/com.miHoYo.ys.bilibili").result;
    var GJ = shell("du -sh /sdcard/Android/data/com.miHoYo.GenshinImpact").result;

    if (GF[2] == "M") { shell("pm clear com.miHoYo.Yuanshen"); shell("rm /sdcard/Android/data/com.miHoYo.Yuanshen -r"); }
    if (GF[2] == "G") finish = "com.miHoYo.Yuanshen";

    if (BF[2] == "M") { shell("pm clear com.miHoYo.ys.bilibili"); shell("rm /sdcard/Android/data/com.miHoYo.ys.bilibili -r"); }
    if (BF[2] == "G") finish = "com.miHoYo.ys.bilibili";

    if (GJ[2] == "M") { shell("pm clear com.miHoYo.GenshinImpact"); shell("rm /sdcard/Android/data/com.miHoYo.GenshinImpact -r"); }
    if (GJ[2] == "G") finish = "com.miHoYo.GenshinImpact";

    shell("rename /sdcard/Android/data/" + finish + " /sdcard/Android/data/com.miHoYo.GenshinImpact");
    launch("com.miHoYo.GenshinImpact")
    toast("已切换到国际服");
});