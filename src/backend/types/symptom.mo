import Common "common";

module {
  public type SeverityLevel = { #green; #yellow; #red };

  public type SymptomCheck = {
    id : Common.EntryId;
    timestamp : Common.Timestamp;
    symptomText : Text;
    conditionSuggestions : [Text];
    remedies : [Text];
    severityLevel : SeverityLevel;
  };
};
