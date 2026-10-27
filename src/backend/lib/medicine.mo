import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:base/Time";
import Principal "mo:base/Principal";
import Common "../types/common";
import MedicineTypes "../types/medicine";

module {
  public type State = Map.Map<Common.UserId, List.List<MedicineTypes.MedicineReminder>>;

  // Shared-safe public type with SMS fields
  public type MedicineReminderPublic = {
    id : Common.EntryId;
    name : Text;
    dosage : Text;
    frequency : Text;
    timeOfDay : Text;
    isActive : Bool;
    adherenceLog : [MedicineTypes.AdherenceEntry];
    phoneNumber : ?Text;
    smsEnabled : Bool;
    smsLogCount : Nat;
  };

  public func getReminders(state : State, caller : Common.UserId) : [MedicineReminderPublic] {
    switch (Map.get<Common.UserId, List.List<MedicineTypes.MedicineReminder>>(state, caller, Principal.equal)) {
      case (?reminders) {
        List.toArray(List.map<MedicineTypes.MedicineReminder, MedicineReminderPublic>(reminders, func(r) = {
          id = r.id;
          name = r.name;
          dosage = r.dosage;
          frequency = r.frequency;
          timeOfDay = r.timeOfDay;
          isActive = r.isActive;
          adherenceLog = r.adherenceLog;
          phoneNumber = r.phoneNumber;
          smsEnabled = r.smsEnabled;
          smsLogCount = r.smsLog.size();
        }))
      };
      case (null) [];
    };
  };

  public func saveReminder(state : State, caller : Common.UserId, nextId : Nat, name : Text, dosage : Text, frequency : Text, timeOfDay : Text, phoneNumber : ?Text) : Nat {
    let newReminder : MedicineTypes.MedicineReminder = {
      id = nextId;
      var name = name;
      var dosage = dosage;
      var frequency = frequency;
      var timeOfDay = timeOfDay;
      var isActive = true;
      var adherenceLog = [];
      var phoneNumber = phoneNumber;
      var smsEnabled = phoneNumber != null;
      var smsLog = [];
    };
    
    let currentReminders = switch (Map.get<Common.UserId, List.List<MedicineTypes.MedicineReminder>>(state, caller, Principal.equal)) {
      case (?r) r;
      case (null) List.nil();
    };
    
    let updatedReminders = List.push<MedicineTypes.MedicineReminder>(newReminder, currentReminders);
    Map.put<Common.UserId, List.List<MedicineTypes.MedicineReminder>>(state, caller, Principal.equal, updatedReminders);
    
    nextId + 1
  };

  public func updateReminder(state : State, caller : Common.UserId, id : Common.EntryId, name : Text, dosage : Text, frequency : Text, timeOfDay : Text, isActive : Bool) : Bool {
    switch (Map.get<Common.UserId, List.List<MedicineTypes.MedicineReminder>>(state, caller, Principal.equal)) {
      case (?reminders) {
        let updatedReminders = List.map<MedicineTypes.MedicineReminder, MedicineTypes.MedicineReminder>(reminders, func(r) {
          if (r.id == id) {
            r.name := name;
            r.dosage := dosage;
            r.frequency := frequency;
            r.timeOfDay := timeOfDay;
            r.isActive := isActive;
            r
          } else {
            r
          }
        });
        Map.put<Common.UserId, List.List<MedicineTypes.MedicineReminder>>(state, caller, Principal.equal, updatedReminders);
        true
      };
      case (null) false;
    };
  };

  public func deleteReminder(state : State, caller : Common.UserId, id : Common.EntryId) : Bool {
    switch (Map.get<Common.UserId, List.List<MedicineTypes.MedicineReminder>>(state, caller, Principal.equal)) {
      case (?reminders) {
        let filteredReminders = List.filter<MedicineTypes.MedicineReminder>(reminders, func(r) = r.id != id);
        Map.put<Common.UserId, List.List<MedicineTypes.MedicineReminder>>(state, caller, Principal.equal, filteredReminders);
        true
      };
      case (null) false;
    };
  };

  public func markTaken(state : State, caller : Common.UserId, id : Common.EntryId, date : Text, taken : Bool) : Bool {
    switch (Map.get<Common.UserId, List.List<MedicineTypes.MedicineReminder>>(state, caller, Principal.equal)) {
      case (?reminders) {
        let updatedReminders = List.map<MedicineTypes.MedicineReminder, MedicineTypes.MedicineReminder>(reminders, func(r) {
          if (r.id == id) {
            let newEntry : MedicineTypes.AdherenceEntry = {
              date = date;
              taken = taken;
            };
            r.adherenceLog := r.adherenceLog # [newEntry];
            r
          } else {
            r
          }
        });
        Map.put<Common.UserId, List.List<MedicineTypes.MedicineReminder>>(state, caller, Principal.equal, updatedReminders);
        true
      };
      case (null) false;
    };
  };

  // Enable SMS notifications for a reminder
  public func enableSMS(state : State, caller : Common.UserId, id : Common.EntryId, phoneNumber : Text) : Bool {
    switch (Map.get<Common.UserId, List.List<MedicineTypes.MedicineReminder>>(state, caller, Principal.equal)) {
      case (?reminders) {
        let updatedReminders = List.map<MedicineTypes.MedicineReminder, MedicineTypes.MedicineReminder>(reminders, func(r) {
          if (r.id == id) {
            r.phoneNumber := ?phoneNumber;
            r.smsEnabled := true;
            r
          } else {
            r
          }
        });
        Map.put<Common.UserId, List.List<MedicineTypes.MedicineReminder>>(state, caller, Principal.equal, updatedReminders);
        true
      };
      case (null) false;
    };
  };

  // Disable SMS notifications for a reminder
  public func disableSMS(state : State, caller : Common.UserId, id : Common.EntryId) : Bool {
    switch (Map.get<Common.UserId, List.List<MedicineTypes.MedicineReminder>>(state, caller, Principal.equal)) {
      case (?reminders) {
        let updatedReminders = List.map<MedicineTypes.MedicineReminder, MedicineTypes.MedicineReminder>(reminders, func(r) {
          if (r.id == id) {
            r.smsEnabled := false;
            r
          } else {
            r
          }
        });
        Map.put<Common.UserId, List.List<MedicineTypes.MedicineReminder>>(state, caller, Principal.equal, updatedReminders);
        true
      };
      case (null) false;
    };
  };

  // Log SMS send attempt
  public func logSMSSend(state : State, caller : Common.UserId, id : Common.EntryId, phoneNumber : Text, success : Bool, messageId : ?Text) : Bool {
    switch (Map.get<Common.UserId, List.List<MedicineTypes.MedicineReminder>>(state, caller, Principal.equal)) {
      case (?reminders) {
        let updatedReminders = List.map<MedicineTypes.MedicineReminder, MedicineTypes.MedicineReminder>(reminders, func(r) {
          if (r.id == id) {
            let logEntry : MedicineTypes.SMSLog = {
              timestamp = Time.now();
              phoneNumber = phoneNumber;
              success = success;
              messageId = messageId;
            };
            r.smsLog := r.smsLog # [logEntry];
            r
          } else {
            r
          }
        });
        Map.put<Common.UserId, List.List<MedicineTypes.MedicineReminder>>(state, caller, Principal.equal, updatedReminders);
        true
      };
      case (null) false;
    };
  };
};
