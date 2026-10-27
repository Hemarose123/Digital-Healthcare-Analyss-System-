import PrescriptionLib "../lib/prescription";
import Common "../types/common";
import PrescriptionTypes "../types/prescription";

mixin (prescriptionState : PrescriptionLib.State) {

  var nextPrescriptionId : Nat = 0;

  public shared query ({ caller }) func getPrescriptionScans() : async [PrescriptionTypes.PrescriptionScan] {
    PrescriptionLib.getScans(prescriptionState, caller)
  };

  public shared ({ caller }) func savePrescriptionScan(
    imageUrl : ?Text,
    extractedText : Text,
    parsedMedicines : [PrescriptionTypes.ParsedMedicine],
    isSaved : Bool,
  ) : async Nat {
    let result = PrescriptionLib.saveScan(prescriptionState, caller, nextPrescriptionId, imageUrl, extractedText, parsedMedicines, isSaved);
    nextPrescriptionId := result;
    result
  };

};
