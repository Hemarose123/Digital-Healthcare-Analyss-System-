import MedicineLib "../lib/medicine";
import Common "../types/common";

mixin (medicineState : MedicineLib.State) {

  var nextMedicineId : Nat = 0;

  public shared query ({ caller }) func getMedicineReminders() : async [MedicineLib.MedicineReminderPublic] {
    MedicineLib.getReminders(medicineState, caller)
  };

  public shared ({ caller }) func saveMedicineReminder(
    name : Text,
    dosage : Text,
    frequency : Text,
    timeOfDay : Text,
    phoneNumber : ?Text,
  ) : async Nat {
    let result = MedicineLib.saveReminder(medicineState, caller, nextMedicineId, name, dosage, frequency, timeOfDay, phoneNumber);
    nextMedicineId := result;
    result
  };

  public shared ({ caller }) func updateMedicineReminder(
    id : Common.EntryId,
    name : Text,
    dosage : Text,
    frequency : Text,
    timeOfDay : Text,
    isActive : Bool,
  ) : async Bool {
    MedicineLib.updateReminder(medicineState, caller, id, name, dosage, frequency, timeOfDay, isActive)
  };

  public shared ({ caller }) func deleteMedicineReminder(id : Common.EntryId) : async Bool {
    MedicineLib.deleteReminder(medicineState, caller, id)
  };

  public shared ({ caller }) func markReminderTaken(id : Common.EntryId, date : Text, taken : Bool) : async Bool {
    MedicineLib.markTaken(medicineState, caller, id, date, taken)
  };

  public shared ({ caller }) func enableSMSReminder(id : Common.EntryId, phoneNumber : Text) : async Bool {
    MedicineLib.enableSMS(medicineState, caller, id, phoneNumber)
  };

  public shared ({ caller }) func disableSMSReminder(id : Common.EntryId) : async Bool {
    MedicineLib.disableSMS(medicineState, caller, id)
  };

  public shared ({ caller }) func logMedicineSMSSend(id : Common.EntryId, phoneNumber : Text, success : Bool, messageId : ?Text) : async Bool {
    MedicineLib.logSMSSend(medicineState, caller, id, phoneNumber, success, messageId)
  };

};
