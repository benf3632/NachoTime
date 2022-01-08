export const setSetting = (settingName, settingValue) => {
	return {
		type: "SET_SETTING",
		name: settingName,
		value: settingValue,
	};
};
