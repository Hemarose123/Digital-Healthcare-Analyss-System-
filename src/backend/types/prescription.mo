import Common "common";

module {
  public type ParsedMedicine = {
    name : Text;
    dosage : Text;
    frequency : Text;
  };

  public type PrescriptionScan = {
    id : Common.EntryId;
    timestamp : Common.Timestamp;
    imageUrl : ?Text;
    extractedText : Text;
    parsedMedicines : [ParsedMedicine];
    isSaved : Bool;
  };
};
