import Common "common";

module {
  public type AdherenceEntry = {
    date : Text;
    taken : Bool;
  };

  public type SMSLog = {
    timestamp : Int;
    phoneNumber : Text;
    success : Bool;
    messageId : ?Text;
  };

  public type MedicineReminder = {
    id : Common.EntryId;
    var name : Text;
    var dosage : Text;
    var frequency : Text;
    var timeOfDay : Text;
    var isActive : Bool;
    var adherenceLog : [AdherenceEntry];
    var phoneNumber : ?Text;
    var smsEnabled : Bool;
    var smsLog : [SMSLog];
  };
};
