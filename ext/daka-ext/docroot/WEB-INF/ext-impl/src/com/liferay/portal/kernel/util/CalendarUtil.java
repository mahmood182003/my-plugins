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

import java.util.TimeZone;

import com.liferay.portal.kernel.util.icu.PersianCalendar;
import com.liferay.portal.kernel.util.icu.PersianDateFormat;

import java.sql.Timestamp;

import java.util.Calendar;
import java.util.Date;
import java.util.Locale;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;


/**
 * @author Brian Wing Shun Chan
 */
public class CalendarUtil extends PortalCalendarUtil {

	public static final int[] PERSIAN_MONTH_IDS = new int[] {
		PersianCalendar.FARVARDIN, PersianCalendar.ORDIBEHESHT, PersianCalendar.KHORDAD, PersianCalendar.TIR,
		PersianCalendar.MORDAD, PersianCalendar.SHAHRIVAR, PersianCalendar.MEHR, PersianCalendar.ABAN,
		PersianCalendar.AZAR, PersianCalendar.DEY, PersianCalendar.BAHMAN, PersianCalendar.ESFAND
	};

	public static String[] getDays(Locale locale) {

		return getDays(locale, null);
	}

	public static String[] getDays(Locale locale, String pattern) {

		if (!"fa".equals(locale.getLanguage())) {
			return PortalCalendarUtil.getDays(locale, pattern);
		}

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

	public static int[] getMonthIds(Locale locale) {

		if ("fa".equals(locale.getLanguage())) {
			return PERSIAN_MONTH_IDS;
		}
		else {
			return MONTH_IDS;
		}
	}

	public static String[] getMonths(Locale locale) {

		return getMonths(locale, null);
	}

	public static String[] getMonths(Locale locale, String pattern) {

		if (!"fa".equals(locale.getLanguage())) {
			return PortalCalendarUtil.getMonths(locale, pattern);
		}

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

			PersianCalendar pc = new PersianCalendar();
			PersianDateFormat monthFormat = new PersianDateFormat(pattern, locale);

			pc.set(PersianCalendar.DATE, 1);

			for (int i = 0; i < 12; i++) {
				pc.set(PersianCalendar.MONTH, i);

				months[i] = monthFormat.format(pc.getTime());
			}

			_calendarPool.put(key, months);
		}

		return months;
	}

}
