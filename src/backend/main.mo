import Map "mo:core/Map";
import Runtime "mo:core/Runtime";

actor {

  // ─── Currency ────────────────────────────────────────────────────────────

  // Rates relative to USD (1 USD = X currency)
  let currencyRates : Map.Map<Text, Float> = Map.empty<Text, Float>();

  do {
    currencyRates.add("USD", 1.0);
    currencyRates.add("EUR", 0.92);
    currencyRates.add("GBP", 0.79);
    currencyRates.add("JPY", 149.50);
    currencyRates.add("AUD", 1.53);
    currencyRates.add("CAD", 1.36);
    currencyRates.add("INR", 83.12);
    currencyRates.add("CNY", 7.24);
  };

  public query func getSupportedCurrencies() : async [Text] {
    ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "INR", "CNY"]
  };

  public query func convertCurrency(amount : Float, fromCurrency : Text, toCurrency : Text) : async Float {
    let fromRate = switch (currencyRates.get(fromCurrency)) {
      case (?r) r;
      case null Runtime.trap("Unsupported currency: " # fromCurrency);
    };
    let toRate = switch (currencyRates.get(toCurrency)) {
      case (?r) r;
      case null Runtime.trap("Unsupported currency: " # toCurrency);
    };
    // Convert to USD first, then to target
    (amount / fromRate) * toRate
  };

  // ─── Length ──────────────────────────────────────────────────────────────

  // Rates relative to meters (1 unit = X meters)
  let lengthRates : Map.Map<Text, Float> = Map.empty<Text, Float>();

  do {
    lengthRates.add("inches", 0.0254);
    lengthRates.add("cm", 0.01);
    lengthRates.add("feet", 0.3048);
    lengthRates.add("meters", 1.0);
    lengthRates.add("kilometers", 1000.0);
    lengthRates.add("miles", 1609.344);
  };

  public query func getLengthUnits() : async [Text] {
    ["inches", "cm", "feet", "meters", "kilometers", "miles"]
  };

  public query func convertLength(amount : Float, fromUnit : Text, toUnit : Text) : async Float {
    let fromRate = switch (lengthRates.get(fromUnit)) {
      case (?r) r;
      case null Runtime.trap("Unsupported length unit: " # fromUnit);
    };
    let toRate = switch (lengthRates.get(toUnit)) {
      case (?r) r;
      case null Runtime.trap("Unsupported length unit: " # toUnit);
    };
    (amount * fromRate) / toRate
  };

  // ─── Temperature ─────────────────────────────────────────────────────────

  public query func getTemperatureUnits() : async [Text] {
    ["celsius", "fahrenheit", "kelvin"]
  };

  public query func convertTemperature(amount : Float, fromUnit : Text, toUnit : Text) : async Float {
    // Convert to Celsius first
    let celsius : Float = switch (fromUnit) {
      case "celsius" amount;
      case "fahrenheit" (amount - 32.0) * 5.0 / 9.0;
      case "kelvin" amount - 273.15;
      case _ Runtime.trap("Unsupported temperature unit: " # fromUnit);
    };
    // Convert from Celsius to target
    switch (toUnit) {
      case "celsius" celsius;
      case "fahrenheit" (celsius * 9.0 / 5.0) + 32.0;
      case "kelvin" celsius + 273.15;
      case _ Runtime.trap("Unsupported temperature unit: " # toUnit);
    }
  };

  // ─── Weight ──────────────────────────────────────────────────────────────

  // Rates relative to kilograms (1 unit = X kg)
  let weightRates : Map.Map<Text, Float> = Map.empty<Text, Float>();

  do {
    weightRates.add("kg", 1.0);
    weightRates.add("pounds", 0.45359237);
    weightRates.add("grams", 0.001);
    weightRates.add("ounces", 0.02834952);
    weightRates.add("stones", 6.35029318);
  };

  public query func getWeightUnits() : async [Text] {
    ["kg", "pounds", "grams", "ounces", "stones"]
  };

  public query func convertWeight(amount : Float, fromUnit : Text, toUnit : Text) : async Float {
    let fromRate = switch (weightRates.get(fromUnit)) {
      case (?r) r;
      case null Runtime.trap("Unsupported weight unit: " # fromUnit);
    };
    let toRate = switch (weightRates.get(toUnit)) {
      case (?r) r;
      case null Runtime.trap("Unsupported weight unit: " # toUnit);
    };
    (amount * fromRate) / toRate
  };

  // ─── Volume ──────────────────────────────────────────────────────────────

  // Rates relative to liters (1 unit = X liters)
  let volumeRates : Map.Map<Text, Float> = Map.empty<Text, Float>();

  do {
    volumeRates.add("liters", 1.0);
    volumeRates.add("gallons", 3.785411784);
    volumeRates.add("ml", 0.001);
    volumeRates.add("floz", 0.02957353);
    volumeRates.add("cups", 0.2365882);
    volumeRates.add("pints", 0.473176);
  };

  public query func getVolumeUnits() : async [Text] {
    ["liters", "gallons", "ml", "floz", "cups", "pints"]
  };

  public query func convertVolume(amount : Float, fromUnit : Text, toUnit : Text) : async Float {
    let fromRate = switch (volumeRates.get(fromUnit)) {
      case (?r) r;
      case null Runtime.trap("Unsupported volume unit: " # fromUnit);
    };
    let toRate = switch (volumeRates.get(toUnit)) {
      case (?r) r;
      case null Runtime.trap("Unsupported volume unit: " # toUnit);
    };
    (amount * fromRate) / toRate
  };

}
