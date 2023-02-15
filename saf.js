importClass(java.nio.file.Paths);
importClass(java.nio.file.Files);
importClass(java.lang.StringBuilder);
importClass(android.provider.DocumentsContract);
importClass(android.content.Intent);
importClass(android.net.Uri);
importClass(Packages.androidx.documentfile.provider.DocumentFile)

/**
 * 
 * 参考资料:https://blog.csdn.net/qq_17827627/article/details/113931692?spm=1001.2101.3001.6650.5&utm_medium=distribute.wap_relevant.none-task-blog-2~default~CTRLIST~default-5.wap_blog_relevant_default&depth_1-utm_source=distribute.wap_relevant.none-task-blog-2~default~CTRLIST~default-5.wap_blog_relevant_default
 * 
 * document对象更多使用方法参考安卓文档;
 * https://developer.android.google.cn/reference/kotlin/androidx/documentfile/provider/DocumentFile?hl=en
 **/

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

exports.getPermission = getPermission;
exports.hasPermission = hasPermission;
exports.getDocumentFile = getDocumentFile;
exports.get_data_documentFile = get_data_documentFile;
exports.saveDocumentFile = saveDocumentFile;