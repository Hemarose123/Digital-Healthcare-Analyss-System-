import HabitLib "../lib/habit";

mixin (habitState : HabitLib.State) {

  public shared query ({ caller }) func getHabitData() : async [HabitLib.HabitDataPublic] {
    HabitLib.getData(habitState, caller)
  };

  public shared ({ caller }) func saveHabitData(
    date : Text,
    waterGlasses : Nat,
    sleepHours : Float,
    steps : Nat,
  ) : async () {
    HabitLib.saveData(habitState, caller, date, waterGlasses, sleepHours, steps);
  };

};
