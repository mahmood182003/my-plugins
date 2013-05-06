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

package com.liferay.portal.util;

import com.liferay.portal.kernel.util.CalendarFactory;

import java.util.Locale;
import java.util.TimeZone;

/**
 * @author Brian Wing Shun Chan
 */
public class CalendarFactoryImpl implements CalendarFactory {

	public I18nCalendar getCalendar() {

		return new I18nCalendar();
	}

	public I18nCalendar getCalendar(int year, int month, int date) {

		return new I18nCalendar(year, month, date);
	}

	public I18nCalendar getCalendar(int year, int month, int date, int hour, int minute) {

		return new I18nCalendar(year, month, date, hour, minute);
	}

	public I18nCalendar getCalendar(int year, int month, int date, int hour, int minute, int second) {

		return new I18nCalendar(year, month, date, hour, minute, second);
	}

	public I18nCalendar getCalendar(Locale locale) {

		return new I18nCalendar(locale);
	}

	public I18nCalendar getCalendar(TimeZone timeZone) {

		return new I18nCalendar(timeZone);
	}

	public I18nCalendar getCalendar(TimeZone timeZone, Locale locale) {

		return new I18nCalendar(timeZone, locale);
	}

}
