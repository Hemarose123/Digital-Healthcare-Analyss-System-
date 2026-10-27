import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:base/Time";
import Principal "mo:base/Principal";
import Common "../types/common";
import SymptomTypes "../types/symptom";

module {
  public type State = Map.Map<Common.UserId, List.List<SymptomTypes.SymptomCheck>>;

  public func getChecks(state : State, caller : Common.UserId) : [SymptomTypes.SymptomCheck] {
    switch (Map.get<Common.UserId, List.List<SymptomTypes.SymptomCheck>>(state, caller, Principal.equal)) {
      case (?checks) List.toArray(checks);
      case (null) [];
    };
  };

  public func addCheck(state : State, caller : Common.UserId, nextId : Nat, symptomText : Text, conditionSuggestions : [Text], remedies : [Text], severityLevel : SymptomTypes.SeverityLevel) : Nat {
    let newCheck : SymptomTypes.SymptomCheck = {
      id = nextId;
      timestamp = Time.now();
      symptomText = symptomText;
      conditionSuggestions = conditionSuggestions;
      remedies = remedies;
      severityLevel = severityLevel;
    };
    
    let currentChecks = switch (Map.get<Common.UserId, List.List<SymptomTypes.SymptomCheck>>(state, caller, Principal.equal)) {
      case (?c) c;
      case (null) List.nil();
    };
    
    let updatedChecks = List.push<SymptomTypes.SymptomCheck>(newCheck, currentChecks);
    Map.put<Common.UserId, List.List<SymptomTypes.SymptomCheck>>(state, caller, Principal.equal, updatedChecks);
    
    nextId + 1
  };
};
