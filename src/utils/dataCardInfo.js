const dataIconCardInfo = {
  enum: {
    calorieCount: {
      name: "Calories",
      unit: "kCal",
      icon: "calories-icon.svg",
    },
    proteinCount: {
      name: "Protéines",
      unit: "g",
      icon: "protein-icon.svg",
    },
    carbohydrateCount: {
      name: "Glucides",
      unit: "g",
      icon: "carbs-icon.svg",
    },
    lipidCount: {
      name: "Lipides",
      unit: "g",
      icon: "fat-icon.svg",
    },
  },

  _findEnumKey: (keyData) =>
    Object.keys(dataIconCardInfo.enum).find(
      (k) => dataIconCardInfo.enum[k].name === keyData
    ),

  _getProperty: (keyData, propertyName) => {
    const key = dataIconCardInfo._findEnumKey(keyData);
    return key ? dataIconCardInfo.enum[key][propertyName] : "";
  },

  getIcon: (keyData) => dataIconCardInfo._getProperty(keyData, "icon"),

  getLabel: (keyData) => dataIconCardInfo._getProperty(keyData, "name"),

  getUnit: (keyData) => dataIconCardInfo._getProperty(keyData, "unit"),
};

export { dataIconCardInfo };
