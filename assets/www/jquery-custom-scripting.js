$(document).bind("mobileinit", function(){
	$.mobile.defaultPageTransition = 'none';
	// Initilize Web SQL Database
	db = window.openDatabase("ExpenseTrackerDemo", "1.0", "Expense Tracker Demo Database", 200000);
	db.transaction(function(tx) {
		tx.executeSql("CREATE TABLE IF NOT EXISTS expenses (expenseID INTEGER PRIMARY KEY, expenseType TEXT, expenseAmount INTEGER, expenseDate TEXT, expenseImageURI TEXT)");
	});
});

// Global declarations
var contentMainVar = null;
var expenseTypeVar = null;
var expenseAmountVar = null;
var expenseDateVar = null;
var expenseImageURIVar = null;
var contentDialogVar = null;
var contentMessageVar = null;
var contentOKVar = null;
var confirmationOKVar = null;
var d = new Date();
var curr_date = d.getDate();
var curr_month = d.getMonth() + 1;
var curr_year = d.getFullYear();
var date_string = curr_month + "/" + curr_date + "/" + curr_year;
var pictureSource;
var destinationType; 

// Constants
var EMPTY = "";

document.addEventListener("deviceready",onDeviceReady,false);

function onDeviceReady() {
	pictureSource=navigator.camera.PictureSourceType;
	destinationType=navigator.camera.DestinationType;
};

function resetDB() {
	db.transaction(function(tx) {
		tx.executeSql('DROP TABLE IF EXISTS expenses', [], function() {
			document.location = 'index.html';
		});
	});
}

function formatCurrency(num) {
	num = isNaN(num) || num === '' || num === null ? 0.00 : num;
	return parseFloat(num).toFixed(2);
}