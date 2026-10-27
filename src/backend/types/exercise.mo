import Common "common";

module {
  public type ExerciseCompletion = {
    id : Common.EntryId;
    exerciseName : Text;
    category : Text;
    durationMins : Nat;
    timestamp : Common.Timestamp;
  };
};
