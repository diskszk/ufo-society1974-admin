"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var styles_1 = require("@material-ui/core/styles");
var Table_1 = require("@material-ui/core/Table");
var TableCell_1 = require("@material-ui/core/TableCell");
var TableContainer_1 = require("@material-ui/core/TableContainer");
var TableHead_1 = require("@material-ui/core/TableHead");
var TableRow_1 = require("@material-ui/core/TableRow");
var Paper_1 = require("@material-ui/core/Paper");
var SongTableBody_1 = require("./SongTableBody");
var songs_1 = require("../../lib/songs");
var constans_1 = require("../../constans");
var useStyles = styles_1.makeStyles({
    table: {
        minWidth: 650
    },
    actionBtn: {
        cursor: 'pointer'
    }
});
var SongTable = function () {
    var classes = useStyles();
    var role = react_redux_1.useSelector(function (state) { return state.user; }).role;
    var _a = react_1.useState([]), rows = _a[0], setRows = _a[1];
    var _b = react_1.useState(true), loading = _b[0], setLoading = _b[1];
    var clickDelete = react_1.useCallback(function (id, title) {
        // edditer only
        if (role !== constans_1.ROLE.EDITOR) {
            alert('編集者のみ曲を削除できます。');
            return false;
        }
        if (window.confirm(title + "\u3092\u524A\u9664\u3057\u307E\u3059\u304B?")) {
            songs_1.deleteSong(id).then(function () {
                // do refresh
                songs_1.getSongs().then(function (list) {
                    setRows(list);
                });
            });
        }
        else {
            return false;
        }
    }, [setRows]);
    react_1.useEffect(function () {
        songs_1.getSongs().then(function (list) {
            setRows(list);
            setLoading(false);
        });
    }, [setRows]);
    return (<div className="song-table">
      <TableContainer_1["default"] component={Paper_1["default"]}>
        <Table_1["default"] className={classes.table} aria-label="simple table">
          <TableHead_1["default"]>
            <TableRow_1["default"]>
              <TableCell_1["default"] align="right">No.</TableCell_1["default"]>
              <TableCell_1["default"]>タイトル</TableCell_1["default"]>
              <TableCell_1["default"]>元ネタ</TableCell_1["default"]>
              <TableCell_1["default"]>再生</TableCell_1["default"]>
              <TableCell_1["default"]></TableCell_1["default"]>
              <TableCell_1["default"]></TableCell_1["default"]>
            </TableRow_1["default"]>
          </TableHead_1["default"]>

          <SongTableBody_1["default"] rows={rows} onClick={clickDelete}/>
        </Table_1["default"]>
      </TableContainer_1["default"]>
    </div>);
};
exports["default"] = SongTable;
