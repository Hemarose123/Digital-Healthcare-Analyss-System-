import MoodLib "../lib/mood";
import Common "../types/common";
import MoodTypes "../types/mood";

mixin (moodState : MoodLib.State) {

  var nextMoodId : Nat = 0;

  public shared query ({ caller }) func getMoodEntries() : async [MoodTypes.MoodEntry] {
    MoodLib.getEntries(moodState, caller)
  };

  public shared ({ caller }) func addMoodEntry(
    moodValue : Nat,
    moodLabel : Text,
    note : ?Text,
  ) : async Nat {
    let result = MoodLib.addEntry(moodState, caller, nextMoodId, moodValue, moodLabel, note);
    nextMoodId := result;
    result
  };

};
