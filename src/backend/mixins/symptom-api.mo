import SymptomLib "../lib/symptom";
import Common "../types/common";
import SymptomTypes "../types/symptom";

mixin (symptomState : SymptomLib.State) {

  var nextSymptomId : Nat = 0;

  public shared query ({ caller }) func getSymptomChecks() : async [SymptomTypes.SymptomCheck] {
    SymptomLib.getChecks(symptomState, caller)
  };

  public shared ({ caller }) func addSymptomCheck(
    symptomText : Text,
    conditionSuggestions : [Text],
    remedies : [Text],
    severityLevel : SymptomTypes.SeverityLevel,
  ) : async Nat {
    let result = SymptomLib.addCheck(symptomState, caller, nextSymptomId, symptomText, conditionSuggestions, remedies, severityLevel);
    nextSymptomId := result;
    result
  };

};
