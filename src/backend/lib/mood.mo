import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:base/Time";
import Principal "mo:base/Principal";
import Common "../types/common";
import MoodTypes "../types/mood";

module {
  public type State = Map.Map<Common.UserId, List.List<MoodTypes.MoodEntry>>;

  public func getEntries(state : State, caller : Common.UserId) : [MoodTypes.MoodEntry] {
    switch (Map.get<Common.UserId, List.List<MoodTypes.MoodEntry>>(state, caller, Principal.equal)) {
      case (?entries) List.toArray(entries);
      case (null) [];
    };
  };

  public func addEntry(state : State, caller : Common.UserId, nextId : Nat, moodValue : Nat, moodLabel : Text, note : ?Text) : Nat {
    let newEntry : MoodTypes.MoodEntry = {
      id = nextId;
      timestamp = Time.now();
      moodValue = moodValue;
      moodLabel = moodLabel;
      note = note;
    };
    
    let currentEntries = switch (Map.get<Common.UserId, List.List<MoodTypes.MoodEntry>>(state, caller, Principal.equal)) {
      case (?e) e;
      case (null) List.nil();
    };
    
    let updatedEntries = List.push<MoodTypes.MoodEntry>(newEntry, currentEntries);
    Map.put<Common.UserId, List.List<MoodTypes.MoodEntry>>(state, caller, Principal.equal, updatedEntries);
    
    nextId + 1
  };
};
