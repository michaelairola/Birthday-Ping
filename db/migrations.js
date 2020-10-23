export const SETTINGS = "Settings";
export const CONTACT = "Contact";

export const Schema = {
	[SETTINGS]: { 
	  "BirthDayNotificationTimes": [ 
	    "Sunday", "Monday", "Tuesday", "Wednesday", 
	    "Thursday", "Friday", "Saturday" 
	  ].reduce((acc, weekday) => ({ ...acc, [weekday]: "9:30" }), {}),
	  "Theme": "dark",
	  "EnableBirthdayReminder": true,
	  "EnableGiftReminder": true,
	  "GiftSearchScope": 1 * 30 * 24 * 3600, // 1(ish) month
	},
	[CONTACT]: {
		FirstName: "",
		LastName: "",
		PhoneNumber: "",
		Birthday: new Date(),
	}
}