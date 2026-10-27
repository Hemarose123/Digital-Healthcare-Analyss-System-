import Common "common";

module {
  public type MoodEntry = {
    id : Common.EntryId;
    timestamp : Common.Timestamp;
    moodValue : Nat; // 1-5
    moodLabel : Text;
    note : ?Text;
  };
};
