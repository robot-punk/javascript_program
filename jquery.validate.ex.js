/*
* validate method plugin for the jQuery validation plugin.
* Language: JA
*/

// 日付
jQuery.validator.addMethod(
	"isDate",
	function(value, element) {

		var PTN_YYYYMMDD = /^\d{4}\/\d{2}\/\d{2}$/;
		var DATE_DELIMITER = '/';

		var date = new Date(value);

		var optional = this.optional(element);

		if (optional) {
			return optional;
		}

		// invalidな日付または、フォーマット通りに入力されていない場合はNGとなる
		if (/Invalid|NaN/.test(date.toString()) || !PTN_YYYYMMDD.test(value)) {
			return false;
		}

		// 入力値とnewDate.toStringを文字列比較する。
		// 実際には無い日付（2013/04/31）をnewDateすると勝手に変換（2013/05/01）するのでその対策。
		// なお、31日だけこの現象が起こる。32日以降はnewDateでもinvalid判定になる。
		var m = '0' + (date.getMonth() + 1);
		var d = '0' + date.getDate();
		var newDateStr = date.getFullYear() + DATE_DELIMITER + m.slice(-2) + DATE_DELIMITER + d.slice(-2);

		return newDateStr === value;
	}, "日付（形式：yyyy/MM/dd）を入力してください。"
);

// 時刻 (hh:mm)
jQuery.validator.addMethod(
	"time",
	function(value, element) {
	    // 値がない場合はチェック対象外とする。
	    if(value === ""){
	        return true;
	    }
	    // 正規表現による書式チェック
	    if(!value.match(/^\d{2}\:\d{2}$/)){
	        return false;
	    }

	    var vHour = value.substr(0, 2) - 0;
	    var vMinutes = value.substr(3, 2) - 0;
	    if(vHour >= 0 && vHour <= 23 && vMinutes >= 0 && vMinutes <= 59){
			return true;
	    }else{
			return false;
	    }
	}, "時刻（形式：hh:mm）を入力してください。"
);


