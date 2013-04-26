/**
 * Copyright (c) 2000-2012 Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */

package com.liferay.portal.kernel.util;

import com.ibm.icu.util.TimeZone;

import com.liferay.portal.kernel.util.icu.PersianCalendar;
import com.liferay.portal.kernel.util.icu.PersianDateFormat;

import java.sql.Timestamp;

import java.util.Date;
import java.util.Locale;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * @author Brian Wing Shun Chan
 */
public class CalendarUtil {

	public static final String[] DAYS_ABBREVIATION = new String[] {
		"sunday-abbreviation", "monday-abbreviation", "tuesday-abbreviation", "wednesday-abbreviation",
		"thursday-abbreviation", "friday-abbreviation", "saturday-abbreviation"
	};

	public static final String ICAL_EXTENSION = "ics";

	public static final int[] MONTH_IDS = new int[] {
		PersianCalendar.JANUARY, PersianCalendar.FEBRUARY, PersianCalendar.MARCH, PersianCalendar.APRIL,
		PersianCalendar.MAY, PersianCalendar.JUNE, PersianCalendar.JULY, PersianCalendar.AUGUST,
		PersianCalendar.SEPTEMBER, PersianCalendar.OCTOBER, PersianCalendar.NOVEMBER, PersianCalendar.DECEMBER
	};

	public static boolean afterByDay(Date date1, Date date2) {

		long millis1 = _getTimeInMillis(date1);
		long millis2 = _getTimeInMillis(date2);

		if (millis1 > millis2) {
			return true;
		}
		else {
			return false;
		}
	}

	public static boolean beforeByDay(Date date1, Date date2) {

		long millis1 = _getTimeInMillis(date1);
		long millis2 = _getTimeInMillis(date2);

		if (millis1 < millis2) {
			return true;
		}
		else {
			return false;
		}
	}

	public static boolean equalsByDay(Date date1, Date date2) {

		long millis1 = _getTimeInMillis(date1);
		long millis2 = _getTimeInMillis(date2);

		if (millis1 == millis2) {
			return true;
		}
		else {
			return false;
		}
	}

	public static int getAge(Date date, PersianCalendar today) {

		PersianCalendar birthday = new PersianCalendar();

		birthday.setTime(date);

		int yearDiff = today.get(PersianCalendar.YEAR) - birthday.get(PersianCalendar.YEAR);

		if (today.get(PersianCalendar.MONTH) < birthday.get(PersianCalendar.MONTH)) {
			yearDiff--;
		}
		else if (today.get(PersianCalendar.MONTH) == birthday.get(PersianCalendar.MONTH) &&
			today.get(PersianCalendar.DATE) < birthday.get(PersianCalendar.DATE)) {

			yearDiff--;
		}

		return yearDiff;
	}

	public static int getAge(Date date, TimeZone tz) {

		return getAge(date, new PersianCalendar(tz));
	}

	public static String[] getDays(Locale locale) {

		return getDays(locale, null);
	}

	public static String[] getDays(Locale locale, String pattern) {

		if (Validator.isNull(pattern)) {
			pattern = "EEEE";
		}

		StringBundler sb = new StringBundler(6);

		sb.append("days_");
		sb.append(pattern);
		sb.append("_");
		sb.append(locale.getLanguage());
		sb.append("_");
		sb.append(locale.getCountry());

		String key = sb.toString();

		String[] days = _calendarPool.get(key);

		if (days == null) {
			days = new String[7];

			PersianCalendar pc = new PersianCalendar(locale);
			PersianDateFormat dayFormat = new PersianDateFormat(pattern, locale);

			pc.set(PersianCalendar.DATE, 1);

			for (int i = 0; i < 7; i++) {
				pc.set(PersianCalendar.DAY_OF_WEEK, i + 1);

				days[i] = dayFormat.format(pc.getTime());
			}

			_calendarPool.put(key, days);
		}

		return days;
	}

	public static int getDaysInMonth(PersianCalendar cal) {

		return getDaysInMonth(cal.get(PersianCalendar.MONTH), cal.get(PersianCalendar.YEAR));
	}

	public static int getDaysInMonth(int month, int year) {

		month++;

		if ((month == 1) || (month == 3) || (month == 5) || (month == 7) || (month == 8) || (month == 10) ||
			(month == 12)) {

			return 31;
		}
		else if ((month == 4) || (month == 6) || (month == 9) || (month == 11)) {

			return 30;
		}
		else {
			if (((year % 4) == 0) && ((year % 100) != 0) || ((year % 400) == 0)) {

				return 29;
			}
			else {
				return 28;
			}
		}
	}

	public static int getGregorianDay(PersianCalendar cal) {

		int year = cal.get(PersianCalendar.YEAR) - 1600;

		int month = cal.get(PersianCalendar.MONTH) + 1;

		if (month < 3) {
			month += 12;
		}

		int day = cal.get(PersianCalendar.DATE);

		int gregorianDay = (int) (6286 + (year * 365.25) - (year / 100) + (year / 400) + (30.6 * month) + 0.2 + day);

		return gregorianDay;
	}

	public static Date getGTDate(PersianCalendar cal) {

		PersianCalendar gtCal = (PersianCalendar) cal.clone();

		gtCal.set(PersianCalendar.HOUR_OF_DAY, 0);
		gtCal.set(PersianCalendar.MINUTE, 0);
		gtCal.set(PersianCalendar.SECOND, 0);
		gtCal.set(PersianCalendar.MILLISECOND, 0);

		return gtCal.getTime();
	}

	public static int getLastDayOfWeek(PersianCalendar cal) {

		int firstDayOfWeek = cal.getFirstDayOfWeek();

		if (firstDayOfWeek == PersianCalendar.SUNDAY) {
			return PersianCalendar.SATURDAY;
		}
		else if (firstDayOfWeek == PersianCalendar.MONDAY) {
			return PersianCalendar.SUNDAY;
		}
		else if (firstDayOfWeek == PersianCalendar.TUESDAY) {
			return PersianCalendar.MONDAY;
		}
		else if (firstDayOfWeek == PersianCalendar.WEDNESDAY) {
			return PersianCalendar.TUESDAY;
		}
		else if (firstDayOfWeek == PersianCalendar.THURSDAY) {
			return PersianCalendar.WEDNESDAY;
		}
		else if (firstDayOfWeek == PersianCalendar.FRIDAY) {
			return PersianCalendar.THURSDAY;
		}

		return PersianCalendar.FRIDAY;
	}

	public static Date getLTDate(PersianCalendar cal) {

		PersianCalendar ltCal = (PersianCalendar) cal.clone();

		ltCal.set(PersianCalendar.HOUR_OF_DAY, 23);
		ltCal.set(PersianCalendar.MINUTE, 59);
		ltCal.set(PersianCalendar.SECOND, 59);
		ltCal.set(PersianCalendar.MILLISECOND, 990);

		return ltCal.getTime();
	}

	public static int[] getMonthIds() {

		return MONTH_IDS;
	}

	public static String[] getMonths(Locale locale) {

		return getMonths(locale, null);
	}

	public static String[] getMonths(Locale locale, String pattern) {

		if (Validator.isNull(pattern)) {
			pattern = "MMMM";
		}

		StringBundler sb = new StringBundler(6);

		sb.append("months_");
		sb.append(pattern);
		sb.append("_");
		sb.append(locale.getLanguage());
		sb.append("_");
		sb.append(locale.getCountry());

		String key = sb.toString();

		String[] months = _calendarPool.get(key);

		if (months == null) {
			months = new String[12];

			PersianCalendar cal = new PersianCalendar();

			PersianDateFormat monthFormat = new PersianDateFormat(pattern, locale);

			cal.set(PersianCalendar.DATE, 1);

			for (int i = 0; i < 12; i++) {
				cal.set(PersianCalendar.MONTH, i);

				months[i] = monthFormat.format(cal.getTime());
			}

			_calendarPool.put(key, months);
		}

		return months;
	}

	public static Timestamp getTimestamp(Date date) {

		if (date == null) {
			return null;
		}
		else {
			return new Timestamp(date.getTime());
		}
	}

	public static boolean isAfter(
		int month1, int day1, int year1, int hour1, int minute1, int amPm1, int month2, int day2, int year2, int hour2,
		int minute2, int amPm2, TimeZone timeZone, Locale locale) {

		PersianCalendar cal1 = new PersianCalendar(timeZone, locale);

		cal1.set(PersianCalendar.MONTH, month1);
		cal1.set(PersianCalendar.DATE, day1);
		cal1.set(PersianCalendar.YEAR, year1);
		cal1.set(PersianCalendar.HOUR, hour1);
		cal1.set(PersianCalendar.MINUTE, minute1);
		cal1.set(PersianCalendar.AM_PM, amPm1);

		PersianCalendar cal2 = new PersianCalendar(timeZone, locale);

		cal2.set(PersianCalendar.MONTH, month2);
		cal2.set(PersianCalendar.DATE, day2);
		cal2.set(PersianCalendar.YEAR, year2);
		cal2.set(PersianCalendar.HOUR, hour2);
		cal2.set(PersianCalendar.MINUTE, minute2);
		cal2.set(PersianCalendar.AM_PM, amPm2);

		return cal1.after(cal2);
	}

	public static boolean isBroadcastDate(int month, int day, int year) {

		if (!isDate(month, day, year)) {
			return false;
		}

		PersianCalendar cal1 = new PersianCalendar();

		cal1.setFirstDayOfWeek(PersianCalendar.MONDAY);
		cal1.set(PersianCalendar.MONTH, month);
		cal1.set(PersianCalendar.DATE, day);
		cal1.set(PersianCalendar.YEAR, year);

		PersianCalendar cal2 = new PersianCalendar();

		cal2.setFirstDayOfWeek(PersianCalendar.MONDAY);
		cal2.set(PersianCalendar.MONTH, month + 1);
		cal2.set(PersianCalendar.DATE, 1);
		cal2.set(PersianCalendar.YEAR, year);

		if ((cal2.get(PersianCalendar.DAY_OF_WEEK) != PersianCalendar.MONDAY) &&
			(cal2.get(PersianCalendar.WEEK_OF_YEAR) == cal1.get(PersianCalendar.WEEK_OF_YEAR))) {

			return false;
		}

		return true;
	}

	public static boolean isDate(int month, int day, int year) {

		return Validator.isDate(month, day, year);
	}

	public static boolean isFuture(int month, int year) {

		return isFuture(month, year, TimeZone.getDefault(), Locale.getDefault());
	}

	public static boolean isFuture(int month, int day, int year) {

		return isFuture(month, day, year, TimeZone.getDefault(), Locale.getDefault());
	}

	public static boolean isFuture(int month, int day, int year, int hour, int minute, int amPm) {

		return isFuture(month, day, year, hour, minute, amPm, TimeZone.getDefault(), Locale.getDefault());
	}

	public static boolean isFuture(
		int month, int day, int year, int hour, int minute, int amPm, TimeZone timeZone, Locale locale) {

		PersianCalendar curCal = new PersianCalendar(timeZone, locale);

		PersianCalendar cal = (PersianCalendar) curCal.clone();

		cal.set(PersianCalendar.MONTH, month);
		cal.set(PersianCalendar.DATE, day);
		cal.set(PersianCalendar.YEAR, year);
		cal.set(PersianCalendar.HOUR, hour);
		cal.set(PersianCalendar.MINUTE, minute);
		cal.set(PersianCalendar.AM_PM, amPm);

		return cal.after(curCal);
	}

	public static boolean isFuture(int month, int day, int year, TimeZone timeZone, Locale locale) {

		PersianCalendar curCal = new PersianCalendar(timeZone, locale);

		PersianCalendar cal = (PersianCalendar) curCal.clone();

		cal.set(PersianCalendar.MONTH, month);
		cal.set(PersianCalendar.DATE, day);
		cal.set(PersianCalendar.YEAR, year);

		return cal.after(curCal);
	}

	public static boolean isFuture(int month, int year, TimeZone timeZone, Locale locale) {

		PersianCalendar curCal = new PersianCalendar(timeZone, locale);

		curCal.set(PersianCalendar.DATE, 1);

		PersianCalendar cal = (PersianCalendar) curCal.clone();

		cal.set(PersianCalendar.MONTH, month);
		cal.set(PersianCalendar.YEAR, year);

		return cal.after(curCal);
	}

	public static boolean isGregorianDate(int month, int day, int year) {

		return Validator.isGregorianDate(month, day, year);
	}

	public static boolean isJulianDate(int month, int day, int year) {

		return Validator.isJulianDate(month, day, year);
	}

	public static PersianCalendar roundByMinutes(PersianCalendar cal, int interval) {

		int minutes = cal.get(PersianCalendar.MINUTE);

		int delta = 0;

		if (minutes < interval) {
			delta = interval - minutes;
		}
		else {
			delta = interval - (minutes % interval);
		}

		if (delta == interval) {
			delta = 0;
		}

		cal.add(PersianCalendar.MINUTE, delta);

		return cal;
	}

	private static long _getTimeInMillis(Date date) {

		PersianCalendar cal = new PersianCalendar();

		cal.setTime(date);

		int year = cal.get(PersianCalendar.YEAR);
		int month = cal.get(PersianCalendar.MONTH);
		int day = cal.get(PersianCalendar.DATE);
		int hour = 0;
		int minute = 0;
		int second = 0;

		cal.set(year, month, day, hour, minute, second);

		long millis = cal.getTimeInMillis() / Time.DAY;

		return millis;
	}

	private static Map<String, String[]> _calendarPool = new ConcurrentHashMap<String, String[]>();

}
