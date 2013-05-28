/*
	Calendar calculations for this IntlDate object are not
	implemented yet. This file is only a template to give you
	an idea on how to complete this code. Please take a look
	at PersianDate.js for an example of a working calendar.
*/

// Import IntlDate.js

// class KoreanDateUTC extends IntlDateBase
KoreanDateUTC.extend(IntlDateBase);
function KoreanDateUTC(year, month, day, hr, min, sec)
{
	this.caltype = 28;
	this.base();
}

// KoreanDateUTC Date.toKoreanDate()
Date.prototype.toKoreanDate = DateToKoreanDate;
function DateToKoreanDate(lateInit) {
	if (lateInit)
		return new KoreanDateUTC(this.getTime());
	var year, month, day, hr, min, sec, ymd;
	year = this.getUTCFullYear();
	month = this.getUTCMonth();
	day = this.getUTCDate();
	hr = this.getUTCHours();
	min = this.getUTCMinutes();
	sec = this.getUTCSeconds();
	ymd = gregorian_to_korean(new Array(year, month+1, day));
	year = ymd[0]; month = ymd[1]-1; day = ymd[2];
	if (isNaN(year) || isNaN(month) || isNaN(day))
		return null;
	var date = new KoreanDateUTC(year, month, day, hr, min, sec);
	date.msTime = this.getTime();
	date.dow = this.getUTCDay();
	return date;
}

// override
// Date KoreanDateUTC.toDate()
KoreanDateUTC.prototype.toDate = KoreanDateToDate;
function KoreanDateToDate() {
	if (this.msTime != null)
		return new Date(this.msTime);
	this.ensureFlat();
	if (!this.validRange())
		return null;
	var year, month, day, hr, min, sec, ymd;
	year = this.getUTCFullYear();
	month = this.getUTCMonth();
	day = this.getUTCDate();
	hr = this.getUTCHours();
	min = this.getUTCMinutes();
	sec = this.getUTCSeconds();
	ymd = korean_to_gregorian(new Array(year, month+1, day));
	year = ymd[0]; month = ymd[1]-1; day = ymd[2];
	if (isNaN(year) || isNaN(month) || isNaN(day))
		return null;
	var date = new Date(Date.UTC(year, month, day));
	if (year != date.getUTCFullYear() || month != date.getUTCMonth() ||
		day != date.getUTCDate())
		return null;
	date.setUTCHours(hr, min, sec, 0);
	return date;
}

// override
// <IntlDate> KoreanDateUTC.getLocaleDate(Date date)
KoreanDateUTC.prototype.getLocaleDate = KoreanDateGetLocaleDate;
function KoreanDateGetLocaleDate(date) {
	return date.toKoreanDate();
}

// override
// Boolean KoreanDateUTC.validRange()
KoreanDateUTC.prototype.validRange = KoreanDateValidRange;
function KoreanDateValidRange() {
	var yrMin, yrMax, year, month, day, hr, min, sec;
	year = this.yr;
	month = this.mon + 1;
	day = this.day;
	if (isNaN(year) || isNaN(month) || isNaN(day))
		return false;
	yrMin = 1700;
	yrMax = 2500;
	if ((year < yrMin || year > yrMax) ||
		(month < 1 || month > 12) ||
		(day < 1 || day > this.getDaysInMonth(year, month)))
		return false;
	return true;
}

// override
// Number KoreanDateUTC.getDaysInMonth(Number year, Number month)
KoreanDateUTC.prototype.getDaysInMonth = KoreanDateGetDaysInMonth;
function KoreanDateGetDaysInMonth(year, month) {
	return;
}

// override
// Boolean KoreanDateUTC.isLeapYear(Number year)
KoreanDateUTC.prototype.isLeapYear = KoreanDateIsLeapYear;
function KoreanDateIsLeapYear(year) {
	return;
}

// override
// String KoreanDateUTC.toDateString()
KoreanDateUTC.prototype.toDateString = KoreanDateToDateString;
function KoreanDateToDateString()
{
	return this.getFullYear() +"/"+ (this.getMonth()+1) +"/"+ this.getDate();
}

// override
// String KoreanDateUTC.toTimeString()
KoreanDateUTC.prototype.toTimeString = KoreanDateToTimeString;
function KoreanDateToTimeString()
{
	return this.getHours() +":"+ this.getMinutes() +":"+ this.getSeconds();
}

// override
// String KoreanDateUTC.toString()
KoreanDateUTC.prototype.toString = KoreanDateToString;
function KoreanDateToString()
{
	return this.toDateString() +"  "+ this.toTimeString();
}

// override
// String KoreanDateUTC.toLocaleDateString()
KoreanDateUTC.prototype.toLocaleDateString = KoreanDateToLocaleDateString;
function KoreanDateToLocaleDateString()
{
	return this.toDateString()
		.changeDigitShapes(Calendar.digitShape);
}

// override
// String KoreanDateUTC.toLocaleTimeString()
KoreanDateUTC.prototype.toLocaleTimeString = KoreanDateToLocaleTimeString;
function KoreanDateToLocaleTimeString()
{
	return this.toTimeString()
		.changeDigitShapes(Calendar.digitShape);
}

// override
// String KoreanDateUTC.toLocaleString()
KoreanDateUTC.prototype.toLocaleString = KoreanDateToLocaleString;
function KoreanDateToLocaleString()
{
	return this.toString()
		.changeDigitShapes(Calendar.digitShape);
}

// override
// String KoreanDateUTC.toUTCString()
KoreanDateUTC.prototype.toUTCString = KoreanDateToUTCString;
function KoreanDateToUTCString()
{
	var str = this.getUTCFullYear() +"/"+ (this.getUTCMonth()+1) +"/"+ this.getUTCDate() +
		"  "+ this.getUTCHours() +":"+ this.getUTCMinutes() +":"+ this.getUTCSeconds();
	return str;
}

// Helper methods for this calendar

function gregorian_to_korean(g)
{
   var y, m, d;
   // ...
   return new Array(y, m, d);
}

function korean_to_gregorian(i)
{
   var y, m, d;
   // ...
   return new Array(y, m, d);
}

// ...put necessary methods to calculate the date here.

