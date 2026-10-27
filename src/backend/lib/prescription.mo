import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:base/Time";
import Principal "mo:base/Principal";
import Common "../types/common";
import PrescriptionTypes "../types/prescription";

module {
  public type State = Map.Map<Common.UserId, List.List<PrescriptionTypes.PrescriptionScan>>;

  public func getScans(state : State, caller : Common.UserId) : [PrescriptionTypes.PrescriptionScan] {
    switch (Map.get<Common.UserId, List.List<PrescriptionTypes.PrescriptionScan>>(state, caller, Principal.equal)) {
      case (?scans) List.toArray(scans);
      case (null) [];
    };
  };

  public func saveScan(state : State, caller : Common.UserId, nextId : Nat, imageUrl : ?Text, extractedText : Text, parsedMedicines : [PrescriptionTypes.ParsedMedicine], isSaved : Bool) : Nat {
    let newScan : PrescriptionTypes.PrescriptionScan = {
      id = nextId;
      timestamp = Time.now();
      imageUrl = imageUrl;
      extractedText = extractedText;
      parsedMedicines = parsedMedicines;
      isSaved = isSaved;
    };
    
    let currentScans = switch (Map.get<Common.UserId, List.List<PrescriptionTypes.PrescriptionScan>>(state, caller, Principal.equal)) {
      case (?s) s;
      case (null) List.nil();
    };
    
    let updatedScans = List.push<PrescriptionTypes.PrescriptionScan>(newScan, currentScans);
    Map.put<Common.UserId, List.List<PrescriptionTypes.PrescriptionScan>>(state, caller, Principal.equal, updatedScans);
    
    nextId + 1
  };
};
