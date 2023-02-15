"ui";
importClass(java.io.File);
importClass(java.nio.file.Paths);
importClass(java.nio.file.Files);
importClass(java.lang.StringBuilder);
importClass(android.provider.DocumentsContract);
importClass(android.content.Intent);
importClass(android.net.Uri);
importClass(Packages.androidx.documentfile.provider.DocumentFile)

//跳转获取授权
function getPermission(activity) {
    let url = Uri.parse("content://com.android.externalstorage.documents/document/primary%3AAndroid%2Fdata");
    let intent = new Intent(Intent.ACTION_OPEN_DOCUMENT_TREE);
    intent.setFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION |
        Intent.FLAG_GRANT_WRITE_URI_PERMISSION |
        Intent.FLAG_GRANT_PERSISTABLE_URI_PERMISSION |
        Intent.FLAG_GRANT_PREFIX_URI_PERMISSION);
    intent.putExtra(DocumentsContract.EXTRA_INITIAL_URI, url);
    activity.startActivityForResult(intent, 11);
}

//判断是否有授权
function hasPermission() {
    let url = Uri.parse("content://com.android.externalstorage.documents/tree/primary%3AAndroid%2Fdata/document/primary%3AAndroid%2Fdata");
    let documentFile = DocumentFile.fromTreeUri(activity, url);
    return documentFile.canRead() && documentFile.canWrite();
}

//获取data目录的document对象
function get_data_documentFile(activity) {
    let url = Uri.parse('content://com.android.externalstorage.documents/tree/primary%3AAndroid%2Fdata/document/primary%3AAndroid%2Fdata');
    return DocumentFile.fromTreeUri(activity, url);
}

//path路径转uri对象
function path_to_url(path) {
    let paths = path.replace("/storage/emulated/0/Android/data", "").split("/");
    let stringBuilder = new StringBuilder("content://com.android.externalstorage.documents/tree/primary%3AAndroid%2Fdata/document/primary%3AAndroid%2Fdata");
    for (let i = 0; i < paths.length; i++) {
        if (paths[i].length === 0) continue;
        stringBuilder.append("%2F").append(paths[i]);
    }
    return Uri.parse(stringBuilder.toString());
}

//拷贝documet对象到文件
function saveDocumentFile(activity, documentFile, path, callback) {
    threads.start(function () {
        let inp;
        try {
            inp = getInput(activity, documentFile);
            Files.copy(inp, Paths.get(path));
            callback(true);
        } catch (err) {
            log(err);
            callback(false);
        } finally {
            inp.close();
        }
    });
}

function getInput(activity, documentFile) {
    if (documentFile.isFile()) {
        return activity.getContentResolver().openInputStream(documentFile.getUri());
    }
    return null;
}
//获取path指定的文件document对象
function getDocumentFile(activity, path) {
    let url = path_to_url(path);
    return DocumentFile.fromSingleUri(activity, url);
}

if (device.sdkInt >= 30) {
    if (!hasPermission(context)) {
        dialogs.alert('提示', '从安卓11开始，谷歌限制了Android/data目录的访问权限，' +
            '普通应用无法直接使用java.io访问该目录的文件，' +
            '但是可以通过安卓提供的SAF框架读取文件，需要跳转页面授权').then(() => {
                getPermission(activity);
            })
    }
}


const dataDir = get_data_documentFile(context);

var hasapp = []
var hasname = []
if (app.getAppName("com.miHoYo.Yuanshen") == "原神") {
    hasapp.push("com.miHoYo.Yuanshen")
    hasname.push("国服")
}
if (app.getAppName("com.miHoYo.ys.bilibili") == "原神") {
    hasapp.push("com.miHoYo.ys.bilibili")
    hasname.push("B服")
}
if (app.getAppName("com.miHoYo.ys.mi") == "原神") {
    hasapp.push("com.miHoYo.ys.mi")
    hasname.push("小米服")
}
if (app.getAppName("com.miHoYo.GenshinImpact") == "原神") {
    hasapp.push("com.miHoYo.GenshinImpact")
    hasname.push("国际服")
}

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
                1.请选择您当前完整安装的游戏客户端，如果您的手机上有多个完整的游戏客户端，那么请随意选择一个。“完整”的游戏客户端是指您可以正常进入游戏的客户端。
            </text>
            <text textSize="18sp" textColor="#ff0000" margin="20" >
                请务必确保您选择的客户端是完整的，否则会导致游戏数据丢失。
            </text>
            <spinner id="old" />

            <text textSize="18sp" textColor="#000000" margin="20" >
                2.本切换器将删除掉其余的游戏数据，只保留一份完整的游戏数据。请选择您想要切换的客户端：
            </text>
            <spinner id="new" />
            <button id="ok">确定</button>
        </vertical>
    </frame>
);

$ui.old.attr('entries', hasname.join('|'))
$ui.new.attr('entries', hasname.join('|'))

ui.ok.on("click", () => {
    var i = ui.old.getSelectedItemPosition();
    var j = ui.new.getSelectedItemPosition();
    if (i == j) {
        toast("请选择不同的客户端");
        return;
    }
    var oldapp = hasapp[i];
    var newapp = hasapp[j];

    for (var k = 0; k < hasapp.length; k++) {
        if (k != i) {
            const delDir = dataDir.findFile(hasapp[k]);
            if (delDir != null)
                delDir.delete();
        }
    }
    const oldDir = dataDir.findFile(oldapp);
    const newDir = oldDir.renameTo(newapp);
    launch(hasapp[j])
    toast("已切换为" + hasname[j]);
});